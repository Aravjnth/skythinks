# Deployment Guide

This guide will help you deploy your **SkyThinks** application to the public internet.

## Prerequisites

1.  **GitHub Account**: You need a GitHub account to host your code.
2.  **Vercel Account**: For hosting the Frontend (React).
3.  **Render Account**: For hosting the Backend (Node.js/Express).
4.  **MongoDB Atlas Account**: For the database.

---

## Step 1: Push Code to GitHub

1.  Create a **new repository** on GitHub (e.g., `skythinks-app`).
2.  Run the following commands in your terminal (inside the project folder):

```bash
git remote add origin https://github.com/YOUR_USERNAME/skythinks-app.git
git branch -M main
git push -u origin main
```

*(Replace `YOUR_USERNAME` with your actual GitHub username)*

---

## Step 2: Deploy Backend (Render)

1.  Log in to [Render.com](https://render.com).
2.  Click **New +** -> **Web Service**.
3.  Connect your GitHub repository.
4.  Configure the service:
    *   **Name**: `skythinks-api`
    *   **Root Directory**: `server` (Important!)
    *   **Runtime**: `Node`
    *   **Build Command**: `npm install`
    *   **Start Command**: `node index.js`
5.  **Environment Variables** (Scroll down to "Advanced"):
    *   Add `MONGODB_URI`: Your MongoDB connection string (from MongoDB Atlas).
    *   Add `EMAIL_USER`: Your email address.
    *   Add `EMAIL_PASS`: Your email app password.
    *   Add `CLIENT_URL`: The URL of your frontend (you will get this in Step 3, e.g., `https://skythinks.vercel.app`).
6.  Click **Create Web Service**.
7.  **Copy the URL** provided by Render (e.g., `https://skythinks-api.onrender.com`). You will need this for the Frontend.

---

## Step 3: Deploy Frontend (Vercel)

1.  Log in to [Vercel.com](https://vercel.com).
2.  Click **Add New...** -> **Project**.
3.  Import your GitHub repository.
4.  **Environment Variables**:
    *   Add `VITE_API_URL`: Paste the Render Backend URL from Step 2 (e.g., `https://skythinks-api.onrender.com`).
5.  Click **Deploy**.

---

## Step 4: Final Configuration

1.  Once Vercel finishes deploying, copy your new **Frontend URL** (e.g., `https://skythinks.vercel.app`).
2.  Go back to **Render Dashboard** -> **Environment**.
3.  Update the `CLIENT_URL` variable with your actual Vercel URL.
4.  **Save Changes** in Render.

## 🎉 Done!

Your site is now live!
-   **Frontend**: `https://skythinks.vercel.app`
-   **Backend**: `https://skythinks-api.onrender.com`
