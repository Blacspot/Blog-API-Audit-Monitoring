# Syntecxhub Blog Data Analytics API

A production-ready RESTful API built with **Node.js**, **Express**, and **MongoDB** that combines full blog CRUD operations with powerful data analytics powered by MongoDB aggregation pipelines.

> Built to explore the intersection of backend architecture and real-world data analytics — not just a CRUD app, but a system that derives insights from its own data.

---

## What It Does

This API serves two purposes: it manages blog content and simultaneously provides analytical intelligence about that content. The analytics layer uses MongoDB's native aggregation framework to answer questions like *"Which authors publish most?"*, *"What categories are trending?"*, and *"How does publishing activity change month over month?"*

---

## Features

### Blog Management (CRUD)
- Create, read, update, and delete blog posts
- Auto-generated timestamps on every post
- Structured validation via Mongoose schema

### Analytics Endpoints
- **Posts per category** — see content distribution across topics
- **Posts per month** — track publishing trends over time
- **Top authors** — ranked leaderboard of most prolific contributors
- **Posts by date range** — filter and analyze activity within any time window

### Developer Experience
- Modular, service-layer architecture (controllers → services → models)
- Global error handling middleware
- Database seed script for instant test data (100 sample posts)
- Clean separation of concerns throughout

---

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MongoDB |
| ODM | Mongoose |
| Package Manager | pnpm |

---

## Project Structure

```
blog-data-analytics-api/
├── src/
│   ├── config/
│   │   └── db.js                    # MongoDB connection
│   ├── controllers/
│   │   ├── post.controller.js       # CRUD request handlers
│   │   └── analytics.controller.js  # Analytics request handlers
│   ├── middleware/
│   │   └── error.middleware.js      # Global error handler
│   ├── models/
│   │   └── post.model.js            # Mongoose schema & model
│   ├── routes/
│   │   ├── post.routes.js           # /api/posts routes
│   │   └── analytics.routes.js     # /api/analytics routes
│   ├── services/
│   │   └── analytics.service.js    # Aggregation pipeline logic
│   ├── scripts/
│   │   └── seedPosts.js            # Database seeder
│   └── app.js                      # Express app setup
├── server.js                        # Entry point
├── .env
└── package.json
```

---

## Getting Started

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)
- pnpm


## Author

**Mcbride Obwoge**  
· Backend Developer · Full Stack Engineer · Cloud & DevOps Enthusiast

---

*Built with Node.js · Express · MongoDB*
