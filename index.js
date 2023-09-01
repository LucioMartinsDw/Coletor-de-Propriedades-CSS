// Importa o módulo readline, que permite interação com a linha de comando.
const readline = require('readline');

// Classe que representa a aplicação para coletar e ordenar propriedades CSS.
class PropriedadesCSSApp {
  constructor() {
    // Cria uma interface para leitura e escrita usando o módulo readline.
    this.interfaceLeituraEscrita = readline.createInterface({
      input: process.stdin,    // Usa a entrada padrão (teclado).
      output: process.stdout   // Usa a saída padrão (console).
    });
    // Inicializa um array para armazenar as propriedades CSS coletadas.
    this.propriedadesCSS = [];
  }

  // Método para iniciar a coleta de propriedades.
  iniciar() {
    this.coletarPropriedades();
  }

  // Método para coletar propriedades de CSS.
  coletarPropriedades() {
    // Pergunta ao usuário por uma propriedade de CSS.
    this.interfaceLeituraEscrita.question("Digite uma propriedade de CSS (ou 'SAIR' para finalizar): ", resposta => {
      if (resposta.trim().toUpperCase() === 'SAIR') {
        this.finalizar(); // Se a resposta for 'SAIR', finaliza a aplicação.
      } else {
        // Valida e processa as propriedades inseridas pelo usuário.
        const propriedadesValidas = this.validarPropriedades(resposta);
        if (propriedadesValidas.length > 0) {
          this.adicionarPropriedades(propriedadesValidas); // Adiciona propriedades ao array.
        } else {
          console.log("Digite propriedades CSS válidas."); // Mensagem de erro para propriedades inválidas.
        }
        this.coletarPropriedades(); // Pede por outra propriedade.
      }
    });
  }

  // Método para validar as propriedades inseridas.
  validarPropriedades(resposta) {
    // Divide a resposta em uma lista de propriedades, removendo espaços em branco.
    const listaPropriedades = resposta.split(/[,;\s]+/).map(prop => prop.trim());
    // Filtra as propriedades vazias e aquelas que não estão no formato válido.
    return listaPropriedades.filter(prop => prop !== "" && prop.match(/[-a-zA-Z0-9]+/));
  }

  // Método para adicionar propriedades válidas ao array.
  adicionarPropriedades(propriedades) {
    this.propriedadesCSS.push(...propriedades);
  }

  // Método para finalizar a aplicação.
  finalizar() {
    if (this.propriedadesCSS.some(prop => prop !== "sair")) {
      this.ordenarPropriedades(); // Se há propriedades válidas, ordena e exibe.
    } else {
      console.log("Você não digitou propriedades CSS válidas!"); // Mensagem de erro se não há propriedades válidas.
    }
    this.interfaceLeituraEscrita.close(); // Fecha a interface de leitura/escrita.
  }

  // Método para ordenar e exibir as propriedades.
  ordenarPropriedades() {
    // Cria uma cópia ordenada das propriedades no array.
    const propriedadesOrdenadas = this.propriedadesCSS.slice().sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
    console.log("Propriedades ordenadas:");
    // Exibe cada propriedade ordenada.
    propriedadesOrdenadas.forEach(propriedade => {
      console.log(propriedade);
    });
  }
}

// Cria uma instância da classe PropriedadesCSSApp e inicia a aplicação.
const aplicacao = new PropriedadesCSSApp();
aplicacao.iniciar();
