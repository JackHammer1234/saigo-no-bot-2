const fs = require("fs");
const path = require("path");
const economiaPath = path.resolve(__dirname, "./data/economia.json");

function leerEconomia() {
  if (!fs.existsSync(economiaPath)) fs.writeFileSync(economiaPath, "{}");
  const data = fs.readFileSync(economiaPath);
  return JSON.parse(data);
}

function guardarEconomia(data) {
  fs.writeFileSync(economiaPath, JSON.stringify(data, null, 2));
}

function asegurarUsuario(id) {
  const economia = leerEconomia();
  if (!economia[id]) {
    economia[id] = { dinero: 0, inventario: {} };
    guardarEconomia(economia);
  }
}

function obtenerDinero(id) {
  asegurarUsuario(id);
  return leerEconomia()[id].dinero;
}

function modificarDinero(id, cantidad) {
  const economia = leerEconomia();
  asegurarUsuario(id);
  economia[id].dinero += cantidad;
  guardarEconomia(economia);
}

function quitarDinero(id, cantidad) {
  modificarDinero(id, -cantidad);
}

function obtenerInventario(id) {
  asegurarUsuario(id);
  return leerEconomia()[id].inventario || {};
}

function agregarItem(id, itemKey) {
  const economia = leerEconomia();
  asegurarUsuario(id);
  economia[id].inventario[itemKey] =
    (economia[id].inventario[itemKey] || 0) + 1;
  guardarEconomia(economia);
}

function quitarItem(id, itemKey) {
  const economia = leerEconomia();
  asegurarUsuario(id);
  if (economia[id].inventario[itemKey]) {
    economia[id].inventario[itemKey]--;
    if (economia[id].inventario[itemKey] <= 0) {
      delete economia[id].inventario[itemKey];
    }
    guardarEconomia(economia);
    return true;
  }
  return false;
}

function setDinero(id, cantidad) {
  const economia = leerEconomia();
  asegurarUsuario(id);
  economia[id].dinero = cantidad;
  guardarEconomia(economia);
}

module.exports = {
  obtenerDinero,
  modificarDinero,
  setDinero,
  obtenerInventario,
  agregarItem,
  quitarItem,
  quitarDinero,
};
