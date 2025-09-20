# Job Site Inventory Management System

A modern React application built with **Vite** and **TypeScript** for managing job sites and their inventory categories. This application follows a Figma design specification and provides comprehensive inventory management functionality for construction or project-based businesses.

##Features

- **Job Site Management**: Create and manage multiple job sites with categorized inventories
- **Advanced Search**: Search across job sites and inventory items with real-time filtering
- **Inventory Updates**: Edit and update items within each category
- **Figma Design Implementation**: Pixel-perfect implementation following provided design specifications
- **Vite Development**: Lightning-fast development server with Hot Module Replacement (HMR)
- **TypeScript**: Full type safety and enhanced developer experience
- **Responsive Design**: Mobile-first approach optimized for field workers and office staff

##Quick Start

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (version 18.x or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn** - [Install yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/mateocaka/react-interview-task.git
   ```

2. **Navigate to the project directory**
   ```bash
   cd react-interview-task
   ```

3. **Install dependencies**
   ```bash
   # Using npm
   npm install
   
   # Or using yarn
   yarn install
   ```

### Running the Application

Start the Vite development server:

```bash
# Using npm
npm run dev

# Or using yarn
yarn dev
```

The application will open automatically at [http://localhost:5173](http://localhost:5173). Vite's development server provides instant Hot Module Replacement (HMR) for a smooth development experience.

##Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Runs the app in development mode with Vite's HMR |
| `npm run build` | Creates an optimized production build |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint to check code quality |

## Project Structure

```
react-interview-task/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── JobSiteManager/
│   │   ├── InventorySearch/
│   │   ├── CategoryManager/
│   │   └── ItemEditor/
│   ├── assets/
│   ├── types/
│   │   └── inventory.ts
│   ├── utils/
│   ├── App.tsx
│   ├── App.css
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── screenshots/
│   ├── job-site-creation.png
│   ├── inventory-search.png
│   ├── category-management.png
│   └── item-update.png
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
└── README.md
```

##Application Screenshots

Screenshots of the completed application are available in the `/screenshots` folder:

- **Job Site Creation**: `/screenshots/job-site-creation.png`
- **Inventory Search**: `/screenshots/inventory-search.png` 
- **Category Management**: `/screenshots/category-management.png`
- **Item Updates**: `/screenshots/item-update.png`

##Built With

- **React 18** - Modern React with concurrent features
- **Vite** - Next generation frontend tooling
- **TypeScript** - Typed superset of JavaScript
- **ESLint** - Code quality and consistency tools
- **CSS3** - Styling following Figma design specifications

##Core Functionality

### 1. Job Site Creation
- Create new job sites with customizable categories
- Assign inventory categories to each job site
- Manage multiple job sites simultaneously

### 2. Search Functionality
- Real-time search across all job sites
- Filter inventory items by name, category, or job site
- Advanced filtering options for efficient item location

### 3. Inventory Management
- Update item quantities, descriptions, and status
- Add new items to existing categories
- Remove or archive items as needed

##Security Considerations

### How might you make this app more secure?

1. **Authentication & Authorization**
   - Implement JWT-based authentication with refresh tokens
   - Role-based access control (Admin, Manager, Field Worker)
   - Multi-factor authentication for sensitive operations

2. **Data Protection**
   - Input validation and sanitization on both client and server
   - SQL injection prevention with parameterized queries
   - XSS protection with Content Security Policy (CSP)
   - HTTPS enforcement for all communications

3. **API Security**
   - Rate limiting to prevent abuse
   - API key management for external integrations
   - Request/response encryption for sensitive data
   - Audit logging for all inventory changes

4. **Client-Side Security**
   - Secure local storage practices (avoid storing sensitive data)
   - Session timeout implementation
   - Secure cookie configuration
   - Regular dependency updates and vulnerability scanning

##Scalability Strategy

### How would you make this solution scale to millions of records?

1. **Database Optimization**
   - **Horizontal Partitioning**: Partition data by job site or date ranges
   - **Indexing Strategy**: Create composite indexes on frequently queried fields
   - **Database Sharding**: Distribute data across multiple database instances
   - **Read Replicas**: Implement read replicas for search-heavy operations

2. **Caching Layer**
   - **Redis Cache**: Cache frequently accessed job sites and categories
   - **CDN Implementation**: Cache static assets and API responses
   - **Application-Level Caching**: Implement memoization for expensive calculations
   - **Query Result Caching**: Cache database query results with appropriate TTL

3. **Backend Architecture**
   - **Microservices**: Separate services for job sites, inventory, and search
   - **Load Balancing**: Distribute traffic across multiple server instances
   - **Message Queues**: Use RabbitMQ or Apache Kafka for async processing
   - **API Gateway**: Centralize routing, authentication, and rate limiting

4. **Frontend Optimization**
   - **Virtual Scrolling**: Handle large lists efficiently without DOM overload
   - **Lazy Loading**: Load inventory data on-demand as users navigate
   - **Search Optimization**: Implement debounced search with result pagination
   - **State Management**: Use efficient state management (Zustand/Redux Toolkit)

5. **Search & Analytics**
   - **Elasticsearch**: Implement full-text search with aggregations
   - **Search Indexing**: Maintain separate search indexes for fast queries
   - **Analytics Pipeline**: Track usage patterns for optimization opportunities
   - **Data Archiving**: Archive old records to maintain performance

6. **Infrastructure**
   - **Container Orchestration**: Deploy with Kubernetes for auto-scaling
   - **CDN**: Use CloudFlare or AWS CloudFront for global distribution
   - **Database Clustering**: Implement MongoDB Atlas or PostgreSQL clusters
   - **Monitoring**: Comprehensive monitoring with DataDog or New Relic

##Deployment

### Building for Production

Create an optimized production build:

```bash
npm run build
```

This generates a `dist/` folder with optimized static files ready for deployment.

### Deployment Options

The production build can be deployed to any static hosting service:

- **Netlify**: Drag and drop the `dist` folder or connect via GitHub
- **Vercel**: Connect your GitHub repository for automatic deployments
- **AWS S3 + CloudFront**: Upload the `dist` folder contents
- **Docker**: Use the included Dockerfile for containerized deployment

##Testing

Future enhancements will include:

- Unit tests for components using Jest and React Testing Library
- Integration tests for inventory operations
- End-to-end tests with Playwright for critical user flows
- Performance testing for large dataset handling

##Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/inventory-enhancement`)
3. Commit your changes (`git commit -m 'Add advanced filtering'`)
4. Push to the branch (`git push origin feature/inventory-enhancement`)
5. Open a Pull Request

##Troubleshooting

### Common Issues

**Port 5173 is already in use**
- Vite will automatically try alternative ports (5174, 5175, etc.)
- Or set a custom port: `npm run dev -- --port 3000`

**Search performance issues**
- Implement search debouncing (300ms delay)
- Add pagination for large result sets
- Consider implementing virtual scrolling for performance

**Memory issues with large datasets**
- Implement data virtualization
- Use React.memo() for expensive component renders
- Consider lazy loading for off-screen content

