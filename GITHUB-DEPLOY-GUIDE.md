# 📘 Complete GitHub & Deployment Guide

## 🎯 Understanding the Process

**Important:** GitHub stores your code, but doesn't run Node.js apps.

The complete flow:
1. ✅ Upload code to GitHub (free storage)
2. ✅ Deploy from GitHub to Render/Railway (runs your app)

---

## 📦 Step 1: Upload to GitHub

### A. Create GitHub Account (if you don't have one)
1. Go to https://github.com
2. Click "Sign up"
3. Follow the registration process

### B. Install Git on Your Computer

**Windows:**
- Download from: https://git-scm.com/download/win
- Run installer (keep default settings)
- Restart your computer

**Mac:**
```bash
# Open Terminal and run:
xcode-select --install
```

**Linux:**
```bash
sudo apt-get install git
```

### C. Configure Git (First Time Only)
Open Terminal/Command Prompt:
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

---

## 🚀 Step 2: Upload Your Project to GitHub

### Method 1: Using GitHub Website (Easiest for Beginners)

**Option A: Drag & Drop (Simplest)**

1. **Download and extract** the workshop-registration-system.zip

2. **Go to GitHub** and log in

3. **Create New Repository**
   - Click the "+" icon (top right) → "New repository"
   - Repository name: `workshop-registration`
   - Description: "Workshop registration system"
   - Choose "Public" or "Private"
   - **DO NOT** check "Initialize with README"
   - Click "Create repository"

4. **Upload Files**
   - On your new repository page, click "uploading an existing file"
   - Drag ALL files from the extracted folder into the browser
   - **Important:** Make sure you upload ALL files including:
     - server.js
     - package.json
     - render.yaml
     - Procfile
     - .gitignore
     - public/ folder
     - All .md files
   - Add commit message: "Initial commit"
   - Click "Commit changes"

**Option B: GitHub Desktop (Easy GUI)**

1. **Download GitHub Desktop**
   - Go to https://desktop.github.com
   - Download and install

2. **Sign in to GitHub Desktop**
   - Open GitHub Desktop
   - Sign in with your GitHub account

3. **Create Repository**
   - Click "Create a New Repository"
   - Name: `workshop-registration`
   - Local path: Choose where you extracted the files
   - Click "Create Repository"

4. **Publish to GitHub**
   - Click "Publish repository"
   - Choose Public or Private
   - Click "Publish repository"

---

### Method 2: Using Command Line (For Developers)

**Step-by-step:**

1. **Extract the zip file**
   ```bash
   unzip workshop-registration-system.zip
   cd workshop-registration
   ```

2. **Create Repository on GitHub**
   - Go to https://github.com
   - Click "+" → "New repository"
   - Name: `workshop-registration`
   - Click "Create repository"
   - **Copy the repository URL** (looks like: https://github.com/yourusername/workshop-registration.git)

3. **Initialize Git and Push**
   ```bash
   # Initialize git
   git init
   
   # Add all files
   git add .
   
   # Commit
   git commit -m "Initial commit - Workshop registration system"
   
   # Add remote (replace with YOUR repository URL)
   git remote add origin https://github.com/YOUR-USERNAME/workshop-registration.git
   
   # Push to GitHub
   git branch -M main
   git push -u origin main
   ```

4. **Enter GitHub Credentials**
   - Username: Your GitHub username
   - Password: Use a Personal Access Token (not your password)
   
   **To create a token:**
   - Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
   - Click "Generate new token"
   - Select "repo" scope
   - Copy the token and use it as password

---

## ✅ Step 3: Verify Upload

Go to your GitHub repository page:
`https://github.com/YOUR-USERNAME/workshop-registration`

You should see all these files:
- ✅ server.js
- ✅ package.json
- ✅ render.yaml
- ✅ Procfile
- ✅ .gitignore
- ✅ public/ (folder)
- ✅ All .md files
- ✅ sample-workshop-data.xlsx

---

## 🌐 Step 4: Deploy to Make it Live

Now your code is on GitHub. Let's make it run online!

### 🥇 Deploy to Render (Recommended - FREE)

**Video guide:** https://render.com/docs/deploy-node-express-app

**Steps:**

1. **Go to Render**
   - Visit https://render.com
   - Click "Get Started for Free"
   - Sign up with GitHub (easiest)

2. **Create Web Service**
   - Click "New +" → "Web Service"
   - Click "Connect GitHub"
   - Find your `workshop-registration` repository
   - Click "Connect"

3. **Configure (Auto-detected)**
   Render will auto-fill:
   - Name: workshop-registration
   - Environment: Node
   - Build Command: `npm install`
   - Start Command: `node server.js`
   - Plan: Free
   
   Just click "Create Web Service"

4. **Wait for Deployment**
   - Takes 2-3 minutes
   - You'll see build logs
   - When done, you'll get a URL like: `https://workshop-registration-abc123.onrender.com`

5. **Access Your App**
   - Admin: `https://your-url.onrender.com/admin.html`
   - Form: `https://your-url.onrender.com/index.html`

6. **Import Your Data**
   - Open admin panel
   - Upload your Excel file
   - Start using!

---

### 🥈 Deploy to Railway (Alternative)

1. **Go to Railway**
   - Visit https://railway.app
   - Click "Start a New Project"
   - Login with GitHub

2. **Deploy from GitHub**
   - Click "Deploy from GitHub repo"
   - Select `workshop-registration`
   - Click "Deploy Now"
   - Railway auto-detects Node.js

3. **Generate Domain**
   - Go to Settings → Generate Domain
   - You'll get a URL
   - Done!

---

## 🔄 Updating Your App Later

If you make changes:

### Using GitHub Website:
1. Go to your repository
2. Click on the file you want to edit
3. Click the pencil icon (Edit)
4. Make changes
5. Click "Commit changes"
6. Render/Railway auto-deploys!

### Using Command Line:
```bash
# Make your changes, then:
git add .
git commit -m "Description of changes"
git push
# Auto-deploys to Render/Railway!
```

---

## 📋 Complete Checklist

**Part 1: GitHub Upload**
- [ ] Created GitHub account
- [ ] Created new repository
- [ ] Uploaded all project files
- [ ] Verified files are on GitHub

**Part 2: Deploy**
- [ ] Signed up on Render (or Railway)
- [ ] Connected GitHub account
- [ ] Created web service
- [ ] Deployment successful
- [ ] Got live URL

**Part 3: Setup**
- [ ] Opened admin panel
- [ ] Imported Excel data
- [ ] Tested registration form
- [ ] Shared link with users

---

## 🆘 Common Issues & Solutions

### Issue: "git: command not found"
**Solution:** Install Git first (see Step 1B above)

### Issue: "Permission denied (publickey)"
**Solution:** Use HTTPS URL instead of SSH, or set up SSH keys

### Issue: "Updates were rejected"
**Solution:**
```bash
git pull origin main --rebase
git push origin main
```

### Issue: Can't find files on GitHub
**Solution:** Make sure you uploaded the entire folder contents, not the folder itself

### Issue: Render deployment failed
**Solution:** 
- Check package.json is uploaded
- Check render.yaml is uploaded
- View logs in Render dashboard

### Issue: "Application Error" on live site
**Solution:**
- Check Render logs
- Ensure environment is set to Node
- Verify all files uploaded correctly

---

## 💡 Pro Tips

1. **Keep GitHub Free:**
   - Public repository = Free
   - Private repository = Free (up to 3 collaborators)

2. **Auto-Deployment:**
   - Once connected, Render/Railway auto-deploys when you push to GitHub
   - No need to redeploy manually!

3. **Environment Variables:**
   - Use Render dashboard to set secrets
   - Don't commit passwords to GitHub

4. **Backup:**
   - GitHub is your backup!
   - All your code is safe in the cloud

---

## 🎯 Quick Reference Commands

```bash
# First time setup
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/USERNAME/REPO.git
git push -u origin main

# Update later
git add .
git commit -m "Updated something"
git push

# See status
git status

# View remote URL
git remote -v
```

---

## 📺 Video Tutorials

**GitHub Basics:**
- https://www.youtube.com/watch?v=RGOj5yH7evk

**Deploy to Render:**
- https://www.youtube.com/watch?v=bnCOyGaSe84

**GitHub Desktop:**
- https://www.youtube.com/watch?v=8Dd7KRpKeaE

---

## ✅ Success! What Next?

After deployment:

1. **Share Your Links**
   - Registration form: Share with attendees
   - Admin panel: Keep private, bookmark it

2. **Import Data**
   - Use admin panel to upload Excel
   - Test with sample data first

3. **Monitor**
   - Check registrations in admin panel
   - Download data backups periodically

4. **Scale**
   - Render free tier: Good for 100s of users
   - Upgrade if needed: ~$7/month for more

---

## 🎉 You're Done!

Your app is now:
- ✅ Stored safely on GitHub
- ✅ Running live on Render/Railway
- ✅ Accessible from anywhere
- ✅ Auto-updates when you push changes

**Need help?** All platforms have excellent documentation and support chat!

---

## Quick Summary

1. **GitHub = Store your code** (like Google Drive for code)
2. **Render/Railway = Run your code** (make it accessible online)
3. **Together = Your app is live!**

**Easiest path:** GitHub Desktop → Upload → Render → Done!
