# yomomma

`yomomma` is a Vercel-ready Next.js app for `yomomma.io`. It ships with:

- a frontend yo momma joke generator
- a REST API
- a text-file-backed joke dataset

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## REST API

- `GET /api/jokes`
- `GET /api/jokes?category=fat`
- `GET /api/jokes/random`
- `GET /api/jokes/random?category=fat`
- `GET /api/jokes/category/ugly`
- `GET /api/health`

## Deploy to Vercel

```bash
vercel
```

For production:

```bash
vercel --prod
```
# yomomma
