# 🌐 Deployment Guide - Workshop Registration System

## ⚠️ Important: Why Not Netlify?

**Netlify CANNOT host this project** because:
- Netlify only hosts static HTML/CSS/JS files
- This project needs a Node.js backend server
- The system requires persistent data storage
- API endpoints need a running server

## ✅ Recommended Hosting Platforms

### 🥇 Option 1: Render (RECOMMENDED - Easiest)

**Why Render?**
- ✅ FREE tier available
- ✅ Automatic deployments from GitHub
- ✅ Easy setup (5 minutes)
- ✅ Persistent disk storage available
- ✅ Great for Node.js apps

**Steps:**

1. **Create a GitHub Repository**
   ```bash
   cd workshop-registration
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   ```
   - Go to GitHub.com and create a new repository
   - Follow GitHub's instructions to push your code

2. **Deploy on Render**
   - Go to https://render.com
   - Sign up (free account)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Render will auto-detect the `render.yaml` file
   - Click "Create Web Service"
   - Wait 2-3 minutes for deployment

3. **Your App is Live!**
   - Render will give you a URL like: `https://workshop-registration-xyz.onrender.com`
   - Admin panel: `https://your-url.onrender.com/admin.html`
   - Registration form: `https://your-url.onrender.com/index.html`

**Cost:** FREE tier (enough for testing and small events)

---

### 🥈 Option 2: Railway

**Why Railway?**
- ✅ Very easy deployment
- ✅ $5 free credit
- ✅ Great developer experience
- ✅ Fast deployments

**Steps:**

1. **Push to GitHub** (same as above)

2. **Deploy on Railway**
   - Go to https://railway.app
   - Sign up with GitHub
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your repository
   - Railway auto-detects Node.js
   - Click "Deploy"

3. **Get Your URL**
   - Go to Settings → Generate Domain
   - Your app will be live!

**Cost:** $5 free credit, then ~$5/month

---

### 🥉 Option 3: Heroku

**Why Heroku?**
- ✅ Classic, reliable platform
- ✅ Good documentation
- ✅ Eco dynos available

**Steps:**

1. **Install Heroku CLI**
   ```bash
   # Download from: https://devcenter.heroku.com/articles/heroku-cli
   ```

2. **Create Procfile**
   Already created for you: `Procfile`

3. **Deploy**
   ```bash
   cd workshop-registration
   heroku login
   heroku create workshop-registration-app
   git init
   git add .
   git commit -m "Initial commit"
   git push heroku main
   ```

4. **Open Your App**
   ```bash
   heroku open
   ```

**Cost:** Eco dynos ~$5/month (no free tier anymore)

---

### 🥉 Option 4: Vercel (Serverless)

**Note:** Requires converting to serverless functions (more complex)

**Why Vercel?**
- ✅ Great for serverless
- ✅ Free tier
- ✅ Fast deployments

**Limitation:** File persistence is tricky (need external database)

---

## 🎯 Quick Comparison

| Platform | Ease | Cost | Best For |
|----------|------|------|----------|
| **Render** | ⭐⭐⭐⭐⭐ | FREE | Best overall |
| **Railway** | ⭐⭐⭐⭐⭐ | $5 credit | Quick deploys |
| **Heroku** | ⭐⭐⭐⭐ | $5/mo | Traditional apps |
| **Vercel** | ⭐⭐⭐ | FREE | Advanced users |

---

## 📝 Pre-Deployment Checklist

Before deploying:

1. ✅ Test locally first
   ```bash
   npm install
   node server.js
   ```

2. ✅ Create GitHub repository
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

3. ✅ Choose hosting platform (Render recommended)

4. ✅ Follow platform-specific steps

5. ✅ Test deployed app

6. ✅ Import your Excel data via admin panel

---

## 🔧 Configuration Files Included

I've created deployment files for you:

- ✅ `render.yaml` - For Render
- ✅ `Procfile` - For Heroku
- ✅ Updated `server.js` - Uses environment PORT variable

---

## 🚀 Recommended: Deploy to Render in 5 Minutes

**The fastest way:**

1. Create GitHub account (if you don't have one)

2. Create new repository on GitHub

3. Push your code:
   ```bash
   cd workshop-registration
   git init
   git add .
   git commit -m "Workshop registration system"
   git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
   git push -u origin main
   ```

4. Go to https://render.com → Sign up

5. Click "New +" → "Web Service"

6. Connect GitHub and select your repository

7. Render auto-detects settings → Click "Create Web Service"

8. **Done!** Your app is live in 2-3 minutes

---

## 🌍 After Deployment

### Import Your Data
1. Go to `https://your-app-url.onrender.com/admin.html`
2. Upload your Excel file with attendees and workshops
3. Share registration link: `https://your-app-url.onrender.com/index.html`

### Monitor
- Check admin panel for registrations
- All data persists on the server

---

## ⚠️ Important Notes

### For Production Use:

1. **Add Authentication** to admin panel
   - Currently anyone can access admin.html
   - Add password protection

2. **Use Real Database** (for large scale)
   - Current JSON file works for small/medium events
   - For 500+ attendees, use PostgreSQL or MongoDB
   - Render offers free PostgreSQL addon

3. **Add HTTPS**
   - All platforms provide this automatically ✅

4. **Backup Data**
   - Download database.json periodically
   - Keep Excel files backed up

---

## 🆘 Troubleshooting Deployment

### Issue: "Application Error"
**Solution:** Check logs in your hosting platform

### Issue: "Module not found"
**Solution:** Ensure package.json is committed
```bash
git add package.json
git commit -m "Add package.json"
git push
```

### Issue: Port binding error
**Solution:** Already fixed - server.js uses `process.env.PORT`

### Issue: Can't access admin panel
**Solution:** Make sure to include `/admin.html` in URL

---

## 💡 Best Practice Deployment Workflow

```bash
# 1. Test locally
npm install
node server.js
# Test at http://localhost:3000

# 2. Commit to Git
git add .
git commit -m "Ready for deployment"

# 3. Push to GitHub
git push origin main

# 4. Platform auto-deploys
# (if connected to GitHub)

# 5. Test live site
# Import data, test registration

# 6. Share with users!
```

---

## 🎉 You're Ready!

Choose **Render** for the easiest deployment, or pick another platform based on your needs.

All configuration files are ready - just follow the steps above!

**Need Help?** All platforms have excellent documentation and support.

---

## Quick Links

- Render: https://render.com
- Railway: https://railway.app  
- Heroku: https://heroku.com
- Vercel: https://vercel.com

**Pro Tip:** Start with Render's free tier, then upgrade if needed!
