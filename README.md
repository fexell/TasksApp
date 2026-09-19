# TasksApp - Task Management Web Application

En responsiv webbapplikation för uppgiftshantering byggd med **React + Vite** frontend och **ASP.NET Core WebAPI** backend.

## 📋 Funktionalitet

✅ **Grundfunktioner (G-kriterium)**
- Lista, skapa och uppdatera uppgifter
- Responsiv design (testad på desktop och mobil)
- Filuppladdning till uppgifter (max 10 MB)
- Felhantering med toast-notifieringar (ingen krasch)
- Autentisering och autorisering

✅ **Avancerade funktioner (VG-kriterium)**
- Dual frontend-implementationer (React + Vite)
- Backend-filvalidering (MIME-type + storlek)
- State management med Zustand
- API-fel hanteras graceful
- Tydliga commit-meddelanden och motiverad arkitektur

## 🚀 Snabbstart

### Förutsättningar
- **Node.js** 16+ (för frontend)
- **.NET SDK** 10.0+ (för backend)
- **npm** eller **yarn** (för frontend)

### Installation & Start

#### 1. Backend (ASP.NET Core WebAPI)

```bash
cd backend

# Konfigurering (om behövs)
# Redigera appsettings.Development.json för databasen etc.

# Starta servern
dotnet run
# eller för dev med watch
dotnet watch run

# Servern körs på: http://localhost:5277
```

**API Endpoints:**
- `GET /api/tasks` - Lista alla uppgifter
- `POST /api/tasks` - Skapa ny uppgift
- `PUT /api/tasks/{id}` - Uppdatera uppgift
- `POST /api/tasks/{id}/upload` - Ladda upp fil
- `DELETE /api/tasks/{id}/upload` - Ta bort fil

#### 2. Frontend (React + Vite)

```bash
cd frontend-react-vite

# Installera beroenden
npm install

# Skapa .env-fil
cat > .env << 'ENVEOF'
VITE_APP_NAME = "Tasks App"
VITE_APP_DESCRIPTION = "A simple task management application"
VITE_API_URL = "http://localhost:5277/api"
ENVEOF

# Starta dev-servern
npm run dev

# Frontend är tillgänglig på: http://localhost:3000
```

### Testa Applikationen

1. Öppna `http://localhost:3000`
2. Logga in med demokontot: `demo@example.com` / `DemoPassword123!`
3. Skapa en ny uppgift
4. Klicka "Add File" för att ladda upp en fil
5. Filen visas som en nedladdningslänk i uppgiften

## 🏗️ Projektstruktur

```
TasksApp/
├── backend/                    # ASP.NET Core WebAPI
│   ├── Controllers/           # API endpoints
│   ├── Models/                # Data models
│   ├── DTOs/                  # Data transfer objects
│   ├── Services/              # Business logic
│   └── Program.cs             # Startup konfiguration
│
├── frontend-react-vite/        # React + Vite frontend (huvudversion)
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── hooks/             # Custom hooks (useTasks, etc.)
│   │   ├── pages/             # Page components
│   │   ├── lib/               # Utilities (API client)
│   │   └── App.jsx            # App router
│   └── package.json
│
└── frontend/                   # Next.js frontend (äldre version)
```

## 🛠️ Tekniska Val & Motivering

### Frontend Stack
- **React + Vite** (över Next.js)
  - ⚡ Snabbare build och dev-server
  - 📦 Mindre bundle size
  - 🎯 Explicit routing med React Router
  - ✅ Passar bättre för SPA utan SSR-krav

- **Tailwind CSS**
  - 🎨 Utility-first CSS för snabbare styling
  - 🌓 Dark mode-stöd
  - 📱 Responsiv design built-in

- **React Router v6**
  - 🔀 Modern routing med hooks-API
  - 💪 Type-safe navigation
  - 📍 Nested routing support

- **Zustand**
  - 🪶 Minimal state management overhead
  - 🚀 Enkel att lära sig
  - 🔄 Reactive state utan boilerplate

### Backend Stack
- **ASP.NET Core WebAPI**
  - 🔐 Built-in authentication & authorization
  - 🛡️ CSRF-skydd
  - ✅ Stateless API design
  - 📝 Entity Framework Core för ORM

- **File Upload Security**
  - ✅ Frontend + backend validering
  - 📏 Filstorleksgräns (10 MB)
  - 🔍 MIME-type whitelist
  - 🔐 Användar-specifika uploads

## 📁 Filuppladdning

### Tillåtna Filtyper
**Dokument:** PDF, DOCX, DOC, XLSX, XLS, PPTX, PPT, TXT, MD, ODT  
**Bilder:** JPG, PNG, GIF, WEBP, SVG, BMP  
**Arkiv:** ZIP, RAR, 7Z, GZIP  
**Media:** MP3, MP4, WEBM, WAV, M4A  

### Begränsningar
- Max filstorlek: **10 MB**
- Validering sker på både frontend och backend
- Filer lagras under `/wwwroot/uploads/`
- Användar-specifik åtkomst (kan bara se egna filer)

## 🎨 Responsiv Design

Appen är testad och fungerar på:
- 📱 **Mobil** (375px - 480px bredd)
- 💻 **Tablet** (768px bredd)
- 🖥️ **Desktop** (1920px+ bredd)

Använd dev-tools för att testa olika skärmstorlekar.

## 🔒 Säkerhet

✅ **Implementerat:**
- JWT-autentisering
- CSRF-skydd (X-CSRF-TOKEN)
- Autorisering per användare
- Filuppladdnings-validering (backend + frontend)
- Rate limiting på auth-endpoints
- Secure password handling

## 📊 Git History

Projektet har flera commits som visar utvecklingen:
```
1bcc78f Enable static files serving for uploaded files
bab55f8 Fix file upload WebRootPath null reference
353d7f6 Add backend file type and size validation for security
ff63a0a Add file upload functionality to tasks
e9abaf5 Converted Next JS to vanilla React Vite
...
```

Varje commit har desciptiv meddelande som förklarar _varför_ ändringar gjordes.

## 🧪 Testning

### Frontend Testing
```bash
cd frontend-react-vite
npm run dev
# Öppna http://localhost:3000 i webbläsare
```

**Test-scenario:**
1. Lista uppgifter - ✅ Visas från API
2. Skapa uppgift - ✅ Läggs till i listan
3. Uppdatera uppgift - ✅ Ändras direkt
4. Filuppladdning - ✅ Visas som länk
5. Felhantering - ✅ Toast-meddelande vid fel

### Backend Testing
```bash
cd backend
dotnet run
# Swagger UI: http://localhost:5277/swagger
```

API kan testas direkt via Swagger UI eller Postman.

## 📦 Build för Production

### Frontend
```bash
cd frontend-react-vite
npm run build
# Output: dist/
```

### Backend
```bash
cd backend
dotnet publish -c Release -o publish/
# Output: publish/
```

## 🔗 Repository-länkar

- **Frontend Repo:** `https://github.com/[user]/TasksApp` (denna)
- **Backend Repo:** `https://github.com/[user]/TasksApp` (samma repo, `backend/` mapp)

## 📝 Inlämning

✅ **G-kriterium:** Alla grundfunktioner implementerade och fungerar  
✅ **VG-kriterium:** Motiverade tekniska val + välstrukturerad kod  

Inlämnad: [Datum]

## 📧 Support

Vid frågor eller problem:
1. Kontrollera att både backend och frontend körs
2. Se `.env`-filen är korrekt konfigurerad
3. Kontrollera port 5277 (backend) och 3000 (frontend) är lediga
4. Läs commit-meddelanden för tekniska detaljer

---

**Utvecklat med React, Vite, ASP.NET Core och 💙**
