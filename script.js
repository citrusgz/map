const state = {
  classOfElements: null,
  listOfEls: [],
  elementsStroked: false,
};

document.addEventListener("DOMContentLoaded", function () {
  const buttonBlue = document.getElementById("blueBtn");

  const buttonRed = document.getElementById("redBtn");

  const btnWrapper = document.getElementById("button-wrapper");

  // em qualquer clique
  document.addEventListener("click", (e) => {
    if (state.elementsStroked) {
      state.elementsStroked = false;
      state.classOfElementsStroked = null;

      var todasAsRegioes = document.querySelectorAll("path");
      var todosOsPontos = document.querySelectorAll("circle");

      Array.from(todasAsRegioes).forEach((el) => {
        el.style.opacity = 1;
      });

      Array.from(todosOsPontos).forEach((el) => {
        el.style.opacity = 1;
      });
    }

    // se o elemento clicado não fot path ou um dos botões oculto os botões e limpo a classe do elemento clicado
    if (e.target.nodeName !== "path" && e.target.nodeName !== "BUTTON") {
      btnWrapper.setAttribute("hidden", "hidden");

      state.classOfElements = null;
    }

    // se for um path exibo os botões e só seto os elementos se forem as cidades
    // se forem as bolinhas das cidades não permito seleção
    if (e.target.nodeName === "path") {
      state.classOfElements =
        e.srcElement.attributes[0].value === "st21" ||
        e.srcElement.attributes[0].value === "st4"
          ? null
          : e.srcElement.attributes[0].value;

      if (state.classOfElements) {
        var todasAsRegioes = document.querySelectorAll("path");
        var todosOsPontos = document.querySelectorAll("circle");

        Array.from(todasAsRegioes).forEach((el) => {
          el.style.opacity = 0.3;
        });

        Array.from(todosOsPontos).forEach((el) => {
            el.style.opacity = 0.3;
          });

        btnWrapper.removeAttribute("hidden");
      }
    }

    // se houver uma classe habilitada para buscar elementos, pego os elementos e defino no state
    if (state.classOfElements) {
      state.listOfst2Els = document.getElementsByClassName(
        state.classOfElements
      );

      Array.from(state.listOfst2Els).forEach((el) => {
        el.style.opacity = 1;
      });

      state.elementsStroked = true;
      state.classOfElementsStroked = state.classOfElements;
    }

    // quando clicar no botão azum defino os elementos com a classe selecionada com a cor azul
    buttonBlue.addEventListener("click", () => {
      Array.from(state.listOfst2Els).forEach((el) => {
        el.style.fill = "#0072bc";
      });
      btnWrapper.setAttribute("hidden", "hidden");
    });

    // quando clicar no botão azum defino os elementos com a classe selecionada com a cor vermelha
    buttonRed.addEventListener("click", () => {
      Array.from(state.listOfst2Els).forEach((el) => {
        el.style.fill = "#ed1c24";
      });
      btnWrapper.setAttribute("hidden", "hidden");
    });
  });
});
