/* == MainContent == */

// Importa imagens usadas nos balões de conversa e no botão de envio
import lupita from "../img/lupita.png";
import iconeUsuario from "../img/iconeUsuario.png";
import iconeEnvio from "../img/iconeEnvio.png";

// Importa React e hooks necessários
import React, { useEffect, useRef } from "react";

/*
  Componente MainContent
  Props:
    - conversa: objeto contendo mensagens da conversa atual
    - onEnviar: função chamada quando o usuário envia uma mensagem
    - campoRef: referência para o textarea, passada pelo componente pai
*/
export default function MainContent({ conversa, onEnviar, campoRef, carregando }) {
  // Referência para o elemento <main> que contém as mensagens
  const mainRef = useRef(null);

  // Sempre que a conversa atualizar, rola automaticamente para o final
  useEffect(() => {
    const el = mainRef.current;
    if (!el) return;

    // Timeout pequeno para garantir que o DOM terminou de atualizar
    setTimeout(() => {
      el.scrollTop = el.scrollHeight; // rola até o final
    }, 50);
  }, [conversa]);

  // Função que permite enviar mensagem com Enter (sem Shift)
  function handleKeyDown(e) {
    // Enter sozinho envia, Shift + Enter quebra linha
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // evita pular linha

      const texto = campoRef.current.value.trim(); // pega o texto
      if (!texto) return; // se estiver vazio, não envia

      campoRef.current.value = ""; // limpa o textarea
      onEnviar(texto); // dispara o envio
    }
  }

  return (
    <>
      {/* Área principal onde as mensagens aparecem */}
      <main className="content" ref={mainRef}>
        {/* Mapeia cada mensagem da conversa e exibe no chat */}
        {(conversa?.messages || []).map((msg, i) => (
          <div
            key={i}
            className={`chat-content ${
              msg.role === "user"
                ? "usuario"
                : msg.role === "assistant"
                ? "assistente"
                : "sistema"
            }`}
          >
            {/* Ícone da Lupita aparece antes da mensagem da assistente */}
            {msg.role === "assistant" && <img src={lupita} alt="Lupita" />}

            {/* Balão contendo o texto da mensagem */}
            <div className="balao-chat">
              <p>{msg.text}</p>
            </div>

            {/* Ícone do usuário aparece depois da mensagem do usuário */}
            {msg.role === "user" && <img src={iconeUsuario} alt="Usuário" />}
          </div>
        ))}

        {/* 👇 AQUI: bolha de “Lupita está verificando...” enquanto carrega */}
  {carregando && (
    <div className="chat-content assistente">
      <img src={lupita} alt="Lupita" />
      <div className="balao-chat">
        <div className="typing-indicator">
          <span></span><span></span><span></span>
        </div>
      </div>
    </div>
  )}
      </main>

      {/* Caixa onde o usuário escreve e envia mensagens */}
      <div className="message-box">
        <div className="composer-inner">
          {/* Campo de texto para digitar a mensagem */}
          <textarea
            id="input"
            ref={campoRef} // permite acessar o conteúdo do input pelo parent
            className="balao-message"
            placeholder="Descreva a notícia que deseja verificar aqui..."
            onKeyDown={handleKeyDown} // envia com Enter
          />

          {/* Botão visual de envio */}
          <button
            id="send-button"
            className="send-button"
            aria-label="Enviar"
            onClick={() => {
              const texto = campoRef.current?.value.trim(); // lê o texto
              if (!texto) return; // ignora vazio

              campoRef.current.value = ""; // limpa o campo
              onEnviar(texto); // envia
            }}
          >
            <img src={iconeEnvio} alt="Enviar" />
          </button>
        </div>
      </div>
    </>
  );
}
