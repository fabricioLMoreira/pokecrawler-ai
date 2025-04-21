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
