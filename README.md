# yomomma

`yomomma` is a Render-ready Next.js app for `yomomma.io`. It ships with:

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

## Deploy to Render

```bash
git push
```

Then create a new Render Web Service from the repo, or use the included `render.yaml`.

Render settings:

```bash
Build Command: npm install && npm run build
Start Command: npm start
```
