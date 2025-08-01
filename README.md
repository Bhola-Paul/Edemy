🎓 Edemy - Learning Management System (LMS)
A full-stack, responsive MERN-based Learning Management System where educators can manage and monetize their courses, and students can enroll, learn, and track progress.

✨ Overview
Edemy is a modern LMS web platform built with the MERN stack. It provides:

Role-based dashboards for educators and students

Stripe-powered payments in test mode

Clerk-powered secure authentication

Fully responsive UI

Course creation, enrollment, and video lecture access

Analytics for educators and course discovery for learners

📊 Architecture Diagram
text
Copy
Edit
              +-------------+          +-------------+
              |   Frontend  |  <-----> |   Backend   |
              |  (React.js) |          | (Express.js)|
              +-------------+          +-------------+
                     |                        |
     +---------------+                        +----------------+
     |                                                        |
+------------+                                    +----------------------+
|   Stripe   |                                    |     MongoDB Atlas     |
+------------+                                    +----------------------+
     |
     +------------>  Webhooks for Payment Status
                     |
         +---------------------------+
         |       Clerk Auth API      |
         +---------------------------+
🚀 Features
🔐 Authentication
Secure login/signup using Clerk

Role-based routing for educators and students

🧑‍🏫 Educator Panel
Add new courses with video lectures and descriptions

View earnings analytics

Track student enrollments

Edit or manage their course content

🎓 Student Panel
Browse available courses

Enroll via Stripe in test mode

View course content (video lectures) after enrollment

Search for relevant learning content

💳 Payments
Stripe test mode integration

Course enrollment triggers webhook for payment confirmation

Secure transaction flow with real-time updates

🛠️ Tech Stack
Layer	Tech Stack
Frontend	React.js, Tailwind CSS
Backend	Node.js + Express.js
Database	MongoDB with Mongoose
Auth	Clerk
Payment	Stripe + Webhooks
Deployment	Vercel (Frontend), Vercel (Backend)

🧾 Pages & UI Flow Diagram
text
Copy
Edit
+-------------------+
|   Home Page       |
+-------------------+
         |
         v
+-------------------+       +-------------------+
| Browse Courses    |<----->| Search & Discover |
+-------------------+       +-------------------+
         |
         v
+-------------------+
| Course Details     |
+-------------------+
         |
         v
+-------------------+
| Stripe Checkout   |
+-------------------+
         |
         v
+-------------------+
| Enrolled Dashboard|
+-------------------+
📚 File Structure
bash
Copy
Edit
Edemy/
├── backend/
│   ├── controllers/        # API logic
│   ├── models/             # MongoDB schemas
│   ├── routes/             # Express route handlers
│   ├── middleware/         # Auth & Stripe webhooks
│   ├── config/             # Clerk/Stripe config
│   ├── server.js           # App entry point
│   └── .env                # Backend environment vars
│
├── frontend/
│   ├── public/             # Static files
│   ├── src/
│   │   ├── assets/         # Images/icons
│   │   ├── components/     # Reusable React components
│   │   ├── pages/          # Application pages
│   │   ├── context/        # Global state management
│   │   └── App.css         # Styling
│   └── .env                # Frontend environment vars
│
├── package.json
└── README.md               # Documentation
⚙️ Setup Instructions
1. Clone the Repository
bash
Copy
Edit
git clone https://github.com/your-username/edemy.git
cd edemy
2. Setup Backend
bash
Copy
Edit
cd backend
npm install
Create .env:

env
Copy
Edit
PORT=5000
MONGO_URI=your_mongodb_connection
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_webhook_secret
Run:

bash
Copy
Edit
npm run dev
3. Setup Frontend
bash
Copy
Edit
cd ../frontend
npm install
Create .env:

env
Copy
Edit
REACT_APP_BACKEND_URL=http://localhost:5000
REACT_APP_STRIPE_PUBLIC_KEY=your_stripe_publishable_key
REACT_APP_CLERK_PUBLISHABLE_KEY=your_clerk_key
Run:

bash
Copy
Edit
npm start
💳 Stripe Test Card
Use this test card for payment:

text
Copy
Edit
Card Number: 4242 4242 4242 4242
Expiry Date: Any future date
CVC: Any 3-digit number
ZIP: Any 5-digit number
🚫 Access Control
Only authenticated users can access dashboards

Educator routes are protected based on Clerk roles

Stripe webhooks verify payment success/failure

Unauthorized access is handled gracefully

💼 License
This project is licensed under the MIT License.

🙌 Acknowledgements
Clerk.dev

Stripe

MongoDB

Vercel

MERN Stack

Made with ❤️ by Bhola Paul
