*** Settings ***
Documentation      This is a test suite for the API of the web application
...                 In this test suite, various test cases are tried to verify
...                 the correctness of the API requests of the web app by trying
...                 different scenarios and checking whether the data being sent is
...                 correct.  
Library            RequestsLibrary
Library            Collections
Suite Setup  Create Session  zarap  https://zarap-develop.vercel.app/  verify=true
Suite Teardown  Delete All Sessions

*** Variables ***
${URL}      https://zarap-develop.vercel.app
@{KEYS}=  _id  name  establishmentType  city  fullAddress  cuisineType  averageCost  openHours  contactDetails  averageRating  menuURLs  reviews  coverPhotoURL

***Test Cases***
Get Request Test by manual URL routing should return 404
    [Tags]  Get Error 
    ${resp}  Get On Session  zarap  /searchfilter/  expected_status=404
    Log  ${resp.status_code}
  

Get Request Test by searching for a restaurant should succeed and return json with complete keys
    [Tags]  Get Search
    ${resp}  Get On Session  zarap  url=/api/search/starbucks?sort=none&filter={"location":null,"cuisine":null}  expected_status=200  
    Convert to Dictionary  ${resp.json()[0]} 
    FOR  ${key}  IN  @{KEYS}
        Dictionary Should Contain Key  ${resp.json()[0]}  ${key}
    END
    Log  ${resp.json()[0]}

Get Request Test by searching for a keyword that has multiple results should return json with complete keys
    [Tags]  Get Search
    ${resp}  Get On Session  zarap  url=/api/search/a?sort=none&filter={"location":null,"cuisine":null}  expected_status=200
    Log  ${resp.json()}
    ${index}=    Set Variable    1
    FOR  ${resto}  IN  ${resp.json()}
        Convert to Dictionary  ${resto[${index}]}
        Log  ${resto[${index}]}
        LOOP KEY  ${KEYS}  ${resto[${index}]}
        ${index}=    Evaluate    ${index} + 1
    END

Get Request Test by searching for a restaurant/keyword that is not in the database should succeed and return an empty list
    [Tags]  Get Search
    ${resp}  Get On Session  zarap  url=/api/search/gello?sort=none&filter={"location":null,"cuisine":null}  expected_status=200
    Should Be Empty  ${resp.json()}  
    Log  ${resp.json()}

Get Request Test by logging into an existing account should return a decision of success
    [Tags]  Get Login
    ${resp_login}   Get On Session    zarap  url=/api/verify/{"e-mail":"robin_jerome_reyes@dlsu.edu.ph","password":"HelloWorld69"} 
    Dictionary Should Contain Key  ${resp_login.json()}  decision
    Dictionary Should Contain Value  ${resp_login.json()}  success
    Log  ${resp_login.json()}


Get Request Test by logging into an existing account with a wrong password should return an error
    [Tags]  Get Error
    ${resp_login}   Run Keyword And Expect Error  *  Get On Session  zarap  url=/api/verify/{"e-mail":"robin_jerome_reyes@dlsu.edu.ph","password":"HelloWorld6"}  


***Keywords***
LOOP KEY
    [Arguments]   ${keys}    ${resto}
    FOR  ${key}  IN  @{KEYS}
        Dictionary Should Contain Key  ${resto}  ${key}
    END
