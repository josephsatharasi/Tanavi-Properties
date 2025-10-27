# Deployment Guide - Tanavi Properties

## ✅ Pre-Deployment Checklist

Your code is now **READY FOR DEPLOYMENT**! All critical issues have been fixed.

### What Was Fixed:
- ✅ CORS configuration (now supports custom domains)
- ✅ Health check endpoint added
- ✅ Error handling middleware added
- ✅ Production environment variables configured

---

## 🚀 Deployment Options

### **Option 1: Render + Vercel (Recommended - Free & Easy)**

#### Step 1: Setup MongoDB Atlas (Database)

1. Go to https://www.mongodb.com/cloud/atlas/register
2. Create free account
3. Click "Build a Database" → Choose "M0 Free"
4. Select cloud provider and region (closest to your users)
5. Create cluster (takes 3-5 minutes)
6. **Security Setup:**
   - Click "Database Access" → "Add New Database User"
   - Username: `tanavi_admin`
   - Password: Generate secure password (save it!)
   - Database User Privileges: "Read and write to any database"
7. **Network Access:**
   - Click "Network Access" → "Add IP Address"
   - Click "Allow Access from Anywhere" → Confirm
8. **Get Connection String:**
   - Click "Database" → "Connect" → "Connect your application"
   - Copy connection string (looks like: `mongodb+srv://tanavi_admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`)
   - Replace `<password>` with your actual password
   - Add database name: `mongodb+srv://tanavi_admin:yourpassword@cluster0.xxxxx.mongodb.net/tanavi_properties?retryWrites=true&w=majority`

#### Step 2: Setup Cloudinary (Image Storage)

1. Go to https://cloudinary.com/users/register_free
2. Create free account
3. Go to Dashboard
4. Copy these values:
   - Cloud Name
   - API Key
   - API Secret

#### Step 3: Deploy Backend to Render

1. **Push code to GitHub:**
   ```bash
   cd "c:\Users\hp\Desktop\Tanavi Properties"
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/tanavi-properties.git
   git push -u origin main
   ```

2. **Deploy on Render:**
   - Go to https://render.com → Sign up with GitHub
   - Click "New +" → "Web Service"
   - Connect your repository
   - Configure:
     - **Name**: `tanavi-backend`
     - **Region**: Choose closest to your users
     - **Branch**: `main`
     - **Root Directory**: `backend`
     - **Runtime**: `Node`
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`
     - **Instance Type**: Free

3. **Add Environment Variables** (click "Advanced" → "Add Environment Variable"):
   ```
   PORT=5000
   MONGODB_URI=mongodb+srv://tanavi_admin:yourpassword@cluster0.xxxxx.mongodb.net/tanavi_properties?retryWrites=true&w=majority
   JWT_SECRET=your_super_secret_jwt_key_min_32_characters_long
   NODE_ENV=production
   ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

4. Click "Create Web Service"
5. Wait 5-10 minutes for deployment
6. Copy your backend URL (e.g., `https://tanavi-backend.onrender.com`)

7. **Create Admin User:**
   - Go to Render Dashboard → Your service → "Shell" tab
   - Run: `node scripts/createAdmin.js`

#### Step 4: Deploy Frontend to Vercel

1. **Deploy on Vercel:**
   - Go to https://vercel.com → Sign up with GitHub
   - Click "Add New" → "Project"
   - Import your repository
   - Configure:
     - **Framework Preset**: Create React App
     - **Root Directory**: `frontend`
     - **Build Command**: `npm run build`
     - **Output Directory**: `build`

2. **Add Environment Variable:**
   - Click "Environment Variables"
   - Add:
     ```
     REACT_APP_API_URL=https://tanavi-backend.onrender.com
     ```

3. Click "Deploy"
4. Wait 3-5 minutes
5. You'll get a URL like: `https://tanavi-properties.vercel.app`

#### Step 5: Connect Your Custom Domain

**For Frontend (Vercel):**
1. In Vercel project → Settings → Domains
2. Add your domain: `yourdomain.com` and `www.yourdomain.com`
3. Vercel will show DNS records to add

**In Your Domain Registrar (GoDaddy/Namecheap/etc):**
1. Go to DNS Management
2. Add these records:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```
3. Save and wait 10-60 minutes for DNS propagation

**Update Backend Environment Variable:**
1. Go to Render → Your service → Environment
2. Update `ALLOWED_ORIGINS`:
   ```
   ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
   ```
3. Save (service will auto-redeploy)

---

### **Option 2: Single VPS (DigitalOcean/AWS/Linode)**

#### Requirements:
- Ubuntu 22.04 server
- Domain name pointed to server IP
- SSH access

#### Quick Setup:

1. **SSH into server:**
   ```bash
   ssh root@your_server_ip
   ```

2. **Install dependencies:**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   apt update
   apt install -y nodejs nginx certbot python3-certbot-nginx
   ```

3. **Install MongoDB:**
   ```bash
   wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
   echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
   apt update
   apt install -y mongodb-org
   systemctl start mongod
   systemctl enable mongod
   ```

4. **Clone and setup:**
   ```bash
   cd /var/www
   git clone https://github.com/yourusername/tanavi-properties.git
   cd tanavi-properties
   
   # Backend
   cd backend
   npm install
   cp .env.example .env
   nano .env  # Edit with your values
   node scripts/createAdmin.js
   
   # Frontend
   cd ../frontend
   npm install
   echo "REACT_APP_API_URL=https://api.yourdomain.com" > .env
   npm run build
   ```

5. **Setup PM2 (Process Manager):**
   ```bash
   npm install -g pm2
   cd /var/www/tanavi-properties/backend
   pm2 start server.js --name tanavi-backend
   pm2 startup
   pm2 save
   ```

6. **Configure Nginx:**
   ```bash
   nano /etc/nginx/sites-available/tanavi
   ```
   
   Paste:
   ```nginx
   # Backend
   server {
       listen 80;
       server_name api.yourdomain.com;
       
       location / {
           proxy_pass http://localhost:5000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   
   # Frontend
   server {
       listen 80;
       server_name yourdomain.com www.yourdomain.com;
       root /var/www/tanavi-properties/frontend/build;
       index index.html;
       
       location / {
           try_files $uri $uri/ /index.html;
       }
   }
   ```
   
   Enable:
   ```bash
   ln -s /etc/nginx/sites-available/tanavi /etc/nginx/sites-enabled/
   nginx -t
   systemctl restart nginx
   ```

7. **Setup SSL:**
   ```bash
   certbot --nginx -d yourdomain.com -d www.yourdomain.com -d api.yourdomain.com
   ```

---

## 🔒 Security Checklist

Before going live:

- [ ] Change default admin password after first login
- [ ] Use strong JWT_SECRET (min 32 characters)
- [ ] Update ALLOWED_ORIGINS with your actual domain
- [ ] Enable MongoDB authentication (if self-hosted)
- [ ] Setup regular backups
- [ ] Monitor error logs

---

## 📊 Post-Deployment

### Test Your Deployment:

1. **Backend Health Check:**
   ```
   https://your-backend-url.com/health
   ```
   Should return: `{"status":"ok","timestamp":"..."}`

2. **Frontend:**
   - Visit: `https://yourdomain.com`
   - Test property listings
   - Test admin login: `https://yourdomain.com/admin/login`

3. **Admin Access:**
   - Email: `admin@tanavi.com`
   - Password: `admin123`
   - **CHANGE THIS IMMEDIATELY AFTER FIRST LOGIN**

### Monitoring:

- **Render**: Check logs in dashboard
- **Vercel**: Check deployment logs and analytics
- **VPS**: Use `pm2 logs` and `pm2 monit`

---

## 🆘 Troubleshooting

### Backend not connecting to frontend:
- Check ALLOWED_ORIGINS includes your frontend domain
- Verify REACT_APP_API_URL is correct
- Check CORS errors in browser console

### Images not loading:
- Verify Cloudinary credentials
- Check image URLs in browser network tab

### MongoDB connection failed:
- Verify connection string
- Check MongoDB Atlas IP whitelist
- Ensure password doesn't contain special characters (URL encode if needed)

### 502 Bad Gateway (VPS):
- Check if backend is running: `pm2 status`
- Check nginx config: `nginx -t`
- Check logs: `pm2 logs tanavi-backend`

---

## 📞 Need Help?

Common issues and solutions:
1. **CORS errors**: Update ALLOWED_ORIGINS in backend .env
2. **Build fails**: Check Node version (should be 16+)
3. **Database errors**: Verify MongoDB connection string
4. **Images not uploading**: Check Cloudinary credentials

Your application is production-ready! Choose your deployment method and follow the steps above.
