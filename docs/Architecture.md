# LOS Hub Architecture & Multi-Airport Domain Model

LOS Hub is designed from day one as a data-driven multi-airport platform.

## Multi-Airport Entity Diagram

```
Airport (MM2 / MMIA / ABV / PHC)
 ├── Services (Porter, Cab, Lounge, FastTrack)
 ├── Pricing (NGN fixed rate per service)
 ├── Operating Hours & Terminals
 ├── Drivers & Chauffeurs
 ├── Porters
 ├── Lounges & Hotels
 └── Corporate Accounts
```

## Azure Cloud Infrastructure

- **Azure App Service**: Linux App Service Plan hosting Next.js 15 standalone output.
- **Azure Front Door + CDN**: Edge caching and global SSL termination.
- **Azure Key Vault**: Managing database connection strings and API credentials.
- **Azure Application Insights**: Telemetry, exception tracking, and performance logs.
