backend/
└── app/
    ├── main.py                         # 🚀 Entrada da aplicação FastAPI
    ├── api/
    │   └── routes_pokemon.py           # 🌐 Endpoints RESTful
    ├── core/
    │   └── config.py                   # ⚙️  Configurações da app (ex: DB_URL)
    ├── crud/
    │   └── pokemon.py                  # 📦 Acesso a DB (CRUD)
    ├── db/
    │   ├── database.py                 # 🔗 Conexão com DB
    │   └── models.py                   # 🧱 Definição das tabelas (SQLAlchemy)
    └── schemas/
        └── pokemon.py                 # 🧾 Validação de dados com Pydantic



## 📈 Swagger (Documentação Automática)
Acesse em: [http://localhost:8000/docs](http://localhost:8000/docs)

## 🎨 Licença
Este projeto é livre para fins educativos e acadêmicos.