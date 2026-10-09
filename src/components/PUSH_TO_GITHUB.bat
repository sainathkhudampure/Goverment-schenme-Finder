
@echo off
title Government Scheme Finder - GitHub Push
cd /d "%~dp0"

echo ==========================================
echo   Government Scheme Finder - GitHub Push
echo ==========================================
echo.

git --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Git is not installed or not in PATH.
    pause
    exit /b 1
)

if not exist ".git" (
    git init
)

git config user.name >nul 2>&1
if errorlevel 1 (
    set /p GITNAME=Enter your Git name:
    git config user.name "%GITNAME%"
)

git config user.email >nul 2>&1
if errorlevel 1 (
    set /p GITEMAIL=Enter your GitHub email:
    git config user.email "%GITEMAIL%"
)

echo.
echo Checking files...
git add .
if errorlevel 1 (
    echo ERROR: Could not add files.
    pause
    exit /b 1
)

git diff --cached --quiet
if not errorlevel 1 (
    git rev-parse HEAD >nul 2>&1
    if not errorlevel 1 (
        echo No new changes to commit.
        goto PUSH
    )
)

git commit -m "Update Government Scheme Finder"
if errorlevel 1 (
    echo ERROR: Commit failed. Check the message above.
    pause
    exit /b 1
)

:PUSH
git branch -M main

git remote get-url origin >nul 2>&1
if errorlevel 1 (
    echo.
    set /p REPOURL=Paste your GitHub HTTPS repository URL:
    git remote add origin "%REPOURL%"
    if errorlevel 1 (
        echo ERROR: Could not add the remote repository.
        pause
        exit /b 1
    )
)

echo.
echo Uploading to GitHub...
git push -u origin main

if errorlevel 1 (
    echo.
    echo Push failed. Read the error message above.
) else (
    echo.
    echo Push completed successfully.
)

pause