# 📚 EduNest — AI-Powered Learning Platform

<div align="center">

![EduNest Banner](./EDUNEST%20Logo%20with%20Stylized%20Book%20U.png)

A modern education platform that leverages **Google Gemini AI** to help students submit assignments, get instant AI feedback, and communicate with teachers — all in one place.

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org)
[![Firebase](https://img.shields.io/badge/Firebase-12-FFCA28?style=flat&logo=firebase)](https://firebase.google.com)
[![Gemini AI](https://img.shields.io/badge/Gemini-AI-4285F4?style=flat&logo=google)](https://ai.google.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat&logo=tailwindcss)](https://tailwindcss.com)

</div>

---

## ✨ Features

- 🤖 **AI Chat Assistant** — Ask questions and get instant answers powered by Gemini AI
- 📝 **Assignment Submission** — Students can submit homework files directly through the app
- 📧 **Email Notifications** — Automatic email alerts sent to teachers when assignments are submitted (with file attachment)
- 📄 **File Reading Support** — Supports PDF and DOCX file parsing for AI review
- 🔐 **Authentication** — Firebase Auth for secure login/register
- 🗄️ **Real-time Database** — Firestore for class, assignment, and user management
- 📱 **Mobile Ready** — Built with Capacitor for Android deployment
- 🎨 **Modern UI** — Smooth animations with Motion (Framer Motion)

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| **Front-end** | React 19, TypeScript, React Router v7 |
| **Styling** | Tailwind CSS v4, Lucide Icons |
| **AI** | Google Gemini API (`@google/genai`) |
| **Database** | Firebase Firestore |
| **Storage** | Firebase Storage |
| **Auth** | Firebase Authentication |
| **Back-end** | Express.js + Node.js (server.ts) |
| **Email** | Nodemailer (Gmail SMTP) + EmailJS |
| **File Parsing** | PDF.js, Mammoth (.docx reader) |
| **Mobile** | Capacitor (Android) |
| **Animation** | Motion (Framer Motion) |
| **Build Tool** | Vite 6 |

---

## 📸 Demo

> _Add screenshots of your app here_

| Login Screen | Dashboard | AI Chat |
|---|---|---|
| ![login](./screenshots/login.png) | ![dashboard](./screenshots/dashboard.png) | ![ai-chat](./screenshots/ai-chat.png) |

🔗 **Live Demo:** [View App](#) _(replace with your deployment link)_

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 18
- A **Google Gemini API Key** — get one at [ai.google.dev](https://ai.google.dev)
- A **Firebase project** — create one at [console.firebase.google.com](https://console.firebase.google.com)
- A **Gmail account** with App Password enabled (for email notifications)

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/ManhTien-360cm/edunest-v1.git
cd edunest-v1
```

**2. Install dependencies**
```bash
npm install
```

**3. Set up environment variables**

Copy the example file and fill in your credentials:
```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
# Google Gemini AI
GEMINI_API_KEY=your_gemini_api_key_here

# Firebase Config
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Email (Gmail SMTP)
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password
```

> ⚠️ **Never commit `.env` or `.env.local` to GitHub!**

**4. Run the development server**
```bash
npm run dev
```

The app runs at `http://localhost:3001`

---

## 📁 Project Structure

```
edunest-v1/
├── src/
│   ├── components/       # Reusable UI components
│   ├── pages/            # Route-based page components
│   ├── services/         # Firebase & API service layers
│   ├── hooks/            # Custom React hooks
│   └── types/            # TypeScript type definitions
├── server.ts             # Express server (email API + Vite middleware)
├── firebase.json         # Firebase Hosting & Firestore config
├── firestore.rules       # Firestore security rules
├── storage.rules         # Firebase Storage security rules
├── capacitor.config.ts   # Mobile (Android) config
├── vite.config.ts        # Vite bundler config
└── .env.example          # Environment variable template
```

---

## 📧 How the Email System Works

When a student submits an assignment:

```
[Student] uploads file + fills form
      ↓
[Front-end] sends POST /api/submit-assignment
      ↓
[Express server] reads file buffer via Multer
      ↓
[Nodemailer] sends email to teacher with attached file
      ↓
[Teacher] receives email with subject: [BÀI NỘP] Class - Assignment - Student
```

---

## 📱 Android Build (Optional)

```bash
# Build the web app first
npm run build

# Sync to Android
npx cap sync android

# Open in Android Studio
npx cap open android
```

---

## 🔒 Security Notes

- All Firebase security rules are defined in `firestore.rules` and `storage.rules`
- Never expose your `.env` or `.env.local` files publicly
- Use Gmail **App Passwords** (not your regular password) for `EMAIL_PASS`
- File upload is limited to **20MB** per submission

---

## 📚 What I Learned

- Building a full-stack AI-integrated web application from scratch
- Using Google Gemini API for real-time AI chat and document analysis
- Implementing file upload and email delivery with Multer + Nodemailer
- Managing real-time data with Firebase Firestore and Authentication
- Setting up Capacitor for cross-platform Android deployment
- Writing scalable TypeScript with React 19 and Vite

---

## 🚧 Future Improvements

- [ ] AI-powered automatic grading with scoring rubric
- [ ] Real-time notifications (Firebase Cloud Messaging)
- [ ] Teacher dashboard with assignment analytics
- [ ] iOS support via Capacitor
- [ ] Plagiarism detection using AI
- [ ] Dark mode support

---

## 👤 Author

**Manh Tien**
🐙 GitHub: [@ManhTien-360cm](https://github.com/ManhTien-360cm)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
