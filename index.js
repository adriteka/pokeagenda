const inputFiltro = document.querySelector("#input-filtro");
let listItems;

const getPokemon = async (amount) => {
  const fetchPromises = [];
  for (let i = 1; i <= amount; i++) {
    const promise = fetch("https://pokeapi.co/api/v2/pokemon/" + i);
    fetchPromises.push(promise);
  }
  const fetchResponses = await Promise.all(fetchPromises);

  const jsonPromises = [];
  for (resp of fetchResponses) jsonPromises.push(resp.json());
  const data = await Promise.all(jsonPromises);

  return data;
};

window.addEventListener("load", async () => {
  const pokeArr = await getPokemon(151);
  const lista = document.querySelector("#lista");
  for (p of pokeArr)
    lista.innerHTML += `<li><h2>${p.name}</h2><img src="${p.sprites.front_default}" alt='Dibujo de ${p.name}' title='${p.name}' /></li>`;
  listItems = document.querySelectorAll("#lista li h2");
});

inputFiltro.addEventListener("keyup", (e) => {
  for (h2 of listItems) {
    if (!h2.innerHTML.includes(inputFiltro.value))
      h2.parentNode.style.display = "none";
    else h2.parentNode.style.display = "block";
  }
});

document.querySelector("#btn-reset").addEventListener("click", () => {
  if (inputFiltro.value) {
    inputFiltro.value = "";
    for (h2 of listItems) h2.parentNode.style.display = "block";
  }
});

// En caso de 'keypress' en vez de 'keyup': obtener del evento la tecla pulsada

// inputFiltro.addEventListener("keypress", (e) => {
//   console.log(inputFiltro.value + String.fromCharCode(e.keyCode));
// });
