*** Settings ***
Documentation      This is a test suite for the Sign Up functionality
...                 In this test suite, various test cases are tried to verify
...                 functionality the Sign Up functionality of the web app
Library            SeleniumLibrary

*** Variables ***
${EXECDIR}  executable_path=/usr/local/bin/chromedriver.exe
${URL}      https://zarap-develop.vercel.app/
${BROWSER}      Chrome
${Email}  rjd.reyes15@gmail.com
${ErrorEmail}  geekofgoks
${UnregisteredEmail}  geekofgoks@gmail.com
${Password}  HelloWorld69
${ShortPass}  Hello
${NonAlphanumericPassword}  HelloWorld
${FirstName}  Gordon
${LastName}  Ramsay
${NoFName}  Please input your first name!
${NoLName}  Please input your last name!
${NoEmail}  Please input your e-mail!
${InvalidEmail}  The input is not a valid e-mail!
${TakenEmail}  E-mail has already been registered!
${NoPassword}  Please input your password!
${NoConfirm}  Please confirm your password!
${ShortPassword}  Password is too short!
${InvalidPassword}  Password must be alphanumeric!
${WrongConfirm}  The two passwords that you entered do not match!

*** Test Cases ***
Sign up unsuccessfully with empty details
    [Tags]  01-6  Sprint3
    Open web page ${URL} 
    Click Sign Up
    Click Sign Up Button
    Check Invalid
    Check Error ${NoFName}
    Check Error ${NoLName} 
    Check Error ${NoEmail}
    Check Error ${NoPassword}
    Check Error ${NoConfirm}

Sign up unsuccessfully with invalid email
    [Tags]  01-8  Sprint3
    Open web page ${URL} 
    Click Sign Up
    Enter First Name
    Enter Last Name
    Enter Email ${ErrorEmail}
    Click Sign Up Button
    Check Valid
    Check Invalid
    Check Error ${InvalidEmail}

Sign up unsuccessfully with taken email
    [Tags]  01-7  Sprint3
    Open web page ${URL} 
    Click Sign Up
    Enter First Name
    Enter Last Name
    Enter Email ${Email}
    Click Sign Up Button
    Check Valid
    Check Invalid
    Check Error ${TakenEmail}

Use unregistered email
    [Tags]  ExtraTest1  Sprint3
    Open web page ${URL} 
    Click Sign Up
    Enter Email ${UnregisteredEmail}
    Check Valid

Sign up unsuccessfully with short password 
    [Tags]  01-3  Sprint3
    Open web page ${URL} 
    Click Sign Up
    Enter First Name
    Enter Last Name
    Enter Email ${UnregisteredEmail}
    Enter Password ${ShortPass}
    Click Sign Up Button
    Check Valid
    Check Invalid
    Check Error ${ShortPassword}

Sign up unsuccessfully with non-alphanumeric password 
    [Tags]  01-5  Sprint3
    Open web page ${URL} 
    Click Sign Up
    Enter First Name
    Enter Last Name
    Enter Email ${UnregisteredEmail}
    Enter Password ${NonAlphanumericPassword}
    Click Sign Up Button
    Check Valid
    Check Invalid
    Check Error ${InvalidPassword}

Use correct confirm password
    [Tags]  ExtraTest2  Sprint3
    Open web page ${URL} 
    Click Sign Up
    Enter Password ${ShortPass}
    Enter Confirm Password ${ShortPass}
    Click Sign Up Button
    Check Invalid
    Check Valid

Use wrong confirm password
    [Tags]  ExtraTest3  Sprint3
    Open web page ${URL} 
    Click Sign Up
    Enter Password ${Password}
    Enter Confirm Password ${ShortPass}
    Click Sign Up Button
    Check Invalid
    Check Error ${WrongConfirm}

*** Keywords ****
Open web page ${URL}
    Open Browser        ${URL}      ${BROWSER}      ${EXECDIR}
    Maximize Browser Window

Click Sign Up
    Wait Until Element Is Visible  //*[contains(text(),'Sign Up')]  timeout=10
    Click Element  //*[contains(text(),'Sign Up')]

Enter First Name
    Input Text  id=firstName  ${FirstName}

Enter Last Name
    Input Text  id=lastName  ${LastName}

Enter Email ${Email}
    Input Text  id=email  ${Email}

Enter Password ${Password}
    Input Password  id=password  ${Password}

Enter Confirm Password ${Password}
    Input Password  id=confirm  ${Password}    

Click Sign Up Button
    Wait Until Element Is Visible  id=btnSubmit
    Click Button  id=btnSubmit

Check Valid
    Wait Until Element Is Visible  xpath=//*[@class="ant-row ant-form-item ant-form-item-has-feedback ant-form-item-has-success"]  timeout=15

Check Invalid
    Wait Until Element Is Visible  xpath=//*[@class="ant-form-item-explain ant-form-item-explain-error"]  timeout=15

Check Error ${ErrorMessage}
    Wait Until Page Contains  ${ErrorMessage}  timeout=15