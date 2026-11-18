 @echo off
setlocal

echo ============================================================
echo  Installing Playwright + TypeScript framework dependencies
echo ============================================================
echo.

echo [1/9] Installing dotenv...
call npm install dotenv
if errorlevel 1 goto :error
echo [OK] dotenv installed.
echo.

echo [2/9] Installing @faker-js/faker...
call npm install @faker-js/faker
if errorlevel 1 goto :error
echo [OK] @faker-js/faker installed.
echo.

echo [3/9] Installing luxon...
call npm install luxon
if errorlevel 1 goto :error
echo [OK] luxon installed.
echo.

echo [4/9] Installing ajv, csv-parse, xlsx...
call npm install ajv csv-parse xlsx
if errorlevel 1 goto :error
echo [OK] ajv, csv-parse and xlsx installed.
echo.

echo [5/9] Installing @axe-core/playwright...
call npm install @axe-core/playwright
if errorlevel 1 goto :error
echo [OK] @axe-core/playwright installed.
echo.

echo [6/9] Installing allure-playwright...
call npm install allure-playwright
if errorlevel 1 goto :error
echo [OK] allure-playwright installed.
echo.

echo [7/9] Installing @types/node (dev dependency)...
call npm install -D @types/node
if errorlevel 1 goto :error
echo [OK] @types/node installed.
echo.

echo [8/9] Installing Playwright browsers...
call npx playwright install
if errorlevel 1 goto :error
echo [OK] Playwright browsers installed.
echo.

echo [9/9] Installing mysql2...
call npm install mysql2
if errorlevel 1 goto :error
echo [OK] mysql2 installed.
echo.

echo ============================================================
echo  All dependencies installed successfully.
echo ============================================================
exit /b 0

:error
set "EXIT_CODE=%errorlevel%"
echo.
echo ============================================================
echo  ERROR: Installation failed (exit code %EXIT_CODE%).
echo  Read the output above, fix the problem, then re-run env_setup.bat.
echo ============================================================
exit /b %EXIT_CODE%
