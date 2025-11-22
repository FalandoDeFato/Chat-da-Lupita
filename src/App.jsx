// Importa React e hooks que serão usados no componente
import React, { useEffect, useRef, useState } from "react";
// Importa o componente Aside (barra lateral)
import Aside from "./components/SideBar";
// Importa a imagem do logo de check
import CheckLogo from "./img/CheckLogo.png";
// Importa o componente que rende o conteúdo principal do chat
import MainContent from "./components/MainContent";
// Importa o botão flutuante (que abre/fecha o aside)
import FloatingButton from "./components/Button";
// Função utilitária para gerar IDs únicos para conversas
import { gerarId } from "./utils/chatUtils";
// Importa estilos CSS do app
import "./App.css";

// URL base do backend (onde está o endpoint de verificação)
const URL_BASE = "http://0.0.0.0:8000";
/* const URL_BASE = "http://127.0.0.1:8000" */

// Flag para usar mock de conversas (frontend-only) ou o backend real
const USAR_MOCK_CONVERSAS = true;

// Componente principal da aplicação
export default function App() {
  // referencia para o campo de mensagem (ex: para dar focus)
  const campoMensagemRef = useRef(null);
  // estado que guarda todas as conversas (array de objetos)
  const [conversas, setConversas] = useState([]);
  // id da conversa atualmente selecionada
  const [conversaSelecionadaId, setConversaSelecionadaId] = useState(null);
  // controla se o menu lateral está aberto ou fechado
  const [menuAberto, setMenuAberto] = useState(true);

  // --- Helpers para persistência local (somente usados no mock) ---
  // Salva o array de conversas no localStorage quando estamos em modo mock
  function salvarMockNoLocalStorage(local) {
    if (!USAR_MOCK_CONVERSAS) return; // sai se não for mock
    localStorage.setItem("fd_conversas", JSON.stringify(local));
  }

  // Carrega as conversas do localStorage (modo mock)
  function carregarMockDoLocalStorage() {
    const raw = localStorage.getItem("fd_conversas");
    return raw ? JSON.parse(raw) : null; // retorna null se não existir
  }

  // --- Carregar histórico quando o app monta ---
  useEffect(() => {
    if (USAR_MOCK_CONVERSAS) {
      const raw = carregarMockDoLocalStorage();
      if (raw && Array.isArray(raw) && raw.length) {
        // se há conversas salvas, carrega elas no estado
        setConversas(raw);
        // seleciona a primeira conversa por padrão
        setConversaSelecionadaId(raw[0].id);
      } else {
        // caso não haja nada salvo, cria uma nova conversa padrão
        criarNovaConversa("Nova Verificação");
      }
    } else {
      // MODO BACKEND: não precisamos listar conversas do backend aqui
      // apenas criamos uma conversa vazia para o usuário começar
      criarNovaConversa("Nova Verificação");
    }
    // executa só uma vez ao montar (array de dependências vazio)
  }, []);

  // --- Função para criar nova conversa (mock ou apenas frontend) ---
  async function criarNovaConversa(titulo = "Nova Verificação") {
    const id = gerarId(); // gera um id único
    const nova = {
      id,
      title: titulo,
      updatedAt: new Date().toISOString(),
      messages: [
        {
          role: "assistant",
          text:
            "Olá! Eu sou a Lupita! Cole aqui a notícia que deseja verificar e eu vou analisar para você.",
          createdAt: new Date().toISOString(),
        },
      ],
    };

    // coloca a nova conversa no início do array
    const novoArray = [nova, ...conversas];
    setConversas(novoArray); // atualiza o estado
    salvarMockNoLocalStorage(novoArray); // persiste se estiver em mock
    setConversaSelecionadaId(id); // seleciona a conversa recém-criada
    return nova; // retorna o objeto criado caso quem chamou precise
  }

  // --- Adiciona uma mensagem à conversa atualmente selecionada ---
  function adicionarMensagemNaConversaAtual(role, texto) {
    setConversas((prev) => {
      const novo = prev.map((c) => {
        if (c.id !== conversaSelecionadaId) return c; // ignora outras conversas

        const msg = { role, text: texto, createdAt: new Date().toISOString() };

        return {
          ...c,
          messages: [...(c.messages || []), msg], // adiciona no fim
          updatedAt: new Date().toISOString(), // atualiza timestamp
        };
      });

      salvarMockNoLocalStorage(novo); // salva no mock se necessário
      return novo; // atualiza o estado com o novo array
    });
  }

  // --- Envia mensagem do usuário: faz mock ou chama o backend ---
  async function handleEnviarDoUsuario(texto) {
    // primeiro adiciona a bolha do usuário na conversa
    adicionarMensagemNaConversaAtual("user", texto);

    if (USAR_MOCK_CONVERSAS) {
      // se estiver usando mock, simula uma resposta da assistente
      setTimeout(() => {
        adicionarMensagemNaConversaAtual(
          "assistant",
          "Vou verificar essa notícia pra você!"
        );
      }, 800); // atraso artificial para parecer mais natural
      return; // termina aqui em modo mock
    }

    // ======================
    // MODO BACKEND REAL
    // ======================
    try {
      // chama o endpoint /verificar do backend enviando o texto/ prompt
      const res = await fetch(`${URL_BASE}/verificar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: texto }),
      });

      const data = await res.json(); // parse do JSON retornado

      // monta uma resposta formatada a partir dos campos retornados
      const respostaFormatada =
        `Classificação: ${data.classificacao || "—"}\n\n` +
        `Resumo: ${data.resumo || "—"}\n\n` +
        `Fonte: ${data.fonte || "—"}\n\n` +
        `Data da notícia: ${data.dataNoticia || "—"}`;

      // adiciona a resposta da Lupita na conversa
      adicionarMensagemNaConversaAtual("assistant", respostaFormatada);
    } catch (error) {
      // em caso de erro na requisição, avisa o usuário pela conversa
      adicionarMensagemNaConversaAtual(
        "assistant",
        "Erro ao conectar com o servidor. Tente novamente."
      );
    }
  }

  // pega o objeto da conversa atualmente selecionada (ou null)
  const conversaAtual =
    conversas.find((c) => c.id === conversaSelecionadaId) || null;

  // --- JSX retornado pelo componente ---
  return (
    // container principal; adiciona classe para estilizar quando a sidebar estiver fechada
    <div className={`app ${menuAberto ? "" : "sidebar-fechada"}`}>
      {/* Aside (barra lateral) recebe props para listar conversas e controlar abertura */}
      <Aside
        conversas={conversas}
        selecionadaId={conversaSelecionadaId}
        onSelect={(id) => setConversaSelecionadaId(id)}
        onNova={(titulo) => criarNovaConversa(titulo)}
        aberto={menuAberto}
        toggle={() => setMenuAberto((v) => !v)}
      />

      <div className="main">
        <header className="topbar">
          <div className="logo">
            {/* logo de check */}
            <img src={CheckLogo} alt="Logo" />
            <h1>
              Falando <span className="block">DE FATO</span>
            </h1>
          </div>
        </header>

        {/* Conteúdo principal do chat: mensagens e campo de envio */}
        <MainContent
          conversa={conversaAtual}
          onEnviar={handleEnviarDoUsuario}
          campoRef={campoMensagemRef}
        />
      </div>

      {/* Botão flutuante para abrir o aside quando em telas menores */}
      <FloatingButton aberto={menuAberto} onAbrir={() => setMenuAberto(true)} />
    </div>
  );
}
