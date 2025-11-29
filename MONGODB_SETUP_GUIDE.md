# How to Get a Free MongoDB Cloud Database

Follow these steps to get your `MONGODB_URI` for deployment.

## Step 1: Create an Account & Cluster
1.  Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register).
2.  Sign up (you can use Google Sign-in).
3.  You might be asked to fill in a short questionnaire (just select "Learning" or "Build an Application").
4.  **Choose a Plan**: Select **M0 Shared (Free)**.
5.  **Provider & Region**: Keep the defaults (usually AWS) and click **Create Deployment**.

## Step 2: Create a Database User
1.  You will see a "Security Quickstart" screen.
2.  **Username**: Enter `admin` (or any name you like).
3.  **Password**: Enter a strong password (e.g., `MySecurePass123!`).
    *   **IMPORTANT**: Write this password down! You will need it for the connection string.
4.  Click **Create Database User**.

## Step 3: Network Access (Allow Render to Connect)
1.  Scroll down to "Network Access" or "IP Access List".
2.  Click **Add IP Address**.
3.  Select **Allow Access from Anywhere** (or enter `0.0.0.0/0`).
    *   *Note: Since Render's IP addresses change, allowing access from anywhere is the standard way to connect from a serverless host.*
4.  Click **Confirm** or **Add IP Address**.

## Step 4: Get the Connection String
1.  Go back to the **Database** tab (on the left menu) and click **Connect** on your cluster.
2.  Select **Drivers**.
3.  You will see a string that looks like this:
    `mongodb+srv://admin:<db_password>@cluster0.abcd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
4.  **Copy this string**.

## Step 5: Finalize the String
1.  Paste the string into a notepad.
2.  Replace `<db_password>` with the actual password you created in Step 2.
    *   *Example*: `mongodb+srv://admin:MySecurePass123!@cluster0.abcd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
3.  **This is your `MONGODB_URI`.**

---

## Next Step (Back to Render)
1.  Go to your Render Dashboard.
2.  In the **Environment Variables** section for your backend service:
    *   **Key**: `MONGODB_URI`
    *   **Value**: (The string you just created)
