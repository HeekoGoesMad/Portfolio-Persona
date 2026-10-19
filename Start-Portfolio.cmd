@echo off
setlocal
cd /d "%~dp0"
if not exist "node_modules\" (
  call npm ci
  if errorlevel 1 exit /b 1
)
echo Open the Local URL printed below. Press Ctrl+C here to stop the preview.
call npm run dev
