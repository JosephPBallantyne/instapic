> App was moved to Netifly/Heroku due to deployment costs  
> Updated URL: https://condescending-jones-7811de.netlify.app/

## Overview

A simple image-sharing webapp, InstaPic.

Created using PERN stack (Postgres, Express.js, React, Node.js), with AWS storage and deployment to GCP.

### Achieved

- User authentication
- User sign up and login
- Image file upload (AWS S3)
- Retrieve image files
- Automated unit tests
- Basic validation and error handling
- Table sorting
- Table pagination
- Redux and React Router
- Deployed backend to App Engine (GCP)
- Deployed frontend as static website to Google Storage bucket (GCP)
- Functional UI

### Future Work

- Persist user login after refresh
- Enhance validation and error handling
- Increase test coverage
- Frontend tests
- Table column filter
- Pleasant UI experience
- Remove cases of 'any' for TypeScript typing
- Loading indicator for large files

## Deliverable

Github: https://github.com/JosephPBallantyne/instapic

Production URL: ~~https://infinityworkout.dev/~~ https://condescending-jones-7811de.netlify.app/

### Source Code

Clone the repository and run the following commands from inside the folder.

#### backend-api

npm i  
npm run build  
npm run start (local), with .env environment variables  
npm run deploy (prod), .app.dev.yaml config and environment variables

##### Test

npm run test

#### frontend-web

npm i  
set .env file  
npm run build  
npm run start (local)  
npm run deploy (prod)
