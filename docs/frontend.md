# Frontend – Web Architektur (React)

Diese Dokument beschreibt Aufbau, die Technologien und Sicherheitsaspekte des Frontends von AiCUnet, umgesetzt mit React.

---

## Technologien

- **React** – Haupt library für UI-Komponenten
- **Vite** – moderner Build-Tool für schnelle Entwicklung
- **TailwindCSS** – Utility-First CSS Framework für moderne Design
- **Zustand** – leichte State-Manager für erste-Phase vor Skalierung.
- **React Router** – Routing im Browser
- **Axios / Fetch** – API-Kommunikation mit Gateway
- **Jest + React Testing Library** – Unit- und DOM-Testing

---

## Komponentenstruktur

Jede Komponente hat eine definierte Aufgabe. Der Code ist modular, testbar und leicht wartbar.

```plaintext
/src
├── components
│   ├── Login.jsx
│   ├── Dashboard.jsx
│   ├── A1.jsx
│   └── A2.jsx
├── services
│   └── api.js (Kommunikation mit Gateway)
├── state
│   └── store.js (State Management mit Zustand)
├── router
│   └── routes.jsx (Clientseitige Routen)
└── App.jsx
```

---

## Sicherheit im Frontend

- Token werden nur in **Memory** oder **HttpOnly Cookies** gespeichert
- Kein direkte Zugriff auf Microservices oder DBs
- Rollen, werden über die Claims im JWT ermittelt

---

## Kommunikation mit Backend

- Alle Anfragen laufen über **API Gateway**
- Format: JSON, Auth über Token im Header
- Antwort enthält nur relevante Daten für UI
- Fehler werden im Frontend abgefangen und userfreundlich dargestellt (mehrsprachig)

---

## Erweiterung

Optionen für zukünftige Skalierung und Features:

- **Redux Toolkit** für komplexere State oder Caching
- **Storybook** zur UI-Dokumentation
- **i18n** über `react-i18next` für Mehrsprachig
- **Feature Flags** z. B. mit LaunchDarkly
- **Web Analytics** falls nötig.

---

## Testing

- Jede Komponent hat mindestens eine Basis test (Rendering + Props)
- Gesamtlogik getestet mit Jest + RTL
- Integration in CI/CD-Pipeline möglich

---

## Deployment-Hinweis

- Build mit `vite build`
- Output als statische Dateien auf NGINX oder CDN
- Sicherheit header (CSP, HSTS, SameSite) werden server seitig gesetzt

---

