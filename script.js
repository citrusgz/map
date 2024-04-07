document.addEventListener("DOMContentLoaded", function () {
  const state = {
    citySelected: null,
    changeStack: []
  };

  class City {
    constructor(id, originalColor){
      this.id = id,
      this.originalColor = originalColor
    }
  }

  const buttonBlue = document.getElementById("blueBtn");

  const buttonRed = document.getElementById("redBtn");

  const btnClearAll = document.getElementById("clearAll");

  const btnUndo = document.getElementById("undo");

  const modal = document.getElementById("button-wrapper");

  const mapa = document.getElementById("map");

  const blockedRegions = ["st21", "st4"];

  const cityNameElement = document.getElementById("cityName");

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
    let citiesSelected = document.getElementsByClassName(
      e.target.attributes.class.value
    );

    Array.from(citiesSelected).forEach((el) => {
      el.style.opacity = 1;
    });
  }

  function exibirCidadeSelecionada() {
    let idProcurado = state.citySelected.target.attributes.id.value;

    fetch("cities.json")
      .then((response) => response.json())
      .then((cities) => {
        let itemEncontrado = cities.find((item) => item.id === idProcurado);

        if (cityNameElement && itemEncontrado) {
          cityNameElement.innerHTML =
            "Para a cidade de: <span style='font-weight:bold;'>" +
            itemEncontrado.newId +
            "</span>";
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

  mapa.addEventListener("click", (e) => {
    if (!isRegion(e)) {
      state.citySelected = null;

      ocultarModal();
    }

    if (!isRegion(e) || !regionAllowedClick(e)) {
      definirOpacidadeMapa(1);
      ocultarModal();
    }

    if (isRegion(e) && regionAllowedClick(e)) {
      state.citySelected = e;

      definirOpacidadeMapa(0.3);

      exibirModal();

      destacarRegiao(e);

      exibirCidadeSelecionada();
    }
  });

  buttonBlue.addEventListener("click", () => {
    insertIntoCitySelectedStack();
    pintarCidadeSelecionada("#0072bc");
    ocultarModal();
    definirOpacidadeMapa(1);
  });

  buttonRed.addEventListener("click", () => {
    insertIntoCitySelectedStack();
    pintarCidadeSelecionada("#ed1c24");
    ocultarModal();
    definirOpacidadeMapa(1);
  });

  function insertIntoCitySelectedStack() {
    var estilosComputados = window.getComputedStyle(state.citySelected.target);

    state.changeStack.unshift(new City(state.citySelected.target.attributes.id.value, estilosComputados.fill));

    var estilosComputados = null;
  }

  function pintarCidadeSelecionada(color) {
    state.citySelected.target.style.fill = color;
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      ocultarModal();

      state.citySelected = null;

      definirOpacidadeMapa(1);
    }
  });

  btnUndo.addEventListener("click", () => {
    var cityRemoved = state.changeStack.shift();

    resetCityColor(cityRemoved);
  });

  btnClearAll.addEventListener("click", () => {

    state.changeStack.forEach(city => {

      resetCityColor(city);
    });

    state.changeStack = [];
  });

  function resetCityColor(city) {

    if(!city) {
      return
    }

    var elCity = document.getElementById(city.id);

    elCity.style.fill = city.originalColor;
  }
});
