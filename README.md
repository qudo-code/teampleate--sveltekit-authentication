# 🔐 SvelteKit Authentication Patterns
A running work in progress. Examples of common auth patterns I keep around for convenience.

| Branch | Pattern | Description |
|-|-|-|
| `main` | Simple Sign In | Username/password login with a database and token management. |
| *Coming Soon* | Session Sign In | Like the previous setup but adds an additional sessions layer. This way we can remotely logout users by invalidating the session on our end.|
|  *Coming Soon* | Sign In w/Solana | Sessions + Sign in using a Solana wallet. |
|  *Coming Soon* | Sign In w/Discord | Sessions + Sign in using Discord. |
|  *Coming Soon* | Sign In w/Twitter | Sessions + Sign in using Twitter. |

## Overview
### Auth Flow
1. User logs in or creates an account. Either of these actions create a JWT from their account details, attaches it as a secure cookie, then redirects to the app.
2. The `src/hooks.server.ts` file runs on every request. This file determines if the user is signed in and allowed to view gated content. If a gated route is loaded but the user doesn't have a JWT/valid session cookie in their browser, they will be redirected to login.

### Adding Data Models
1. Follow the patterns in `src/schemas.ts` to define the new type.
2. Import your new schema into `src/models.ts` to register it with the database.
3. See usage of `InferSchemaType` in `src/types.ts` to register your new schema as a TypeScript type.

From here you should be able to import the models into endpoints and use `mongoose` as expected. See examples in existing endpoints.

### Pages/Endpoints
#### `src/routes/api`
These are server side endpoints the UI hits.

#### `src/routes/+page.svelte`
The home page that is gated by authentication. 

#### `src/routes/app/login/+page.svelte`
The login page. 

#### `src/routes/app/sign-up/+page.svelte`
The create account page. 


## Run
Before anything, ensure you have Node installed and then install the project.
`npm install`

### Environment Setup
The following environment variables are required. Your made up secret to create JWTs, and MongoDB connection string.

- `ENV_JWT_SECRET`: Some secret/password you generate and keep secret that is uses to encode/decode JWTs.
- `ENV_MONGO`: MongoDB connection string. Should look something like `mongodb+srv://username:password@url.mongodb.net/sign-on?retryWrites=true&w=majority`.

#### Dev Setup
Create a `.env` in the root of the project that looks like this but with your values.
```
ENV_JWT_SECRET=
ENV_MONGO=
```

#### Start Dev Server
`npm run dev`

#### Build
`npm run build`

