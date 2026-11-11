# Project Management Board

An Angular and NgRx project management app with boards, columns, tasks, and authenticated routes. The Angular Router guards access to boards and profile editing.

## Run locally

The project specifies Node.js 18.2.0 and npm 8.5.4.

```sh
npm ci
npx ng serve
```

Sign-in and board data depend on the configured backend. Use `npm run build` to build the app and `npm test` to run the Karma test runner.
