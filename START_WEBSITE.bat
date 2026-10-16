@echo off
title Government Schemes Finder - 1-Click Launcher
color 0A
cls
echo ======================================================================
echo    INDIAN GOVERNMENT SCHEMES FINDER - 1-CLICK LAUNCHER
echo ======================================================================
echo.
echo  Starting local web server...
echo  Opening http://localhost:5173 in your default browser...
echo.

cd /d "%~dp0"

:: Open the browser in 2 seconds in the background
start "" cmd /c "timeout /t 2 /nobreak >nul && start http://localhost:5173"

:: Start the Vite server
npm run dev
pause
