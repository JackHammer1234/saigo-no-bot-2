const mongoose = require("mongoose");
const Economia = require("./models/eeconomia.js");

// ID del rol con permiso de administrador
const ROL_ADMIN_ID = "1389445186836234281";

// Verifica si el solicitante tiene el rol admin
function esAdmin(roles) {
  return Array.isArray(roles) && roles.includes(ROL_ADMIN_ID);
}

// Función para asegurar que el usuario existe en la base de datos
async function asegurarUsuario(userId) {
  let user = await Economia.findOne({ userId });
  if (!user) {
    user = new Economia({ userId });
    await user.save();
  }
  return user;
}

// Obtener todos los usuarios (para leaderboard, etc)
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

// Modificar dinero (requiere permisos)
async function modificarDinero(userId, cantidad, rolesDelSolicitante) {
  if (!esAdmin(rolesDelSolicitante)) {
    throw new Error("❌ No tienes permisos para modificar dinero.");
  }
  const user = await asegurarUsuario(userId);
  user.dinero += cantidad;
  await user.save();
}

// Quitar dinero (requiere permisos)
async function quitarDinero(userId, cantidad, rolesDelSolicitante) {
  await modificarDinero(userId, -cantidad, rolesDelSolicitante);
}

// Setear dinero directamente (requiere permisos)
async function setDinero(userId, cantidad, rolesDelSolicitante) {
  if (!esAdmin(rolesDelSolicitante)) {
    throw new Error("❌ No tienes permisos para setear dinero.");
  }
  const user = await asegurarUsuario(userId);
  user.dinero = cantidad;
  await user.save();
}

// Obtener inventario
async function obtenerInventario(userId) {
  const user = await asegurarUsuario(userId);
  return Object.fromEntries(user.inventario || []);
}

// Agregar item (no requiere permisos)
async function agregarItem(userId, itemKey) {
  const user = await asegurarUsuario(userId);
  const actual = user.inventario.get(itemKey) || 0;
  user.inventario.set(itemKey, actual + 1);
  await user.save();
}

// Quitar item (requiere permisos)
async function quitarItem(userId, itemKey, rolesDelSolicitante) {
  if (!esAdmin(rolesDelSolicitante)) {
    throw new Error("❌ No tienes permisos para quitar items.");
  }
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
