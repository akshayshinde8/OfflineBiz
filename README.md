This is a new [**React Native**](https://reactnative.dev) project, using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Offline-First CRUD Application — RxDB + SQLite + CouchDB

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

---

## 📦 Overview

This project demonstrates an **Offline-First CRUD** mobile application using **React Native CLI**, **RxDB (with SQLite adapter)**, and **CouchDB** for real-time replication.

The app allows you to:
- ✅ Create a new **Business** and **Article** directly from the app (no backend required).
- ✅ View a list of all **Businesses** and their **Articles**.
- ✅ Work fully offline — data stored locally in SQLite.
- ✅ Auto-sync data with CouchDB when the internet is available.

---

## 🧩 Data Models

### Business Model

{
  "id": "string",
  "name": "string"
}

### Article Model
{
  "id": "string",
  "name": "string",
  "qty": "number",
  "selling_price": "number",
  "business_id": "string"
}


🚀 Getting Started
Step 1: Start Metro

Metro is the JavaScript bundler that ships with React Native.

Start Metro from your project root:

### Using npm
npm start

### OR using Yarn
yarn start

Step 2: Build and Run the App

With Metro running, open a new terminal and use one of the following commands:

## ▶️ Android
### Using npm
npm run android

### OR using Yarn
yarn android

## 🍏 iOS

For iOS (on macOS), make sure CocoaPods dependencies are installed.

cd ios && pod install && cd ..

Then run:

### Using npm
npm run ios

# 🧱 Folder Structure
```json

root
├── src/
│   ├── database/
│   │   ├── index.js
│   ├── context/
│   │   ├── DataProvider.js
│   ├── screens/
│   │   ├── BusinessDetails.js
│   │   ├── BusinessList.js
│   │   ├── AddBusiness.js
│   │   └── AddArticle.js
│   ├── components/
|   |    ├── FAB.js
|   |    ├── Header.js
|   |    └── EmptyState.js
│   └── App.js
├── android/
├── ios/
├── .env
├── package.json
└── README.md
