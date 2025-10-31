# Clarity — Minimalist Note App

Clarity is a clean, distraction-free note-taking web app built with **Express**, **Tailwind CSS v4**, and **DaisyUI**.  
It helps you capture, edit, and manage your thoughts instantly — whether you’re coding, journaling, or planning your next adventure.

---

## Features

- 🧠 **Real-time auto-save** as you type  
- 🗒️ **Instant note creation and deletion** (hover bin icon to delete)  
- 🎨 **Multiple themes** powered by DaisyUI (saved to localStorage)  
- 📑 **Dynamic note list** auto-refreshes after every update  
- 🧭 **Lightweight JSON storage** — no database required  
- 🔍 **Planned:** Search, filter, and timestamp tracking

---



## 🧩 Tech Stack

| **Layer** | **Technology** |
|------------|----------------|
| **Frontend** | ![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black) ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white) ![DaisyUI](https://img.shields.io/badge/DaisyUI-5A0EF8?style=for-the-badge&logo=daisyui&logoColor=white) |
| **Backend** | ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white) ![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white) |
| **Storage** | ![JSON](https://img.shields.io/badge/JSON-000000?style=for-the-badge&logo=json&logoColor=white) |
| **Runtime Tools** | ![Nodemon](https://img.shields.io/badge/Nodemon-76D04B?style=for-the-badge&logo=nodemon&logoColor=white) ![Tailwind CLI](https://img.shields.io/badge/Tailwind_CLI-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white) |

---

## Installation & Setup

Clone the repository and install dependencies:

```bash
git clone https://github.com/Jamal-Raja/clarity.git
cd clarity
npm install
```
Build Tailwind CSS and start the app:
```bash
npm run css:build
npm run devStart
```
Then visit:
```bash
http://localhost:3000
```
---
## Usage

- Click ✚ Compose to create a new note.
- Begin typing — Clarity automatically saves your changes.
- Click any note in the sidebar to load it instantly.
- Delete a note by clicking its bin icon.
- Change themes from the Theme dropdown — your choice is remembered next session.
---
## Project Structure
```php
Clarity/
├── public/ # Frontend files served by Express
│ ├── index.html # Main HTML file 
│ ├── input.css 
│ ├── output.css 
│ └── script.js # Frontend logic (CRUD operations + auto-save)
├── .gitignore 
├── allData.json # Local JSON database storing all notes
├── package-lock.json 
├── package.json 
├── server.js # Express backend (API routes for notes)
└── README.md # (<--You are here)
```
## API Endpoints
| **Method** | **Endpoint**   | **Description**         |
|-------------|----------------|--------------------------|
| GET         | `/notes`       | Fetch all notes          |
| POST        | `/notes`       | Create a new note        |
| PUT         | `/notes/:id`   | Update an existing note  |
| DELETE      | `/notes/:id`   | Delete a note            |

💙 Made with passion by **Jamal Raja**: https://github.com/Jamal-Raja

“See your thoughts take shape.”
