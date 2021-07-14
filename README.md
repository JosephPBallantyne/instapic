Overview

A simple image-sharing webapp, InstaPic.

Created using PERN stack (Postgres, Express.js, React, Node.js), with AWS storage and deployment to GCP.

Achieved

- User authentication
- User sign up and login
- Image file upload (AWS S3)
- Retrieve image files
- Automated unit tests
- Basic validation and error handling
- Table sorting
- Table pagination
- Redux and React Router
- Deployment (GCP)
- Functional UI

Future Work

- Persist user login after refresh
- Enhance validation and error handling
- Increase test coverage
- Frontend tests
- Table column filter
- Pleasant UI experience

Deliverable

Production URL: https://infinityworkout.dev/
Github: https://github.com/JosephPBallantyne/instapic

Source Code

backend-api

npm i
npm run build
npm run start (local)

- .env environment variables
  npm run deploy (prod)

- .app.dev.yaml config and environment variables

Test
npm run test

frontend-web

npm i
set .env file
npm run build
npm run start (local)
npm run deploy (prod)
