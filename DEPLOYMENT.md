# CodeBattle Arena — Linux Production Deployment Guide

This guide walks you through deploying CodeBattle Arena on a Linux server with full Docker sandboxing for code execution.

---

## Prerequisites

Install the following on your Linux server:

```bash
# Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Docker
sudo apt-get update
sudo apt-get install -y docker.io
sudo systemctl start docker
sudo systemctl enable docker

# Allow your app user to run Docker without sudo
sudo usermod -aG docker $USER
newgrp docker

# Git
sudo apt-get install -y git
```

---

## Step 1: Clone the Repository

```bash
git clone https://github.com/dipankarchettri/CodeBattle-Arena.git
cd CodeBattle-Arena
npm install
```

---

## Step 2: Configure Environment Variables

Create a `.env` file in the project root:

```env
DATABASE_URL="mongodb+srv://dipankarchettri12345_db_user:Re3sGK9yLy9WZZPy@cluster0.t6dgm09.mongodb.net/codebattle?retryWrites=true&w=majority&appName=Cluster0"
SESSION_SECRET="your-long-random-secret-here"
NODE_ENV=production
PORT=5000

# Enable Docker sandboxing (Linux production only)
USE_DOCKER=true
```

> **Generate SESSION_SECRET:**
> ```bash
> openssl rand -base64 32
> ```

---

## Step 3: Build the Docker Sandbox Image

This is the isolated container that all user code will run inside.

```bash
# Build the sandbox image (only needs to be done once, or after updating Dockerfile)
docker build -t codebattle-sandbox ./sandbox

# Verify the image was built
docker images | grep codebattle-sandbox
```

### Verify sandbox isolation works:
```bash
# This should fail — no network access inside sandbox
docker run --rm --network none codebattle-sandbox python3 -c "import urllib.request; urllib.request.urlopen('http://google.com')"

# This should fail — no file system write access
docker run --rm --read-only codebattle-sandbox sh -c "echo test > /etc/evil.txt"

# This should succeed — basic Python execution
docker run --rm --network none codebattle-sandbox python3 -c "print(2 + 2)"
```

---

## Step 4: Test C++ and Java Locally in the Container

Since you don't have g++/javac on Windows, use the sandbox container to verify:

```bash
# Test C++ compilation and execution
docker run --rm --network none codebattle-sandbox sh -c '
cat > /tmp/test.cpp << '"'"'EOF'"'"'
#include <iostream>
int solve(int a, int b) { return a + b; }
int main() {
    int a, b;
    std::cin >> a >> b;
    std::cout << solve(a, b) << std::endl;
}
EOF
g++ -O2 -o /tmp/test /tmp/test.cpp && echo "3 4" | /tmp/test
'
# Expected output: 7

# Test Java compilation and execution
docker run --rm --network none codebattle-sandbox sh -c '
cat > /tmp/Solution.java << '"'"'EOF'"'"'
public class Solution {
    public static int solve(int a, int b) { return a + b; }
    public static void main(String[] args) {
        java.util.Scanner sc = new java.util.Scanner(System.in);
        System.out.println(solve(sc.nextInt(), sc.nextInt()));
    }
}
EOF
javac /tmp/Solution.java -d /tmp && echo "3 4" | java -cp /tmp Solution
'
# Expected output: 7
```

---

## Step 5: Build and Start the Production Server

```bash
# Build the React frontend
npm run build

# Start the production server
npm start
```

Your app will be running at `http://YOUR_SERVER_IP:5000`.

---

## Step 6: (Optional) Set Up a Reverse Proxy with Nginx

```bash
sudo apt-get install -y nginx

sudo tee /etc/nginx/sites-available/codebattle << 'EOF'
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_cache_bypass $http_upgrade;
    }
}
EOF

sudo ln -s /etc/nginx/sites-available/codebattle /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

---

## Step 7: (Optional) Run with PM2 for Auto-Restart

```bash
npm install -g pm2

pm2 start npm --name "codebattle" -- start
pm2 startup    # Follow the printed command to enable auto-start on reboot
pm2 save
```

---

## Troubleshooting

### Docker: "permission denied"
```bash
sudo usermod -aG docker $USER && newgrp docker
```

### Docker sandbox image not found
```bash
docker build -t codebattle-sandbox ./sandbox
```

### Port 5000 in use
Change `PORT=5000` to another port in `.env` and update Nginx config accordingly.

### MongoDB connection fails
- Ensure your Atlas cluster allows connections from your server's IP address.
- Go to MongoDB Atlas → Network Access → Add IP Address → Add your server IP.

---

## Security Checklist Before Going Live

- [ ] `USE_DOCKER=true` is set in production `.env`
- [ ] `.env` is NOT committed to git (verify with `git status`)
- [ ] `atlas-credentials.env` is NOT committed to git
- [ ] MongoDB Atlas IP whitelist includes only your server IP (not `0.0.0.0/0`)
- [ ] Docker sandbox image is built: `docker images | grep codebattle-sandbox`
- [ ] Nginx reverse proxy is configured (exposes port 80, not 5000 directly)
- [ ] PM2 or systemd service is running for auto-restart
