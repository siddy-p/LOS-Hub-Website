# Security Architecture & OWASP Compliance

LOS Hub follows OWASP guidelines for secure web applications:

1. **Security Headers**: Content-Security-Policy (CSP), Strict-Transport-Security (HSTS), X-Frame-Options, X-Content-Type-Options.
2. **Secrets Management**: No hardcoded API keys or secrets. All production secrets injected via Azure Key Vault.
3. **Input Sanitization**: Form inputs are validated on client and Next.js route handlers.
