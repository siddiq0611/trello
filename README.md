<div align="center">

<img src="public/favicon.svg" alt="Kanflow Logo" width="64" height="64" />

# Kanflow

**A full-stack project management app — drag, drop, and organize your work visually.**

[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![Firebase](https://img.shields.io/badge/Firebase-Firestore-FFCA28?style=flat-square&logo=firebase&logoColor=black)](https://firebase.google.com)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38BDF8?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev)
[![Vercel](https://img.shields.io/badge/Deployed-Vercel-000000?style=flat-square&logo=vercel&logoColor=white)](https://vercel.com)

[Live Demo](https://trello-seven-pearl.vercel.app/)

</div>

---

## Overview

This is a **Trello-style project management app** built from scratch with React and Firebase. Create boards, organize them into lists, add cards, and drag everything around, all changes sync in real time across every device and tab.

### What it looks like

> **Login Screen** — Clean Google Sign-In  
> **Boards Dashboard** — Color-coded board grid with create/delete  
> **Board View** — Horizontal lists with draggable cards and inline editing

---

## Features

- 🔐 **Google Sign-In** — One-click authentication via Firebase Auth
- 🗂 **Boards** — Create, view, and delete personal boards
- 📋 **Lists** — Create, rename, and delete lists inside any board
- 🃏 **Cards** — Create, rename, and delete cards inside any list
- 🖱 **Drag & Drop** — Reorder cards within lists, move cards across lists, reorder lists, all with smooth animations
- ⚡ **Real-time Sync** — Changes appear instantly across all tabs and devices via Firestore `onSnapshot`
- ✏️ **Inline Editing** — Click any title to edit it in place, no separate edit screen needed
- 💀 **Loading Skeletons** — Skeleton placeholders while data loads (no layout shift)
- 🔒 **Protected Routes** — Unauthenticated users are always redirected to login
- 📱 **Fully Responsive** — Works on desktop, tablet, and mobile
- ☀️ **Light Theme** — Clean, minimal UI with Tailwind CSS

---

## Tech Stack

| Category         | Technology                                                                         |
| ---------------- | ---------------------------------------------------------------------------------- |
| Framework        | [React 18](https://react.dev) + [Vite](https://vitejs.dev)                         |
| Routing          | [React Router v6](https://reactrouter.com)                                         |
| State Management | Context API — `AuthContext`, `BoardContext`                                        |
| Styling          | [Tailwind CSS](https://tailwindcss.com)                                            |
| Drag & Drop      | [DnD Kit](https://dndkit.com) — `@dnd-kit/core`, `@dnd-kit/sortable`               |
| Authentication   | [Firebase Authentication](https://firebase.google.com/docs/auth) (Google provider) |
| Database         | [Cloud Firestore](https://firebase.google.com/docs/firestore)                      |
| Deployment       | [Vercel](https://vercel.com)                                                       |

---

## Project Structure

```
kanflow/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── auth/
│   │   │   └── ProtectedRoute.jsx      # Redirects unauthenticated users to /login
│   │   ├── card/
│   │   │   ├── Card.jsx                # Draggable card — inline edit, delete menu
│   │   │   └── AddCard.jsx             # Inline form to create a new card
│   │   ├── list/
│   │   │   ├── List.jsx                # Draggable list column with sortable cards
│   │   │   └── AddList.jsx             # Inline form to create a new list
│   │   └── ui/
│   │       ├── Navbar.jsx              # Top bar — logo, user avatar, sign out
│   │       ├── Modal.jsx               # Reusable centered modal with backdrop
│   │       ├── InlineEdit.jsx          # Click-to-edit text — Enter saves, Esc cancels
│   │       ├── LoadingSpinner.jsx      # Full-screen and inline spinner
│   │       └── Skeleton.jsx            # Skeleton loaders for boards, lists, cards
│   ├── contexts/
│   │   ├── AuthContext.jsx             # Firebase Auth state — user + loading
│   │   └── BoardContext.jsx            # Real-time lists and cards for a board
│   ├── firebase/
│   │   ├── config.js                   # Firebase app init from environment variables
│   │   ├── auth.js                     # signInWithGoogle · signOutUser
│   │   ├── boards.js                   # Board CRUD + onSnapshot listener
│   │   ├── lists.js                    # List CRUD + onSnapshot + writeBatch
│   │   └── cards.js                    # Card CRUD + onSnapshot + writeBatch
│   ├── hooks/
│   │   └── useDragAndDrop.js           # DnD Kit — dragStart, dragOver, dragEnd
│   ├── pages/
│   │   ├── LoginPage.jsx               # Google sign-in page
│   │   ├── BoardsPage.jsx              # Dashboard — grid of all boards
│   │   └── BoardDetailsPage.jsx        # Board view — lists, cards, drag & drop
│   ├── App.jsx                         # Route definitions + provider tree
│   ├── main.jsx                        # ReactDOM entry point
│   └── index.css                       # Tailwind directives + global styles
├── .env.example                        # Environment variable template
├── .gitignore
├── firestore.indexes.json              # Composite index definitions for CLI deploy
├── firestore.rules                     # Firestore security rules
├── index.html                          # HTML shell — Google Fonts loaded here
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vercel.json                         # SPA rewrite rule for Vercel
└── vite.config.js
```

---

## Getting Started

### Prerequisites

| Tool                          | Version                        |
| ----------------------------- | ------------------------------ |
| [Node.js](https://nodejs.org) | v18 or higher                  |
| npm                           | v9 or higher (comes with Node) |
| [Git](https://git-scm.com)    | Any recent version             |

Verify everything is installed:

```bash
node --version   # v18+
npm --version    # v9+
git --version
```

---

### 1. Clone & Install

```bash
git clone https://github.com/siddiq0611/trello
cd trello
npm install
```

---

### 2. Firebase Setup

You need a Firebase project before this app will run. Follow these steps:

#### 2a. Create a Firebase Project

1. Go to [console.firebase.google.com](https://console.firebase.google.com)
2. Click **Add project**
3. Name it (e.g. `trello`) → click through the wizard → **Create project**

#### 2b. Enable Google Sign-In

1. In your project → **Authentication** → **Get started**
2. Click **Google** → toggle **Enable**
3. Add your email as **Project support email**
4. Click **Save**

#### 2c. Create Firestore Database

1. Go to **Firestore Database** → **Create database**
2. Select **Start in production mode**
3. Choose a region close to you → **Enable**

#### 2d. Add Firestore Security Rules

Go to **Firestore → Rules** tab, replace everything with:

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    match /boards/{boardId} {
      allow read, write: if request.auth != null
        && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null
        && request.auth.uid == request.resource.data.userId;
    }

    match /lists/{listId} {
      allow read, write: if request.auth != null;
    }

    match /cards/{cardId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

Click **Publish**.

#### 2e. Create Firestore Indexes

Go to **Firestore → Indexes → Composite → Add index** and create all three:

| Collection | Field 1         | Field 2            | Scope      |
| ---------- | --------------- | ------------------ | ---------- |
| `boards`   | `userId` ↑ Asc  | `createdAt` ↓ Desc | Collection |
| `lists`    | `boardId` ↑ Asc | `order` ↑ Asc      | Collection |
| `cards`    | `boardId` ↑ Asc | `order` ↑ Asc      | Collection |

> ⏳ Indexes take 1–2 minutes to build. Queries will error until they're ready.

#### 2f. Get Your Firebase Config

1. **Gear icon ⚙️ → Project settings → Your apps**
2. Click the **`</>`** web icon → Register app
3. Copy the config values — you'll need them next

---

### 3. Environment Variables

Create a `.env.local` file in the project root:

```bash
cp .env.example .env.local
```

Open `.env.local` and fill in your Firebase values:

```env
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abc123def456
```

> ℹ️ All keys must start with `VITE_` — this is how Vite makes them available in your React code.

---

### 4. Run Locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) — sign in with Google and start building boards.

**Other commands:**

```bash
npm run build     # Production build → /dist
npm run preview   # Preview the production build locally
```

---

## Deploying to Vercel

### Step 1 — Push to GitHub

```bash
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/your-username/trello.git
git push -u origin main
```

### Step 2 — Import to Vercel

1. Go to [vercel.com](https://vercel.com) → sign in with GitHub
2. Click **Add New → Project** → import your `trello` repo
3. Before clicking Deploy — expand **Environment Variables** and add all six `VITE_FIREBASE_*` keys from your `.env.local`
4. Click **Deploy**

Vercel will give you a live URL like `https://trello-xyz.vercel.app`

### Step 3 — Whitelist Your Domain in Firebase

Google Sign-In will fail on your live domain until you add it:

1. Firebase Console → **Authentication → Settings → Authorized domains**
2. Click **Add domain**
3. Enter your Vercel domain — e.g. `trello-xyz.vercel.app` (no `https://`)
4. Click **Add**

> The `vercel.json` rewrite rule is already included and handles client-side routing automatically.

---

## Data Models

### Board — `/boards/{boardId}`

```js
{
  id: string,           // Auto-generated Firestore document ID
  title: string,        // Board name
  userId: string,       // Firebase Auth UID of the owner
  createdAt: Timestamp  // Firestore server timestamp
}
```

### List — `/lists/{listId}`

```js
{
  id: string,
  title: string,
  boardId: string,      // Parent board
  order: number,        // Horizontal position (0, 1, 2...)
  createdAt: Timestamp
}
```

### Card — `/cards/{cardId}`

```js
{
  id: string,
  title: string,
  listId: string,       // Parent list
  boardId: string,      // Parent board — used for efficient board-wide queries
  order: number,        // Vertical position within the list
  createdAt: Timestamp
}
```

> Cards store both `listId` and `boardId`. The `boardId` enables a single query to fetch all cards for a board. The `listId` determines which column the card belongs to.

---

## Keyboard Shortcuts

| Key      | Action                                              |
| -------- | --------------------------------------------------- |
| `Enter`  | Save inline edit / submit form                      |
| `Escape` | Cancel inline edit / close modal / dismiss add form |

---

## Troubleshooting

<details>
<summary><strong>Blank screen or nothing loads after login</strong></summary>

Your Firebase environment variables are likely wrong or missing. Open `.env.local` and double-check every `VITE_FIREBASE_*` value matches exactly what's in your Firebase project settings. Make sure the file is named `.env.local` — not `.env`.

</details>

<details>
<summary><strong>"Missing or insufficient permissions" error</strong></summary>

Your Firestore security rules haven't been published yet, or they were saved incorrectly. Go to **Firestore → Rules**, paste the rules from the setup section above, and click **Publish**.

</details>

<details>
<summary><strong>"The query requires an index" error in the browser console</strong></summary>

The three composite indexes haven't been created yet, or they're still building. Go to **Firestore → Indexes** and create all three from the table in the setup section. Wait 1–2 minutes for them to finish building (the spinner will disappear).

</details>

<details>
<summary><strong>Google sign-in popup is blocked</strong></summary>

Your browser is blocking popups for localhost. In Chrome: click the popup blocked icon in the address bar → Always allow popups from this site. Then try signing in again.

</details>

<details>
<summary><strong>Sign-in works locally but fails on the live Vercel URL</strong></summary>

Your Vercel domain isn't whitelisted in Firebase. Go to **Authentication → Settings → Authorized domains** → **Add domain** → enter your `.vercel.app` domain (without `https://`).

</details>

<details>
<summary><strong>Environment variables not found on Vercel</strong></summary>

Add all six `VITE_FIREBASE_*` variables in the Vercel dashboard under **Project Settings → Environment Variables**. After adding them, trigger a new deployment — existing deployments don't pick up new env vars automatically.

</details>

---
