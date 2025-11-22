# 📰 Falando de Fato — Verificador de Notícias com IA (Lupita)

O **Falando de Fato** é uma plataforma desenvolvida para auxiliar usuários a verificarem a veracidade de notícias, textos e informações circulando na internet.  
O sistema conta com a **Lupita**, uma agente de IA que analisa a notícia enviada e retorna:

- ✔ Classificação (verdadeiro, falso ou duvidoso)  
- 📝 Resumo da análise  
- 🔗 Possível fonte  
- 📅 Data da notícia (quando identificada)  

---

## 🚀 Tecnologias utilizadas

- **React.js** — interface do usuário  
- **Vite** — ambiente de desenvolvimento rápido  
- **JavaScript (ES6+)**  
- **CSS3**  
- **Backend em Python/FastAPI** (quando não está em modo mock)

---

## 📌 Funcionalidades

- Criação automática de conversas para cada verificação  
- Histórico de verificações  
- Chat com troca de mensagens entre usuário e IA  
- Interface responsiva  
- Mock interno para testes sem usar o backend  
- Persistência via LocalStorage (quando mock ativado)

---

## 🛠 Como executar o projeto

```sh
npm install
npm run dev
