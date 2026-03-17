# Alpha Entry Scanner Hub

NDX100 day trading scanner suite — hosted on Netlify.

## Structure

```
/               → Hub launcher (pick your version)
/v4_6/          → Alpha Entry Scanner v4.6 (stable/legacy)
/v13/           → Alpha Entry Scanner v13.22 (current)
```

## Deploy to Netlify

1. Push this repo to GitHub
2. Connect repo to Netlify (New site → Import from Git)
3. Build settings: none needed (static HTML)
4. Publish directory: `.` (root)

Netlify auto-serves `index.html` at each directory path.
