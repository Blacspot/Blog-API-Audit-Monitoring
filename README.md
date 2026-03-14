# Secure Blog Api with Audit Monitoring

A production-ready RESTful API built with **Node.js**, **Express**, and **MongoDB** that combines full blog CRUD operations, JWT-based authentication, role-based access control, and a compliance-grade audit and monitoring layer.

> Built to explore the intersection of backend architecture, security, and real-world data analytics — not just a CRUD app, but a security-aware system that monitors its own activity, tracks changes, and derives insights from its own data.

---

## What It Does

This API serves three purposes: it manages blog content, enforces secure authenticated access, and simultaneously records a full audit trail of all system activity. The audit layer automatically captures every request, tracks resource changes, and exposes analytics endpoints restricted to administrators only.

---

## Features

### Authentication & Authorization
- User registration and login with **JWT tokens**
- **Role-based access control** — `user` and `admin` roles
- Passwords hashed with **bcrypt** before storage
- Protected routes via `protect` middleware
- Optional auth middleware for public routes that still capture user identity when a token is present

### Blog Management (CRUD)
- Create, read, update, and delete blog posts
- Posts are **linked to their author** via User ObjectId reference
- Authors can only edit and delete their own posts
- Admins can edit and delete any post
- Author details populated on post retrieval (firstName, lastName, username)
- Auto-generated timestamps on every post

### Audit & Monitoring Layer
- **Automatic middleware-based logging** — every request is recorded without manual intervention in controllers
- **Change tracking** — `before` and `after` states captured on updates
- **Immutable audit logs** — records cannot be edited or deleted
- **Admin-only access** to all audit endpoints

### Audit Analytics (Admin Only)
- **GET /api/audit/logs** — full activity history
- **GET /api/audit/logs/:id** — inspect a specific log entry
- **GET /api/audit/stats** — breakdown of actions (GET, POST, PUT, DELETE)
- **GET /api/audit/top-users** — most active users by request count
- **GET /api/audit/activity** — daily activity trends over time

### Blog Analytics
- **Posts per category** — content distribution across topics
- **Posts per month** — publishing trends over time
- **Top authors** — ranked leaderboard of most prolific contributors
- **Posts by date range** — filter and analyze activity within any time window

### Developer Experience
- Modular, service-layer architecture (controllers → services → models)
- Global error handling middleware
- Database seed script — creates 4 users (including 1 admin) and 100 sample posts with real ObjectId author references
- Clean separation of concerns throughout

---

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MongoDB Atlas |
| ODM | Mongoose |
| Authentication | JSON Web Tokens (JWT) |
| Password Hashing | bcrypt |
| Package Manager | pnpm |

---

## Project Structure
```
syntecxhub-blog-api-v2/
├── src/
│   ├── config/
│   │   └── db.js                      # MongoDB connection
│   ├── controllers/
│   │   ├── auth.controller.js         # signup, login
│   │   ├── post.controller.js         # CRUD request handlers
│   │   └── analytics.controller.js    # Analytics request handlers
│   ├── middleware/
│   │   ├── auth.middleware.js         # protect, isAdmin, optionalProtect
│   │   ├── audit.middleware.js        # automatic request logging
│   │   └── error.middleware.js        # global error handler
│   ├── models/
│   │   ├── user.model.js              # User schema with role field
│   │   ├── post.model.js              # Post schema with author reference
│   │   └── auditLog.model.js          # Immutable audit log schema
│   ├── routes/
│   │   ├── auth.routes.js             # /api/auth
│   │   ├── post.routes.js             # /api/posts
│   │   ├── analytics.routes.js        # /api/analytics
│   │   └── audit.routes.js            # /api/audit (admin only)
│   ├── services/
│   │   └── analytics.service.js       # Aggregation pipeline logic
│   ├── scripts/
│   │   └── seedPosts.js               # Database seeder
│   └── app.js                         # Express app setup
├── server.js                           # Entry point
├── .env
└── package.json
```

---


## Author

**Mcbride Obwoge**  
· Backend Developer · Full Stack Engineer · Cloud & DevOps Enthusiast

---

*Built with Node.js · Express · MongoDB*