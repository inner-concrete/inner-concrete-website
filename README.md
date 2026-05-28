# INNER CONCRETE — Next.js + Docker (deployment-ready)

Dieses Projekt ist für lokale Entwicklung und späteres Hosting mit Docker / EasyPanel auf einem Hetzner-Server vorbereitet.

## Voraussetzungen

- Node.js >= 18
- Docker
- Optional: Docker Compose
- Git für EasyPanel / Hetzner Deployment

## Lokale Entwicklung

```bash
npm install
npm run dev
```

Dann `http://localhost:3000` öffnen.

## Local Docker-Test

```bash
docker build -t inner-concrete:local .
docker run -p 3000:3000 inner-concrete:local
```

Oder mit Docker Compose:

```bash
docker compose up --build
```

## Git & EasyPanel Deployment

EasyPanel baut direkt aus dem Git-Repository und verwendet das `Dockerfile`.

1. Git initialisieren:

```bash
git init
```

2. Dateien hinzufügen und committen:

```bash
git add .
git commit -m "Deploy-ready: Docker + EasyPanel"
```

3. Repository auf GitHub/GitLab pushen.

4. In EasyPanel:
   - Neue App anlegen
   - Build from Git wählen
   - Repository verknüpfen
   - Branch `main` / `master` wählen
   - Dockerfile verwenden
   - Port `3000` freigeben
   - Domain eintragen und SSL aktivieren

## Hetzner-Server

- Der Hetzner-Server sollte Docker und EasyPanel installiert haben.
- Öffne Ports `80` und `443` in der Firewall.
- In EasyPanel die Domain eintragen und auf den Server zeigen.

## Projektstruktur & Hinweise

- Statische Dateien (`index.html`, `buch.html`, `gedanken.html`, `meditationen.html`, `shop.html`, `styles.css`, `assets/`) werden im Docker-Build nach `public/` kopiert.
- Die vorhandene Next.js-Route `/` liegt in `pages/index.js`.
- Für spätere Erweiterungen kannst du zusätzliche Next.js-Seiten unter `pages/` erstellen.

Sag mir, welchen Schritt ich als Nächstes ausführen soll.
