// Importa o ícone usado ao lado de cada conversa na lista
import iconeBalao from "../img/iconBalao.png";
// Importa React
import React from "react";
// Importa utilitário para formatar "tempo atrás"
import { timeAgo } from "../utils/chatUtils";

/*
  Componente Aside.jsx
  É responsável por exibir a lista de conversas no menu lateral (sidebar).

  Props:
    - conversas: array com todas as conversas salvas
    - selecionadaId: id da conversa atualmente aberta
    - onSelect: função chamada quando o usuário escolhe uma conversa
    - onNova: função que cria uma nova conversa
    - aberto: controla se o menu está aberto ou fechado
    - toggle: função que abre/fecha o menu lateral
*/
export default function Aside({ conversas, selecionadaId, onSelect, onNova, aberto, toggle }) {
  return (
    // Aside recebe classes diferentes dependendo se está aberto ou fechado
    <aside className={`sidebar ${aberto ? "" : "fechada"}`}>
      {/* Cabeçalho do aside */}
      <div className="aside-header">
        {/* Botão do menu (três barras) para abrir/fechar */}
        <div className="icone-menu" role="button" aria-label="Menu" onClick={toggle}>
          ≡
        </div>

        {/* Botão para criar uma nova verificação */}
        <button className="button" onClick={() => { onNova(); }}>
          Nova Verificação
        </button>
      </div>

      {/* Lista de conversas existentes */}
      <div className="aside-list">
        {conversas
          .slice() // copia o array para não modificar o original
          .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)) // ordena pela mais recente
          .map((c) => (
            <button
              key={c.id} // chave única para cada conversa
              className={`conversation-box ${c.id === selecionadaId ? "selected" : ""}`} // marca a conversa selecionada
              onClick={() => onSelect(c.id)} // troca a conversa atual
              data-id={c.id}
            >
              {/* Ícone visual de balão */}
              <img src={iconeBalao} alt="" />

              {/* Informações da conversa */}
              <div>
                {/* Título da conversa */}
                <p>{c.title || "Sem título"}</p>

                {/* Exibe quanto tempo faz que foi atualizada */}
                <small>{timeAgo(new Date(c.updatedAt || Date.now()))}</small>
              </div>
            </button>
          ))}
      </div>

      {/* Rodapé com quantidade de conversas */}
      <div className="aside-footer">
        <p className="aside-title">
          {conversas.length} {conversas.length === 1 ? "Conversa" : "Conversas"}
        </p>
      </div>
    </aside>
  );
}
