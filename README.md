# TripNest 🏡

A full-stack Airbnb-style rental listing platform where users can discover, list, and review properties from around the world.

🔗 **Live Demo:** [https://tripnest-f53u.onrender.com](https://tripnest-f53u.onrender.com)  

---
     
## Tech Stack  
  
| Layer | Technology |
|-------|------------|
| Runtime | Node.js |
| Framework | Express.js |
| Templating | EJS + ejs-mate |
| Database | MongoDB + Mongoose |
| Auth | Passport.js (Local Strategy) |
| Session Store | connect-mongo |
| File Upload | Cloudinary + Multer |
| Maps | Mapbox GL JS |
| Styling | Bootstrap 5 |
| Deployment | Render |

---

## Features

- **Authentication** — Register, login, logout with Passport.js session-based auth
- **Listings CRUD** — Create, read, update, delete property listings
- **Image Upload** — Upload listing photos via Cloudinary
- **Map Integration** — Geocoded property locations displayed on interactive Mapbox maps
- **Reviews & Ratings** — Authenticated users can post and delete reviews
- **Authorization** — Only listing/review owners can edit or delete their content
- **Flash Messages** — Success and error feedback on all user actions
- **Responsive UI** — Mobile-friendly layout with Bootstrap 5

---

## Project Structure

```
TripNest/
├── models/
│   ├── listing.js        # Listing schema (with geometry for Mapbox)
│   ├── review.js         # Review schema
│   └── user.js           # User schema (passport-local-mongoose)
├── routes/
│   ├── listing.js        # Listing routes
│   ├── review.js         # Review routes
│   └── user.js           # Auth routes
├── views/
│   ├── layouts/          # ejs-mate boilerplate layout
│   ├── listings/         # Listing templates
│   └── users/            # Auth templates
├── public/               # Static assets (CSS, JS)
├── utils/
│   ├── ExpressError.js   # Custom error class
│   └── wrapAsync.js      # Async error handler wrapper
├── init/
│   ├── data.js           # Sample seed data
│   └── insertdata.js     # DB seed script
├── middleware.js          # Auth & validation middleware
├── app.js                # Entry point
└── .env                  # Environment variables (not committed)
```

---

## Getting Started

### Prerequisites

- Node.js v18+
- MongoDB Atlas account
- Cloudinary account
- Mapbox account

### Installation

```bash
# Clone the repo
git clone https://github.com/yourusername/tripnest.git
cd tripnest

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```env
ATLAS_DB=mongodb+srv://<username>:<password>@cluster.mongodb.net/tripnest
SECRET=your_session_secret
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
MAP_TOKEN=your_mapbox_token
```

### Seed the Database

```bash
node init/insertdata.js
```

### Run Locally

```bash
node app.js
# or with nodemon
nodemon app.js
```

App runs at `http://localhost:8080`

---

## Deployment (Render)

1. Push code to GitHub
2. Create a new **Web Service** on [Render](https://render.com)
3. Connect your GitHub repo
4. Set all environment variables in Render Dashboard → **Environment** tab
5. Set build command: `npm install`
6. Set start command: `node app.js`

> **Note:** Render does not use `.env` files. All secrets must be set via the Render dashboard.

---

## API Routes

### Listings

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/listing` | All listings |
| GET | `/listing/new` | New listing form |
| POST | `/listing` | Create listing |
| GET | `/listing/:id` | Listing detail |
| GET | `/listing/:id/edit` | Edit form |
| PUT | `/listing/:id` | Update listing |
| DELETE | `/listing/:id` | Delete listing |

### Reviews

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/listing/:id/review` | Add review |
| DELETE | `/listing/:id/review/:reviewId` | Delete review |

### Auth

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/register` | Register form |
| POST | `/register` | Create user |
| GET | `/login` | Login form |
| POST | `/login` | Authenticate user |
| GET | `/logout` | Logout |

---

## License

MIT
