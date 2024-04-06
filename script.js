document.addEventListener("DOMContentLoaded", function () {

  const state = {
    citySelected: null
  };

  const buttonBlue = document.getElementById("blueBtn");

  const buttonRed = document.getElementById("redBtn");

  const modal = document.getElementById("button-wrapper");

  const blockedRegions = ['st21', 'st4'];

  function definirOpacidadeMapa(opacity) {
    let todasAsRegioes = document.querySelectorAll("path");
    let todosOsPontos = document.querySelectorAll("circle");

    Array.from(todasAsRegioes).forEach((el) => {
      el.style.opacity = opacity;
    });

    Array.from(todosOsPontos).forEach((el) => {
      el.style.opacity = opacity;
    });
  }

  function destacarRegiao(e) {
    let citiesSelected = document.getElementsByClassName(e.target.attributes.class.value);

    Array.from(citiesSelected).forEach((el) => {
      el.style.opacity = 1;
    });
  }

  function exibirCidadeSelecionada() {
    let idProcurado = state.citySelected.target.attributes.id.value;

    fetch('uniao.json')
    .then(response => response.json())
    .then(uniao => {
      let itemEncontrado = uniao.find(item => item.id === idProcurado);

      if (itemEncontrado) {
        let cityNameElement = document.getElementById('cityName');
    
        if (cityNameElement) {
          cityNameElement.innerHTML = "Para a cidade de: <span style='font-weight:bold;'>" + itemEncontrado.newId + "</span>";
        }
      }
    });
  }

  function isRegion(e) {
    return e.target.nodeName === "path";
  }

  function regionAllowedClick(e) {
    return !blockedRegions.includes(e.target.attributes.class.value);
  }

  function ocultarModal() {
    modal.setAttribute("hidden", "hidden");
  }

  function exibirModal() {
    modal.removeAttribute("hidden");
  }

  function pintarCidadeSelecionada(color) {
    state.citySelected.target.style.fill = color;
  }

  function isButton(e) {
    return e.target.nodeName !== "BUTTON"
  }

  function haveSelectedCity() {
    return state.citySelected !== null
  }

  document.addEventListener("click", (e) => {

    if (haveSelectedCity()) {
      definirOpacidadeMapa(1)
    }

    if (!isRegion(e) && isButton(e)) {

      state.citySelected = null;

      ocultarModal();
    }

    if(!regionAllowedClick(e)) {
      ocultarModal();
    }

    if (isRegion(e) && regionAllowedClick(e)) {
      state.citySelected = e;

      definirOpacidadeMapa(0.3);

      exibirModal();

      destacarRegiao(e);

      exibirCidadeSelecionada();
    }

    buttonBlue.addEventListener("click", () => {
      pintarCidadeSelecionada("#0072bc");
      ocultarModal();
    });

    buttonRed.addEventListener("click", () => {
      pintarCidadeSelecionada("#ed1c24");
      ocultarModal();
    });
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === 'Escape') {
      ocultarModal();

      state.citySelected = null;

      definirOpacidadeMapa(1);
    }
  });
});
