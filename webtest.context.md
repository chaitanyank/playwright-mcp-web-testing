
# Web Testing Context - Playwright Automation with MCP

## 1. Project Information

Project Name: AI Powered Web Testing
Application: OrangeHRM Demo
Application URL: https://opensource-demo.orangehrmlive.com/
Automation Tool: Playwright
Programming Language: JavaScript
Test Framework: Playwright Test
AI Integration: MCP Server
Design Pattern: Page Object Model (POM)

## 2. Objective

The objective is to automate web application testing using
Playwright and AI-assisted test generation through MCP.

The AI assistant should:
- Understand the application under test.
- Identify web elements and locators.
- Generate functional test cases.
- Generate Playwright automation scripts.
- Execute test scenarios using available browser tools.
- Validate expected and actual results.
- Report test execution results.

## 3. Application Details

Application: OrangeHRM

URL:
https://opensource-demo.orangehrmlive.com/

Application Type: Web Application

Module Under Test: Login

Test Scope:
- Valid Login
- Invalid Login
- Empty Username
- Empty Password
- Invalid Credentials
- Password Masking
- Login Button Validation
- Successful Login Redirection
- Logout Functionality

## 4. Login Test Data

Valid Username: Admin
Valid Password: admin123

Invalid Username: InvalidUser
Invalid Password: wrongpassword

Note: Use only authorized demo credentials.

## 5. Test Scenarios

TC001: Verify login page loads successfully.

TC002: Verify login using valid credentials.

TC003: Verify login using invalid username.

TC004: Verify login using invalid password.

TC005: Verify login with empty username.

TC006: Verify login with empty password.

TC007: Verify login with both fields empty.

TC008: Verify password field masks entered characters.

TC009: Verify successful login navigates to Dashboard.

TC010: Verify logout functionality.

## 6. Playwright Automation Guidelines

Use JavaScript with Playwright Test.

Use:
- page.goto()
- page.locator()
- page.getByRole()
- page.getByText()
- page.getByPlaceholder()
- expect()
- test()

Prefer stable locators such as:
- getByRole()
- getByLabel()
- getByPlaceholder()
- locator()

Avoid unnecessary:
- page.waitForTimeout()
- Hardcoded XPath
- Duplicate test scripts

Use auto-waiting and web-first assertions.

## 7. Page Object Model Structure

Project Structure:

webtest/
│
├── pages/
│   └── LoginPage.js
│
├── tests/
│   └── login.spec.js
│
├── test-data/
│   └── testData.js
│
├── playwright.config.js
│
└── webtest.context.md

## 8. AI Instructions

When asked to generate test cases:

1. Analyze the requested functionality.
2. Identify positive and negative scenarios.
3. Provide Test Case ID.
4. Provide Test Scenario.
5. Provide Preconditions.
6. Provide Test Steps.
7. Provide Test Data.
8. Provide Expected Result.
9. Generate automation code when requested.

When asked to automate:

1. Inspect the application using available browser tools.
2. Identify correct locators.
3. Create reusable page methods.
4. Write Playwright test scripts.
5. Add meaningful assertions.
6. Execute tests if browser execution is available.
7. Report Pass/Fail status.

Do not claim a test passed unless it was actually executed
and its result was observed.

## 9. Expected Output

Provide test results in the following format:

Test Case ID:
Test Scenario:
Automation Status:
Expected Result:
Actual Result:
Status: PASS / FAIL / BLOCKED

## 10. Important Rules

- Use JavaScript syntax.
- Follow Playwright best practices.
- Follow Page Object Model.
- Keep code beginner-friendly.
- Explain generated code when requested.
- Never invent execution results.
- Do not expose sensitive credentials.