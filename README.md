# Custody Expenses Web App

Frontend: GitHub + Vercel  
Backend: Google Apps Script  
Database: Google Sheets  
Receipt storage: Google Drive

## Google Sheet

The `Config` tab must contain:

| Engineer Name | Pin Created | Custody Limit |
|---|---|---|

Run `setup()` once in Apps Script to create the required tabs/headers.

## Apps Script

Change `ADMIN_PIN`, `API_SECRET`, `SHEET_ID`, and `PM_EMAIL` in `Code.gs`.

Deploy as a Web App:
- Execute as: Me
- Who has access: Anyone

Use the `/exec` deployment URL.

## Vercel

Environment variables:
- `GAS_WEB_APP_URL` = Apps Script `/exec` URL
- `GAS_API_SECRET` = exactly the same value as `CFG.API_SECRET`

Deploy the repository.

## Admin

The Admin PIN is stored in `Code.gs`. Admin can:
- search/select engineer names from Config
- generate/regenerate a 6-digit engineer PIN
- add a new engineer and generate a PIN

The engineer logs in with the name + PIN stored in `Config`.
