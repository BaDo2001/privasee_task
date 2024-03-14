# Privasee demo app

## Get started

### Prerequisites

- Airtable setup
  - Create a base
  - Create a table
    - Make sure the table has the following fields:
      - \_recordId (Autonumber)
      - Company Name
      - Question
      - Answer
      - \_companyId
      - Created At
      - Updated At
      - Updated By
      - Created By
      - Assigned To
      - Properties
      - Question Description
  - Create a Personal Access Token
- Clerk setup

  - Create a new application
  - Customize session token (under the Sessions menu) with adding the following:

```json
{
  "email": "{{user.primary_email_address}}"
}
```

### Environment variables

Copy the `.env.example` files in the `apps/api` and `apps/admin` folders to `.env` files in the same folders and fill in the environment variables.

### Installation

```bash
pnpm i
```

### Start locally

```bash
pnpm dev
```

## Test

### Environment variables

Copy the `.env.example` file in the `apps/api` folder to a `.env.test` file in the same folder and fill in the environment variables.

```bash
pnpm test
```
