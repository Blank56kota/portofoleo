# 🚀 Quick Deployment Guide

## Easiest Option: Vercel + Render (Recommended)

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Portfolio website"
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
git push -u origin main
```

### Step 2: Deploy Backend (Render) - 5 minutes
1. Go to [render.com](https://render.com) → Sign up with GitHub
2. Click "New +" → "Web Service"
3. Connect your GitHub repo
4. Settings:
   - **Name**: `portfolio-api`
   - **Root Directory**: `server`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
5. Click "Create Web Service"
6. **Copy your backend URL** (e.g., `https://portfolio-api.onrender.com`)

### Step 3: Deploy Frontend (Vercel) - 3 minutes
1. Go to [vercel.com](https://vercel.com) → Sign up with GitHub
2. Click "New Project" → Import your repo
3. Settings:
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. **Environment Variables**:
   - Add `VITE_API_URL` = `https://your-backend-url.onrender.com/api`
5. Click "Deploy"

### Step 4: Update CORS
1. Go back to Render dashboard
2. Find your backend service
3. Add Environment Variable:
   - `FRONTEND_URL` = `https://your-frontend.vercel.app`
4. Update `server/src/index.ts` CORS to include your Vercel URL

## ✅ Done! Your portfolio is live!

**Frontend**: `https://your-project.vercel.app`  
**Backend**: `https://portfolio-api.onrender.com`

---

## Alternative: All on Render (Simpler)

1. Deploy backend as Web Service (same as above)
2. Deploy frontend as Static Site:
   - **New +** → **Static Site**
   - **Root Directory**: `client`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`

---

## 🆓 Free Tier Limits

- **Vercel**: Unlimited deployments, 100GB bandwidth
- **Render**: 750 hours/month (enough for 24/7)
- **Netlify**: 100GB bandwidth/month
- **Railway**: $5 credit/month

All platforms offer:
- ✅ Free HTTPS/SSL
- ✅ Custom domains
- ✅ Auto-deploy from GitHub
- ✅ No credit card required

---

## 📝 Before Deploying

1. Test locally: `npm run dev` (root) should work
2. Build test: `cd client && npm run build`
3. Update API URLs in code
4. Push to GitHub

---

## 🆘 Need Help?

Check `DEPLOYMENT.md` for detailed instructions and troubleshooting.

