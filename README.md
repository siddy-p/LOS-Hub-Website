# LOS Hub — Nigeria's Official Airport Experience Platform

> **Level Of Service for African Airports.**
> Starting at **MM2 Lagos** and expanding airport by airport across Africa (MMIA, Abuja, Port Harcourt, Accra, Nairobi, Johannesburg).

---

## ✈️ About LOS Hub

LOS Hub transforms airport travel in Africa by eliminating airport terminal chaos, baggage haggling, unauthorized street drivers, and lack of lounge access.

### Launch Services (MM2 Lagos)
- **Verified Airport Porter**: ₦5,000 / booking
- **Verified Executive Airport Cab**: Avg. ₦15,000 / ride
- **Executive VIP Lounge Access**: ₦20,000 / pass
- **Fast Track Escort**: *Coming Soon*

---

## 🌟 Interactive Multi-Portal Ecosystem & Demo Mode

This platform includes **9 dedicated portal experiences** accessible directly or via the floating **Demo Persona Switcher**:

1. **Public Marketing Portal** (`/`): Public landing, services, multi-airport directory.
2. **Traveler Portal** (`/traveler`): Passenger dashboard, live flight tracker, wallet, instant bookings.
3. **Driver Chauffeur Portal** (`/driver`): Chauffeur trip queue, fare breakdown, GPS navigation, vehicle status.
4. **Porter Operations Portal** (`/porter`): Baggage carousel queue, passenger assignments, QR verification.
5. **Hotel & Lounge Partner Portal** (`/partner`): Real-time occupancy, guest lounge passes, revenue tracking.
6. **Corporate Travel Portal** (`/corporate-portal`): Enterprise travel management, GTBank/FirstBank accounts, monthly invoicing.
7. **Airline Operations Portal** (`/airline`): Air Peace ground handling, VIP meet-and-greet queue.
8. **FAAN Airport Command Center** (`/faan`): Live throughput metrics, passenger flow heatmaps, incident dispatch.
9. **Super Admin Dashboard** (`/admin`): Global platform provisioning, multi-airport configuration, audit logs.

---

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router) + React 19
- **Language**: Strict TypeScript
- **Styling**: Tailwind CSS + Custom Design System (Official Logo Brand Colors: Deep Navy `#0F2137`, Antique Gold `#C59B27`, Emerald `#115E3B`)
- **Icons**: Lucide Icons
- **Azure Readiness**: Azure App Service, Azure Front Door, Azure Application Insights, Azure Key Vault, Azure Blob Storage.
- **Testing**: Vitest unit testing & Playwright E2E suite.
- **CI/CD**: GitHub Actions workflows (`ci.yml`, `cd-azure.yml`).

---

## 🛠 Local Setup & Running

```bash
# Install dependencies
npm install

# Run unit tests
npm run test

# Run Next.js local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to launch the app.
