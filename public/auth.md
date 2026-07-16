# Agent Authentication

## Public APIs

The following endpoints are publicly accessible and do not require authentication:

- **Theme Browser**: `https://themes.icebergmedia.co.uk/themes/` — Browse website themes
- **Contact Form**: `https://themes-contact-form.iceberg.workers.dev` — Submit inquiries (POST)
- **API Catalog**: `https://themes.icebergmedia.co.uk/.well-known/api-catalog` — API discovery
- **LLMs.txt**: `https://themes.icebergmedia.co.uk/llms.txt` — Site information for LLMs

## Contact Form API

The contact form accepts POST requests with the following fields:

```
POST https://themes-contact-form.iceberg.workers.dev
Content-Type: application/x-www-form-urlencoded

name=Your Name
email=your@email.com
theme=Theme Name
business=Business Name
budget=under-500
message=Project details
```

No authentication required. Rate-limited to prevent abuse.

## Agent Registration

No registration required. All public endpoints are open to AI agents.

## Identity

- **Site**: https://themes.icebergmedia.co.uk
- **Operator**: Iceberg Media
- **Location**: Manchester, UK
- **Contact**: https://themes.icebergmedia.co.uk/contact-us/
