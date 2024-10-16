This is a simple [Next.js](https://nextjs.org/) project that implements the TurboRepo remote caching API and provides a minimal management page for the saved cache.

## Server Setup

Use the Docker image. Make sure to set the following env vars:

```
API_TOKEN=<example value>
UPLOAD_PATH=uploads
```

> [!WARNING] DO NOT CHANGE THE UPLOAD_PATH VALUE
> This is currently hardcoded to /uploads in the Dockerfile. I'll fix this later but for now just don't change it.

## Using the Remote Cache

Using the cache in builds is a bit of manual work. I intend to write a script to automate this later.

1. Add `config.json` to your root-level `.turbo` folder (if needed)
2. Add the following line to the JSON object:

```
"apiurl": "https://example.com"
```

> [!IMPORTANT]
> Notice the lack of a trialing slash in the URL. This is important. Another thing I'll remedy in the future. 3.

3. Add the following flags to your `turbo build` command in `package.json`:

```
--team=some-team --token=<value of API_TOKEN var set in the .env of your server>
```
