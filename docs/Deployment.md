# Azure App Service Deployment Guide

## GitHub Actions Automated Deployment

1. Create an Azure App Service (Linux, Node.js 22 runtime).
2. Download the App Service Publish Profile from the Azure Portal.
3. In GitHub Repository Secrets, add `AZURE_WEBAPP_PUBLISH_PROFILE`.
4. Pushing to `main` triggers `.github/workflows/cd-azure.yml`.

## Docker Container Deployment

```bash
docker build -t loshub.azurecr.io/web-app:latest .
docker run -p 3000:3000 loshub.azurecr.io/web-app:latest
```
