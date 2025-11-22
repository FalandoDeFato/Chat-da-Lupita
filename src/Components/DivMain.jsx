// Importa o componente Header (cabeçalho da página)
import Header from "./Header";
// Importa o componente MainContent (conteúdo principal da interface)
import MainContent from "./MainContent";

// Componente responsável por agrupar o Header e o MainContent
function DivMain() {
  return (
    <>
      {/* Div principal que envolve o conteúdo da página */}
      <div className="main">
        {/* Renderiza o cabeçalho */}
        <Header />

        {/* Renderiza o conteúdo principal */}
        <MainContent />
      </div>
    </>
  );
}

// Exporta o componente para ser usado em outros arquivos
export default DivMain;
