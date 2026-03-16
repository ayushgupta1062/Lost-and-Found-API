# Deploying Lost & Found API to Render

You can easily deploy both the **Spring Boot Backend** and the **React Frontend** to Render for free.

## Part 1: Deploying the Backend (Web Service)
1. Go to [Render Dashboard](https://dashboard.render.com/).
2. Click **New +** and select **Web Service**.
3. Connect your GitHub repository: `ayushgupta1062/Lost-and-Found-API`.
4. Configure the Web Service:
   - **Name:** `lost-and-found-api` (or whatever you prefer)
   - **Environment:** `Java`
   - **Region:** Any
   - **Build Command:** `mvn clean package -DskipTests`
   - **Start Command:** `java -jar target/*.jar`
   - **Instance Type:** Free
5. Click **Create Web Service**.
6. Wait for the deployment to finish (it might take 3-5 minutes). 
7. Once deployed, copy the Render URL (e.g., `https://lost-and-found-api-xxxxx.onrender.com`). You will need this for the frontend!

---

## Part 2: Deploying the Frontend (Static Site)
1. Go back to the Render dashboard and click **New +** > **Static Site**.
2. Connect the same GitHub repository: `ayushgupta1062/Lost-and-Found-API`.
3. Configure the Static Site:
   - **Name:** `lost-and-found-frontend`
   - **Root Directory:** `frontend` *(Important!)*
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `dist`
4. Expand the **Advanced** section and add an Environment Variable:
   - **Key:** `VITE_API_URL`
   - **Value:** `https://your-backend-url.onrender.com/api/items` (Paste the URL from Part 1 here, making sure to add `/api/items` at the end!)
5. Click **Create Static Site**.
6. Once deployed, Render will give you a live URL for your React app. Click it to use your fully deployed Lost & Found portal!
