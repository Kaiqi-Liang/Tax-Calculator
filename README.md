# Tax Calculator

## Introduction

Have you ever seen an option that says **Tax Free Threshold** on one of the documents you have to fill out when you just land a new job and wonder what that means, whether you should tick it? This **Tax Calculator** is here to answer all your questions related to the amount of tax you pay.

There are 4 tax categories which you might be in for a given job that has income, each of which is described on the website. If you enter your salary and pay cycle it will calculate the tax incurs for each category. You can also choose to upload a pay slip which will autofill them along with the amount of tax withheld by your employer and determines which category you were taxed in.

This is extremely helpful when you have multiple sources of income. Since you only claim the tax-free threshold from one payer so that payer will withhold tax from your income at a lower rate than the others, you might forget which one you claimed, or you could get taxed at the wrong rate for whatever reason (taxed as a working holiday maker when you are a resident), this tool can help you solve all these problems.

## Deployment

### Frontend

Deploy the frontend

```bash
cd frontend
npm install
npm run deploy
```

View the frontend on [GitHub Pages](https://Kaiqi-Liang.github.io/Tax-Calculator)

### Backend

Deploy the backend

```bash
cd backend
npm install
gcloud app deploy
```

View the backend on [Google Cloud](https://tax-calculator-355806.ts.r.appspot.com)

```bash
gcloud app browser
```

## Running Locally

Run the frontend in one terminal

```bash
cd frontend
npm install
npm start
```

Change [line 9](https://github.com/Kaiqi-Liang/Tax-Calculator/blob/main/frontend/src/components/Upload.tsx#L5) in [Upload.tsx](frontend/src/components/Upload.tsx) from

```typescript
const SERVER_URL = 'https://tax-calculator-355806.ts.r.appspot.com/';
```

to

```typescript
import { SERVER_URL } from "../config";
```

Run the backend in another terminal

```bash
cd backend
npm install
npm run nodemon
```
