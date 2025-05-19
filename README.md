# LogiCRM Automation Dashboard

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
![React](https://img.shields.io/badge/React-18.2.0-%2361DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0.2-%233178C6)

A modern logistics CRM platform unifying customer management, shipment tracking, and workflow automation.


## Features

🚀 **Core Capabilities**
- Unified CRM with HubSpot integration
- Real-time shipment tracking via ShipEngine API
- Automated workflows & notifications
- Customizable KPI dashboards
- Role-based access control
- Dark/Light theme support

📊 **Key Modules**
- Lead Management Pipeline
- Shipment Monitoring System
- Customer 360° Profiles
- Automated Alert System
- Business Intelligence Reports
- Cross-platform Responsive UI

## Tech Stack

**Frontend**
- React 18 + TypeScript
- Vite Build System
- Tailwind CSS v3
- React Query v4
- React Router v6

**Services**
- HubSpot CRM API
- ShipEngine Shipping API
- Zapier Webhooks
- JWT Authentication

**DevOps**
- Vercel Hosting
- GitHub Actions CI/CD
- Cypress E2E Testing
- ESLint + Prettier

## Getting Started

### Prerequisites
- Node.js v16+
- npm v8+
- API Keys:
  - HubSpot CRM
  - ShipEngine

### Installation
1. Clone repository:
```bash
git clone https://github.com/KiriManii/logicrm-dashboard.git
cd logicrm-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
VITE_HUBSPOT_API_KEY=your_hubspot_key
VITE_SHIPENGINE_API_KEY=your_shipengine_key
VITE_WEBHOOK_URL=your_zapier_webhook
```

4. Start development server:
```bash
npm run dev
```

## Project Structure

```bash
src/
├── components/    # Reusable UI components
├── contexts/      # Global state management
├── hooks/         # Custom React hooks
├── pages/         # Route-based page components
├── services/      # API service modules
├── types/         # TypeScript type definitions
├── utils/         # Helper functions
└── App.tsx        # Main application entry
```

## Configuration

### Environment Variables
| Variable | Description |
|----------|-------------|
| `VITE_HUBSPOT_API_KEY` | HubSpot CRM API key |
| `VITE_SHIPENGINE_API_KEY` | ShipEngine API key |
| `VITE_WEBHOOK_URL` | Zapier webhook endpoint URL |
| `VITE_API_BASE_URL` | Backend API base URL (optional) |

### Theme Customization
Modify Tailwind config for brand colors:
```js
// tailwind.config.js
theme: {
  extend: {
    colors: {
      primary: {
        900: '#1E3A8A', // Navy Blue
        500: '#6366F1'  // Indigo
      },
      secondary: {
        900: '#134E4A', // Teal
        500: '#14B8A6'
      }
    }
  }
}
```

## API Integration

### Fetching Leads
```tsx
import { useLeads } from '../hooks/useLeads';

const LeadsPage = () => {
  const { data: leads, isLoading } = useLeads();
  
  return (
    <LeadTable 
      leads={leads || []} 
      isLoading={isLoading}
    />
  );
};
```

### Tracking Shipments
```tsx
const { data: shipments } = useShipments();
const { data: tracking } = useShipmentTracking(shipmentId);
```

## Testing

Run test suite:
```bash
npm test        # Unit tests
npm run cy:open # E2E tests (Cypress)
```

## Deployment

1. Production build:
```bash
npm run build
```

2. Deploy to Vercel:
```bash
vercel --prod
```

## Contributing

1. Fork the repository
2. Create feature branch:
```bash
git checkout -b feat/your-feature
```
3. Commit changes using conventional commits:
```bash
git commit -m "feat: add shipment tracking component"
```
4. Push to branch and open PR

## Documentation

- [Technical Documentation](docs/TECHNICAL.md)
- [API Reference](docs/API.md)
- [User Guide](docs/USER_GUIDE.md)

## License

Distributed under MIT License. See `LICENSE` for details.

---

**Contact**  
Lewis Kimani - [info@lewiskimani.dev](mailto:info@lewiskimani.dev)  
Project Repository: [https://github.com/KiriManii/logicrm-dashboard](https://github.com/KiriManii/logicrm-dashboard)


