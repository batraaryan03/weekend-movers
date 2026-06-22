# Weekend Movers — Hostinger Deployment Guide

## Option 1: Hostinger VPS (Recommended)

### Prerequisites
- Hostinger VPS plan (KVM2 or higher recommended)
- Node.js 18+ installed on the VPS
- Domain configured (weekendmovers.com.au)

### Steps

1. **Connect to your VPS**
   ```bash
   ssh root@your-vps-ip
   ```

2. **Install Node.js and PM2**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   npm install -g pm2
   ```

3. **Upload your project**
   ```bash
   # From your local machine
   scp -r /Users/aryanbatra/IdeaProjects/gurman/weekend-movers root@your-vps-ip:/var/www/weekend-movers
   ```

4. **Install dependencies and build on VPS**
   ```bash
   cd /var/www/weekend-movers
   npm install
   npm run build
   ```

5. **Start with PM2**
   ```bash
   pm2 start npm --name "weekend-movers" -- start
   pm2 save
   pm2 startup
   ```

6. **Configure Nginx reverse proxy**
   ```bash
   sudo nano /etc/nginx/sites-available/weekend-movers
   ```
   Add:
   ```nginx
   server {
       listen 80;
       server_name weekendmovers.com.au www.weekendmovers.com.au;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```
   ```bash
   sudo ln -s /etc/nginx/sites-available/weekend-movers /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl reload nginx
   ```

7. **Install SSL with Certbot**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d weekendmovers.com.au -d www.weekendmovers.com.au
   ```

---

## Option 2: Hostinger Shared Hosting (Node.js)

### Steps

1. Log in to hPanel → **Advanced** → **Node.js**
2. Create a new application:
   - **Node.js version**: 18
   - **Application root**: `public_html`
   - **Application startup file**: `server.js`
3. Create a `server.js` file:
   ```js
   const { createServer } = require("http");
   const { parse } = require("url");
   const next = require("next");

   const dev = process.env.NODE_ENV !== "production";
   const app = next({ dev });
   const handle = app.getRequestHandler();

   app.prepare().then(() => {
     createServer((req, res) => {
       handle(req, res, parse(req.url, true));
     }).listen(3000, () => {
       console.log("> Ready on http://localhost:3000");
     });
   });
   ```
4. Upload project files via File Manager or Git
5. Run `npm install` and `npm run build` in the Terminal
6. Start the application in hPanel Node.js settings

---

## Environment Variables

If you add any environment variables in the future, create a `.env.local` file:
```
NEXT_PUBLIC_SITE_URL=https://weekendmovers.com.au
```

---

## Notes

- The site uses `export const dynamic = "force-dynamic"` for the API route
- Gallery images are in `public/gallery/` (30 images)
- Logo and hero images are in `public/assets/`
- The form API endpoint is at `/api/contact`
