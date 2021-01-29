*** Settings ***
Documentation      This is a test suite for the Search functionality
...                 In this test suite, various test cases are tried to verify
...                 the Search functionality of the web app by trying
...                 different scenarios.   
Library            SeleniumLibrary

*** Variables ***
${EXECDIR}  executable_path=/usr/local/bin/chromedriver.exe
${URL}      https://zarap-develop.vercel.app/   
${BROWSER}      Chrome
${ExistingRestaurant}  Starbucks
${NonExistingRestaurant}  Yellow Cab
${SearchResultsURL}  https://zarap-develop.vercel.app/searchfilter/a
${url}

*** Test Cases ***
Search for a restaurant that is in the database from homepage
    [Tags]  02-1  Sprint1
    Open web page to homepage ${URL} 
    Type restaurant name ${ExistingRestaurant}
    Click Search Button Homepage
    Wait Until Page Contains Element  id=SearchRestoCard_stars__htMVF
    Wait Until Page Contains  Starbucks

Search for a restaurant that is not in the database from homepage
    [Tags]  02-2  Sprint1
    Open web page to homepage ${URL} 
    Type restaurant name ${NonExistingRestaurant}
    Click Search Button Homepage
    Wait Until Page Contains  No restaurants were found

Clicking the search button when the search bar is empty from homepage
    [Tags]  02-3  Sprint1
    Open web page to homepage ${URL} 
    Click Search Button Homepage
    Element Text Should Be  id=searchbar  ${Empty}
    Location Should Be  ${URL}

Search for a restaurant that is in the database from search results page
    [Tags]  03-1  Sprint1
    Open web page to search results page ${SearchResultsURL}
    Type restaurant name ${ExistingRestaurant}
    Click Search Button Search Results Page
    Wait Until Page Contains Element  id=SearchRestoCard_stars__htMVF  
    Wait Until Page Contains  Starbucks  timeout=15
    Wait Until Location Is Not  ${SearchResultsURL}  timeout=15
    ${url}  Log Location
    Location Should Be  ${url}

Search for a restaurant that is not in the database from search results page
    [Tags]  03-2  Sprint1
    Open web page to search results page ${SearchResultsURL}
    Type restaurant name ${NonExistingRestaurant}
    Click Search Button Search Results Page
    Wait Until Page Contains  No restaurants were found  timeout=15
    Wait Until Location Is Not  ${SearchResultsURL}  timeout=15
    ${url}  Log Location
    Location Should Be  ${url}
    

Clicking the search button when the search bar is empty from search results page
    [Tags]  03-4  Sprint1
    Open web page to search results page ${SearchResultsURL}
    Type restaurant name ${EMPTY}
    Click Search Button Search Results Page
    Element Text Should Be  id=searchbar  ${Empty}
    ${url}  Log Location
    Location Should Be  ${url}

*** Keywords ****
Open web page to homepage ${URL}
    Open Browser        ${URL}      ${BROWSER}      ${EXECDIR}
    Maximize Browser Window

Open web page to search results page ${SearchResultsURL}
    Open Browser        ${SearchResultsURL}      ${BROWSER}      ${EXECDIR}
    Maximize Browser Window

Type restaurant name ${Restaurant}
    Input Text  id=searchbar  ${Restaurant}

Click Search Button Homepage
    Click Button  xpath=//*[@class="ant-btn ant-btn-primary ant-btn-lg ant-input-search-button"]

Click Search Button Search Results Page
    Click Button  xpath=//*[@class="ant-btn ant-btn-lg ant-btn-icon-only ant-input-search-button"]

