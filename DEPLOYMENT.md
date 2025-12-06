# Deployment Guide

This guide will help you deploy your portfolio website for free.

## 🚀 Recommended: Vercel (Frontend) + Render (Backend)

### Frontend Deployment on Vercel

1. **Push your code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/portfolio.git
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub
   - Click "New Project"
   - Import your repository
   - **Root Directory**: Set to `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - Click "Deploy"

3. **Update API URL**
   - After backend is deployed, update `client/src/services/api.ts`
   - Change `API_BASE_URL` to your backend URL

### Backend Deployment on Render

1. **Deploy on Render**
   - Go to [render.com](https://render.com)
   - Sign up with GitHub
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - **Settings**:
     - **Name**: portfolio-api
     - **Root Directory**: `server`
     - **Environment**: Node
     - **Build Command**: `npm install && npm run build`
     - **Start Command**: `npm start`
   - Click "Create Web Service"

2. **Environment Variables** (if needed)
   - Add `NODE_ENV=production`
   - Add `PORT=10000` (Render uses port 10000)

3. **Update CORS in server**
   - Update `server/src/index.ts` CORS origin to your Vercel URL

## 🌐 Alternative: Netlify (Frontend) + Railway (Backend)

### Frontend on Netlify

1. Go to [netlify.com](https://netlify.com)
2. Sign up with GitHub
3. Click "Add new site" → "Import an existing project"
4. Select your repository
5. **Build settings**:
   - **Base directory**: `client`
   - **Build command**: `npm run build`
   - **Publish directory**: `client/dist`
6. Click "Deploy site"

### Backend on Railway

1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. **Settings**:
   - **Root Directory**: `server`
   - **Start Command**: `npm start`
6. Railway will auto-detect and deploy

## 📦 All-in-One: Render (Both Services)

Deploy both frontend and backend on Render:

### Backend Service
- Follow Render backend steps above

### Frontend Service
1. Create another Web Service on Render
2. **Settings**:
   - **Name**: portfolio-frontend
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Start Command**: `npm run preview` (or use static site)
   - **Environment**: Static Site

## 🔧 Pre-Deployment Checklist

### Frontend
- [ ] Update API URL in `client/src/services/api.ts` to production backend URL
- [ ] Test build locally: `cd client && npm run build`
- [ ] Check for any hardcoded localhost URLs

### Backend
- [ ] Update CORS origin to allow your frontend domain
- [ ] Set `NODE_ENV=production`
- [ ] Test server locally: `cd server && npm start`
- [ ] Ensure all environment variables are set

## 📝 Environment Variables

### Frontend (.env)
```env
VITE_API_URL=https://your-backend-url.onrender.com/api
```

### Backend (.env)
```env
NODE_ENV=production
PORT=10000
```

## 🔗 Update CORS Configuration

After deploying, update `server/src/index.ts`:

```typescript
app.use(cors({
  origin: [
    'https://your-frontend.vercel.app',
    'https://your-frontend.netlify.app',
    'http://localhost:3000' // Keep for local development
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: false
}));
```

## 🎯 Quick Deploy Commands

### Vercel CLI (Frontend)
```bash
cd client
npm i -g vercel
vercel
```

### Render CLI (Backend)
```bash
cd server
npm i -g render-cli
render deploy
```

## 📚 Additional Resources

- **Vercel Docs**: https://vercel.com/docs
- **Render Docs**: https://render.com/docs
- **Netlify Docs**: https://docs.netlify.com
- **Railway Docs**: https://docs.railway.app

## 🆓 Free Tier Limits

| Platform | Frontend | Backend | Limits |
|----------|----------|---------|--------|
| Vercel | ✅ | ❌ | Unlimited |
| Netlify | ✅ | ❌ | 100GB bandwidth/month |
| Render | ✅ | ✅ | 750 hours/month |
| Railway | ✅ | ✅ | $5 credit/month |
| Fly.io | ✅ | ✅ | 3 shared VMs |

## 💡 Pro Tips

1. **Use environment variables** for API URLs
2. **Enable auto-deploy** from GitHub
3. **Set up custom domains** (free on most platforms)
4. **Monitor logs** for debugging
5. **Use HTTPS** (automatic on all platforms)

