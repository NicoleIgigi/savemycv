@echo off
echo Setting up Node.js environment...
set PATH=%PATH%;C:\Program Files\nodejs
echo.
echo Node.js version:
node --version
echo.
echo NPM version:
npm --version
echo.
echo Starting development server...
npm run dev
pause 