// Importa o React (necessário para componentes funcionais)
import React from "react";

/*
  Componente de botão flutuante que aparece apenas
  quando o menu lateral (aside) está FECHADO.

  Props:
    - aberto: boolean -> indica se o menu está aberto.
    - onAbrir: function -> função chamada ao clicar no botão.
*/
export default function FloatingButton({ aberto, onAbrir }) {
  // Se o menu está aberto, o botão não deve aparecer → retorna null
  if (aberto) return null;

  // Caso o menu esteja fechado, renderiza o botão flutuante
  return (
    <button
      id="abrir-menu-flutuante"              // id usado no CSS
      className="abrir-menu-flutuante"       // classe para aplicar estilos
      aria-label="Abrir menu"                // acessibilidade (descrição do botão)
      title="Abrir menu"                     // tooltip quando o mouse passa por cima
      onClick={onAbrir}                      // chama a função que abre o menu
      style={{ display: "flex" }}            // garante que o botão use display flex
    >
      ≡                                      {/* Ícone simples de "menu" */}
    </button>
  );
}
