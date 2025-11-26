# 🦅 Inflation Hawk

**Inflation Hawk** este o aplicație Full-Stack modernă, de tip PWA (Progressive Web App), concepută pentru monitorizarea colaborativă a prețurilor alimentelor (Crowdsourcing). Utilizatorii pot scana bonuri fiscale folosind AI (OCR) sau pot introduce manual prețuri pentru a urmări evoluția inflației în timp real.

![Status](https://img.shields.io/badge/Status-Live-success)
![Platform](https://img.shields.io/badge/Platform-Web%20%7C%20PWA-blue)

🔗 **Live Demo:** [https://inflation-hawk.web.app](https://inflation-hawk.web.app)

---

## 🚀 Funcționalități Cheie

* **📊 Monitorizare în Timp Real:** Grafice interactive care arată istoricul prețurilor pentru produse specifice.
* **📸 AI Receipt Scanning:** Integrare cu **Tesseract.js** pentru extragerea automată a prețurilor și numelor de produse din fotografiile bonurilor fiscale (OCR în browser).
* **📷 Barcode Scanner:** Identificare instantanee a produselor folosind camera telefonului și API-ul **OpenFoodFacts**. Completează automat numele produsului în formular.
* **📱 PWA (Installable):** Aplicația poate fi instalată pe telefon (iOS/Android), funcționează Full Screen și offline-first.
* **🔐 Securitate:** Autentificare OAuth2 prin Google (Firebase Auth) și validare JWT pe backend.
* **☁️ Cloud Native:** Arhitectură complet distribuită (Frontend pe CDN, Backend în Container, Bază de date Serverless).

---

## 🛠️ Tech Stack

### Frontend
* **Framework:** Angular 18 (Standalone Components)
* **UI Library:** Angular Material
* **Charts:** ngx-charts
* **OCR:** Tesseract.js
* **Hosting:** Firebase Hosting
* **Barcode:** @zxing/ngx-scanner
* **Data Source:** OpenFoodFacts API

### Backend
* **Framework:** Quarkus (Java 21)
* **Architecture:** REST API, Microservices-ready
* **ORM:** Hibernate ORM cu Panache
* **Containerization:** Docker (Multi-stage build)
* **Hosting:** Render.com

### Database
* **Engine:** PostgreSQL 16
* **Provider:** Neon.tech (Serverless Postgres)

---

## 🏗️ Arhitectură & Deployment

Proiectul este împărțit într-un monorepo cu două module principale:

1.  `inflation-hawk-ui`: Aplicația Angular.
2.  `backend-api`: Serviciul Quarkus.

### Fluxul de Date
1.  Utilizatorul încarcă o poză -> **Angular** o procesează local (OCR).
2.  Datele sunt trimise securizat (cu Bearer Token) -> **Quarkus**.
3.  Quarkus validează token-ul cu Google și scrie datele în **PostgreSQL**.
4.  La citire, datele sunt agregate și trimise înapoi pentru vizualizare.

---

## 💻 Instalare Locală

Dacă dorești să rulezi proiectul pe mașina ta:

### Pre-rechizite
* Node.js & Angular CLI
* Java 21 & Maven
* Docker Desktop

### 1. Backend (Quarkus)
```bash
cd backend-api
# Pornește baza de date Postgres locală (via Docker)
docker-compose up -d
# Pornește serverul în modul Dev (Hot Reload)
./mvnw quarkus:dev
```

### 2. Frontend (Angular)
```bash
cd inflation-hawk-ui
npm install
ng serve
```

Accesează aplicația la http://localhost:4200.

## 📸 Screenshots
(Aici poți adăuga screenshot-uri cu Dashboard-ul și Graficele)

## 👤 Autor
Dezvoltat de [Numele Tău] ca proiect personal de portofoliu.
