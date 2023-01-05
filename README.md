# 🔐 SvelteKit Authentication Patterns
A running work in progress. Examples of common auth patterns I keep around for convenience.

| Branch | Pattern | Description |
|-|-|-|
| `main` | Simple Sign In | Username/password login with a database and token management. |
| *Coming Soon* | Session Sign In | Like the previous setup but adds an additional sessions layer. This way we can remotely logout users by invalidating the session on our end.|
|  *Coming Soon* | Sign In w/Solana | Sessions + Sign in using a Solana wallet. |
|  *Coming Soon* | Sign In w/Discord | Sessions + Sign in using Discord. |
|  *Coming Soon* | Sign In w/Twitter | Sessions + Sign in using Twitter. |

## Required
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