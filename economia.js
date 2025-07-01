const mongoose = require("mongoose");
const Economia = require("./models/eeconomia.js");

// Asegura que el usuario existe en la base de datos
async function asegurarUsuario(userId) {
  let user = await Economia.findOne({ userId });
  if (!user) {
    user = new Economia({ userId });
    await user.save();
  }
  return user;
}

// Obtener todos los usuarios (para leaderboard, etc.)
async function obtenerTodos() {
  const usuarios = await Economia.find({});
  return usuarios.map(u => ({
    id: u.userId,
    dinero: u.dinero,
    inventario: Object.fromEntries(u.inventario || []),
  }));
}

// Obtener dinero de un usuario
async function obtenerDinero(userId) {
  const user = await asegurarUsuario(userId);
  return user.dinero;
}

// Modificar dinero (puede sumar o restar)
async function modificarDinero(userId, cantidad) {
  const user = await asegurarUsuario(userId);
  user.dinero += cantidad;
  await user.save();
}

// Quitar dinero (es lo mismo que modificar con negativo)
async function quitarDinero(userId, cantidad) {
  await modificarDinero(userId, -cantidad);
}

// Setear dinero directamente
async function setDinero(userId, cantidad) {
  const user = await asegurarUsuario(userId);
  user.dinero = cantidad;
  await user.save();
}

// Obtener inventario (como objeto plano)
async function obtenerInventario(userId) {
  const user = await asegurarUsuario(userId);
  return Object.fromEntries(user.inventario || []);
}

// Agregar item al inventario
async function agregarItem(userId, itemKey) {
  const user = await asegurarUsuario(userId);
  const actual = user.inventario.get(itemKey) || 0;
  user.inventario.set(itemKey, actual + 1);
  await user.save();
}

// Quitar item del inventario
async function quitarItem(userId, itemKey) {
  const user = await asegurarUsuario(userId);
  const actual = user.inventario.get(itemKey) || 0;
  if (actual > 0) {
    if (actual === 1) {
      user.inventario.delete(itemKey);
    } else {
      user.inventario.set(itemKey, actual - 1);
    }
    await user.save();
    return true;
  }
  return false;
}

// Conectar a MongoDB
async function conectarDB(uri) {
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("✅ Conectado a MongoDB");
}

module.exports = {
  obtenerDinero,
  modificarDinero,
  setDinero,
  obtenerInventario,
  agregarItem,
  quitarItem,
  quitarDinero,
  obtenerTodos,
  conectarDB,
};

