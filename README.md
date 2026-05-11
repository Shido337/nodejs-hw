# nodejs-hw

Express homework project for notes routes.

## Scripts

```bash
npm install
npm run dev
npm start
npm run lint
npm run format
```

## Local URLs

- `GET /notes`
- `GET /notes/:noteId`
- `GET /test-error`

## Expected responses

`GET /notes`

```json
{
  "message": "Retrieved all notes"
}
```

`GET /notes/123`

```json
{
  "message": "Retrieved note with ID: 123"
}
```

Unknown route:

```json
{
  "message": "Route not found"
}
```

Test error route:

```json
{
  "message": "Simulated server error"
}
```
