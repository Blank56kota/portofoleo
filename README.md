# Portfolio Website

A modern, animated portfolio website for a Full Stack Developer with API management capabilities.

## Features

- 🎨 **Modern UI/UX** - Beautiful, fluid animations with Framer Motion
- 🎯 **Full Stack** - React + TypeScript frontend, Node.js + Express backend
- 📱 **Responsive Design** - Works seamlessly on all devices
- 🔧 **API Management** - Admin panel to manage projects, skills, and experience
- ⚡ **Fast Performance** - Built with Vite for optimal performance
- 🎨 **TailwindCSS** - Modern utility-first CSS framework
- 🌈 **Beautiful Colors** - Carefully selected color palette with gradients

## Tech Stack

### Frontend
- React 18
- TypeScript
- Vite
- TailwindCSS
- Framer Motion (animations)
- React Icons
- Axios

### Backend
- Node.js
- Express
- TypeScript
- CORS enabled

## Installation

1. **Install root dependencies:**
   ```bash
   npm install
   ```

2. **Install all dependencies (root, server, and client):**
   ```bash
   npm run install-all
   ```

   Or install manually:
   ```bash
   # Server
   cd server
   npm install

   # Client
   cd ../client
   npm install
   ```

## Running the Application

### Development Mode (Both Frontend & Backend)

From the root directory:
```bash
npm run dev
```

This will start:
- Backend server on `http://localhost:5001`
- Frontend development server on `http://localhost:3000`

### Run Separately

**Backend only:**
```bash
cd server
npm run dev
```

**Frontend only:**
```bash
cd client
npm run dev
```

## Project Structure

```
portfolio-website/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── services/       # API services
│   │   └── App.tsx         # Main app component
│   └── package.json
├── server/                 # Node.js backend
│   ├── src/
│   │   └── index.ts        # Express server
│   └── package.json
└── package.json            # Root package.json
```

## API Endpoints

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get project by ID
- `POST /api/projects` - Create new project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Skills
- `GET /api/skills` - Get all skills
- `GET /api/skills/:id` - Get skill by ID
- `POST /api/skills` - Create new skill
- `PUT /api/skills/:id` - Update skill
- `DELETE /api/skills/:id` - Delete skill

### Experience
- `GET /api/experience` - Get all experience entries
- `GET /api/experience/:id` - Get experience by ID
- `POST /api/experience` - Create new experience
- `PUT /api/experience/:id` - Update experience
- `DELETE /api/experience/:id` - Delete experience

## Admin Panel

Click the settings icon (⚙️) in the navigation bar to access the admin panel. From there you can:
- Add, edit, and delete projects
- Manage skills and proficiency levels
- Update work experience
- All changes are saved via API calls

## Customization

### Colors
Edit `client/tailwind.config.js` to customize the color scheme.

### Content
- Update hero section in `client/src/components/Hero.tsx`
- Modify default data in `server/src/index.ts`
- Use the admin panel to manage content dynamically

### Fonts
Fonts are loaded from Google Fonts in `client/index.html`. Currently using:
- **Inter** - For body text
- **Poppins** - For headings

## Building for Production

**Build frontend:**
```bash
cd client
npm run build
```

**Build backend:**
```bash
cd server
npm run build
```

## Environment Variables

Create a `.env` file in the `server` directory:
```
PORT=5001
NODE_ENV=development
```

## Skills Showcased

- **Frontend:** React, Angular, TypeScript, JavaScript, HTML, CSS, SCSS, TailwindCSS, Bootstrap
- **Backend:** Node.js, Express
- **Mobile:** React Native
- **Tools:** Razorpay, Stripe, GitHub, Bitbucket

## License

MIT

## Author

Full Stack Developer Portfolio

