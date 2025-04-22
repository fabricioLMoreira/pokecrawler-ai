# 🕵️‍♂️ PokeCrawler AI

![Python](https://img.shields.io/badge/Python-3.10+-blue?style=flat-square&logo=python)
![Docker](https://img.shields.io/badge/Docker-Enabled-blue?style=flat-square&logo=docker)
![Ansible](https://img.shields.io/badge/Ansible-Automation-red?style=flat-square&logo=ansible)
![License](https://img.shields.io/github/license/fabricioLMoreira/pokecrawler-ai?style=flat-square)

PokeCrawler is a complete web app powered by the public REST API [pokeapi.co](https://pokeapi.co/), enriched by a 🕷 Web Crawler, stored in a PostgreSQL database, and served through a backend and frontend in a fully containerized environment.

---

## 🚀 Overview

- 🧠 Gathers Pokémon data from PokeAPI
- 🔎 Enriches data with a custom crawler
- 🗃 Stores in PostgreSQL
- 🛠 Backend & frontend expose a clean UI
- 🔐 Uses Keycloak for secure login
- 🌍 Optional `ngrok` tunnel for public access and CI webhook integration

---

## 📦 Clone & Setup

```bash
git clone https://github.com/fabricioLMoreira/pokecrawler-ai.git
cd pokecrawler-ai/ansible
```

---

## ⚙️ Requirements

### 🐍 Python & Docker

```bash
sudo apt install -y python3 python3-pip python3-docker
```

### 🤖 Install Ansible

```bash
sudo apt-add-repository ppa:ansible/ansible
sudo apt update
sudo apt install ansible
```

### 📦 Install Ansible Docker Modules

```bash
ansible-galaxy collection install community.docker
```

---

## 📁 Setup

### 🔧 Define Required Vars

Located in `ansible/inventory/<env>/group_vars/`

| Variable              | File                     | Description                                                                 |
|-----------------------|--------------------------|-----------------------------------------------------------------------------|
| `database_env`        | `group_vars/all.yml`     | Database specific vars                                                     |
| `dockerhub_user`      | `group_vars/all.yml`     | DockerHub user (change if rebuilding/pulling your own images)             |
| `ngrok_domain`        | `group_vars/ngrok.yml`   | Ngrok domain used when exposing services publicly                          |
| `keycloak_username`   | `group_vars/keycloak.yml`| Keycloak user for app login                                                |
| `keycloak_pass`       | `group_vars/keycloak.yml`| Keycloak password for app login                                            |

---

## 🐳 Install Docker (manually or via Ansible)

```bash
sudo ansible-playbook playbooks/docker.yml
```

---

## 🌐 (Optional) Install [Ngrok](https://ngrok.com)

Used to expose Jenkins for GitHub webhook triggers.

```bash
ansible-playbook playbooks/ngrok.yml
```

### 🔐 Store Ngrok Token with Vault

```bash
ansible-vault create secrets.yml
```

Inside `secrets.yml`, add:

```yaml
ngrok_auth_token: "YOUR_TOKEN"
```

Run ansible playbook with sudo:

```bash
sudo ansible-playbook playbooks/ngrok.yml --ask-vault-pass
```

Or use the bundled setup:

```bash
ansible-playbook -v playbooks/setup.yml --ask-vault-pass
```

---

## 🚀 Deployment

All playbooks live in `ansible/playbooks`.

### 🧰 Deploy all components:

```bash
ansible-playbook playbooks/site.yml
```

### 🔩 Deploy a specific component:

```bash
ansible-playbook playbooks/database.yml
```

> 🗂 To create new environments: duplicate `ansible/inventory/dev/`, edit `hosts` and `group_vars/`.

---

## ✅ Validation

1. Open your browser
2. Navigate to the `frontend` URL (host:port)
3. Click **Login**
4. Use the credentials:
   - Username: `{{ keycloak_username }}`
   - Password: `{{ keycloak_pass }}`

---

## 🧑‍💻 Development

- 📂 Backend: `backend/`
- 🎨 Frontend: `frontend/`
- 🕷 Crawler: `crawler/`
- 🛢 DB Schema: `init.sql` (used by PostgreSQL on startup)

> Update `init.sql` if schema changes, and **redeploy the database service** to apply changes.

Inside the `jenkins` folder is provided a `Dockerfile` that can be used to build a jenkins image
```bash
docker build -t my_jenkins .
```
And a script `start_ansible.sh` is used to run a container using the my_jenkins image
```bash
sh start_jenkins.sh
```
The jenkins dashboard shall be available at localhost:8080.

The repo includes a `Jenkinsfile` that can be used to build the project and push new images based on the source code. Create a new pipeline, then "Pipeline script from SCM", add the url to your pokecrawler repository, and "Jenkinsfile" in the "Script Path"

---

## 🧠 Credits

- [PokeAPI](https://pokeapi.co/) for the awesome Pokémon data
- [Keycloak](https://www.keycloak.org/) for authentication
- [Ngrok](https://ngrok.com) for secure tunnels
- [Docker](https://docker.com) & [Ansible](https://ansible.com) for orchestration



---
