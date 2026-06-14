# INNER CONCRETE WEBSITE

Official website project for INNER CONCRETE.

## Projektstruktur

Die HTML-Seiten bleiben wegen der Live-URLs direkt im Root:

- `index.html`
- `buch.html`
- `meditationen.html`
- `gedanken.html`
- `shop.html`
- `styles.css`

Assets und Medien sind nach Seitenaufbau sortiert:

- `assets/index/frames` — Startseiten-Frame-Sequenz
- `assets/index/scenes` — Startseiten-Szenenbilder
- `assets/buch/frames` — Buch-Frame-Sequenz
- `assets/meditationen/frames` — Meditations-Frame-Sequenz
- `assets/shared/branding` — gemeinsame Brand- und Motivdateien
- `audio/meditationen` — Audio-Dateien fuer die Meditationsseite

## Hetzner Deployment

### Vorbereitung auf dem Hetzner-Server

1. Erstelle oder verwende einen Ubuntu-Server bei Hetzner.
2. Melde dich per SSH an und installiere Docker + Compose:

```bash
sudo apt update
sudo apt install -y git docker.io docker-compose-plugin
sudo systemctl enable --now docker
```

3. Optional: Lege ein Zielverzeichnis an:

```bash
sudo mkdir -p /var/www/inner_concrete
sudo chown "$USER":"$USER" /var/www/inner_concrete
```

### Manuelles Deployment

Auf dem Server:

```bash
cd /var/www/inner_concrete
if [ ! -d .git ]; then
  git clone https://github.com/<dein-benutzer>/<dein-repo>.git .
fi
git pull origin main
sudo docker compose up -d --build
```

### Automatisches GitHub-Deployment

Das Repository enthält jetzt eine GitHub Actions-Workflow-Datei unter `.github/workflows/hetzner-deploy.yml`.

Du musst diese Secrets in deinem GitHub-Repository anlegen:

- `HETZNER_HOST` — IP-Adresse oder Hostname des Servers
- `HETZNER_USER` — SSH-Benutzername (z. B. `root` oder `ubuntu`)
- `HETZNER_SSH_KEY` — privater SSH-Schlüssel für den Zugriff vom Workflow auf den Server

Beim Push auf `main` wird dann automatisch auf den Server deployt.

### Hinweis

Der Workflow nutzt `sudo docker compose`, deshalb muss der SSH-Benutzer auf dem Server Docker verwenden können.

Wenn du den Dienst direkt über Port 80 erreichbar machen möchtest, ändere in `docker-compose.yml` die `ports`-Zeile auf:

```yaml
ports:
  - "80:80"
```

Alternativ kannst du auf dem Server einen Reverse-Proxy wie Nginx oder Caddy vor den Container stellen.

## EasyPanel Deployment

Wenn du EasyPanel auf dem Hetzner-Server verwendest, kannst du das bestehende `docker-compose.yml` direkt als EasyPanel-Docker-Compose-Projekt nutzen:

1. Öffne EasyPanel und erstelle ein neues Projekt vom Typ Docker Compose.
2. Wähle das GitHub-Repository oder lade den Projektordner hoch.
3. Stelle sicher, dass EasyPanel `docker compose` verwendet.
4. Leite den internen Container-Port `80` nach außen weiter, z. B. auf `80`.
5. Starte den Service in EasyPanel.

Wenn du EasyPanel einsetzt, sollte EasyPanel die primäre Container-Verwaltung übernehmen und den SSH-basierten GitHub-Workflow nur als sekundären Update-Weg verwenden.

### GitHub Deployment mit EasyPanel

Wenn du den Workflow behalten möchtest, achte darauf, dass der SSH-Benutzer auf dem Server:

- Docker-Kommandos mit `sudo` ausführen kann,
- Zugriff auf das EasyPanel-Verzeichnis hat,
- und keine Konflikte zwischen EasyPanel und dem manuellen `docker compose up` auftreten.

Der vorhandene Workflow führt dann auf dem Server `git pull` aus und startet den Container neu.

> Tipp: Wenn EasyPanel die Container-Verwaltung übernimmt, ist es oft einfacher, das automatische Deployment über EasyPanel selbst zu konfigurieren und den GitHub-Workflow als sekundären Update-Weg zu nutzen.
