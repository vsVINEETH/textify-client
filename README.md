# Aadhaar Data Extractor 🆔🔍

A modern, full-stack web application for extracting structured personal information from Aadhaar card images using OCR (Optical Character Recognition).

Built with **Next.js (React)** on the frontend and **Express.js** on the backend using **TypeScript** and **Clean Architecture** principles.

---

## 🚀 Features

- 📤 Upload both **front and back** sides of Aadhaar cards
- 🔍 Extract:
  - Name
  - Date of Birth
  - Gender
  - Aadhaar Number
  - Full Address
- 🧠 Uses `Tesseract.js` for client-side OCR
- 🔐 Image size validation (50KB - 10MB)
- 🖼️ Real-time image preview before submission
- 📦 Modular and scalable architecture
- 🌐 Fully typed with TypeScript
- 🧼 Input sanitization and file type validation
- ✨ Beautiful, responsive UI with Tailwind CSS

---

## 🛠️ Tech Stack

### Frontend
- ⚛️ [React](https://reactjs.org/)
- ⚡ [Next.js](https://nextjs.org/)
- 🎨 [Tailwind CSS](https://tailwindcss.com/)
- 📦 Axios for HTTP communication
- 🔠 TypeScript

### Backend
- 🚀 [Node.js](https://nodejs.org/)
- 🧭 [Express.js](https://expressjs.com/)
- 🧱 Clean Architecture structure
- 📄 Multer for handling file uploads
- 👓 [Tesseract.js](https://github.com/naptha/tesseract.js) for OCR

---

### Setup Instructions

 ## 1. Clone the Repository

    git clone https://github.com/your-username/aadhaar-data-extractor.git
    cd aadhaar-data-extractor

## 2. Install Dependencies

     Client:

        cd client
        npm install

     Server:

        cd ../server
        npm install

### 3. Start the App

    Server:

    npm run dev
    # Runs on http://localhost:4000

    Client:

    cd ../client
    npm run dev
    # Runs on http://localhost:3000

### ✅ Validations & Security

    File type: Only image files (.jpg, .jpeg, .png)

    File size: Between 50 KB and 10 MB

    Input is sanitized and processed only in memory (no disk storage)

    OCR results cleaned for high accuracy

    Addresses and names extracted with fallback logic

