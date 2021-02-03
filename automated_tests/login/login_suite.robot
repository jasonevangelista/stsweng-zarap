*** Settings ***
Documentation      This is a test suite for the Log In functionality
...                 In this test suite, various test cases are tried to verify
...                 functionality the Log In functionality of the web app
Library            SeleniumLibrary

*** Variables ***
${EXECDIR}  executable_path=/usr/local/bin/chromedriver.exe
${URL}      https://zarap-develop.vercel.app/
${BROWSER}      Chrome
${Email}  rjd.reyes15@gmail.com
${Password}  HelloWorld69
${UnregisteredEmail}  geekofgoks@gmail.com
${NoEmailError}  Please input your e-mail!
${NoPasswordError}  Please input your password!
${UnregisteredEmailError}  Account not found or password is wrong.

*** Test Cases ***
Log in successfully with an existing account / Log Out
    [Tags]  02-1  Sprint3
    Open web page ${URL} 
    Click Log In
    Enter Email ${Email}
    Enter Password
    Click Sign In
    Click Log Out
    Close Browser 

Log in unsuccessfully with an existing account leaving password field empty
    [Tags]  02-2  Sprint3
    Open web page ${URL}
    Click Log In
    Enter Email ${Email}
    Click Sign In
    Check Error Message ${NoPasswordError}

Log in unsuccessfully with an existing account leaving email field empty
    [Tags]  02-3  Sprint3
    Open web page ${URL}
    Click Log In
    Enter Password
    Click Sign In
    Check Error Message ${NoEmailError}

Log in unsuccessfully with an existing account leaving both email and password fields empty
    [Tags]  02-4  Sprint3
    Open web page ${URL}
    Click Log In
    Click Sign In
    Check Error Message ${NoEmailError}

Log in unsuccessfully with an unregistered email
    [Tags]  02-5  Sprint3
    Open web page ${URL}
    Click Log In
    Enter Email ${UnregisteredEmail}
    Enter Password
    Click Sign In
    Check Other Error ${UnregisteredEmailError}

Log in unsuccessfully with an unregistered email but incorrect password
    [Tags]  02-6  Sprint3
    Open web page ${URL}
    Click Log In
    Enter Email ${UnregisteredEmail}
    Enter Password
    Click Sign In
    Check Other Error ${UnregisteredEmailError}


*** Keywords ****
Open web page ${URL}
    Open Browser        ${URL}      ${BROWSER}      ${EXECDIR}
    Maximize Browser Window

Click Log In
    Wait Until Element Is Visible  //*[contains(text(),'Login')]  timeout=10
    Click Element  //*[contains(text(),'Login')]

Enter Email ${Email}
    Input Text  id=email  ${Email}

Enter Password
    Input Password  id=password  ${Password}

Click Sign In
    Wait Until Element Is Visible  id=btnSubmit
    Click Button  id=btnSubmit

Click Log Out 
    Wait Until Element Is Visible  //*[contains(text(),'Log Out')]  timeout=10
    Wait Until Element Is Enabled  //*[contains(text(),'Log Out')]  timeout=10
    sleep  5s
    Click Element  //*[contains(text(),'Log Out')]

Check Error Message ${ErrorMessage}
    Wait Until Element Is Visible  xpath=//div[@class="ant-form-item-explain ant-form-item-explain-error"]  timeout= 10
    Wait Until Page Contains  ${ErrorMessage}

Check Other Error ${ErrorMessage}
    Wait Until Page Contains  ${ErrorMessage}
