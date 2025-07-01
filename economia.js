const mongoose = require("mongoose");

const Economia = require("./models/eeconomia.js"); // Si `economia.js` está en raíz

// === CONFIGURACIÓN: ID del rol administrador ===
const ROL_ADMIN_ID = "1389445186836234281";

// Verifica si el usuario tiene el rol de admin
function esAdminPorRol(rolesDelSolicitante) {
  if (!Array.isArray(rolesDelSolicitante)) return false;
  return rolesDelSolicitante.includes(ROL_ADMIN_ID);
}

// Función para asegurar que el usuario existe en DB
async function asegurarUsuario(userId) {
  let user = await Economia.findOne({ userId });
  if (!user) {
    user = new Economia({ userId });
    await user.save();
  }
  return user;
}

// Obtener todos los usuarios (para leaderboard etc)
async function obtenerTodos() {
  const usuarios = await Economia.find({});
  return usuarios.map(u => ({
    id: u.userId,
    dinero: u.dinero,
    inventario: Object.fromEntries(u.inventario || []),
  }));
}

// Obtener dinero
async function obtenerDinero(userId) {
  const user = await asegurarUsuario(userId);
  return user.dinero;
}

// Modificar dinero (suma o resta)
async function modificarDinero(userId, cantidad, rolesDelSolicitante) {
  if (!esAdminPorRol(rolesDelSolicitante)) {
    throw new Error("❌ Permiso denegado: se requiere el rol de administrador.");
  }
  const user = await asegurarUsuario(userId);
  user.dinero += cantidad;
  await user.save();
}

// Quitar dinero
async function quitarDinero(userId, cantidad, rolesDelSolicitante) {
  await modificarDinero(userId, -cantidad, rolesDelSolicitante);
}

// Obtener inventario
async function obtenerInventario(userId) {
  const user = await asegurarUsuario(userId);
  return Object.fromEntries(user.inventario || []);
}

// Agregar item al inventario
async function agregarItem(userId, itemKey) {
  const user = await asegurarUsuario(userId);
  const current = user.inventario.get(itemKey) || 0;
  user.inventario.set(itemKey, current + 1);
  await user.save();
}

// Quitar item del inventario
async function quitarItem(userId, itemKey, rolesDelSolicitante) {
  if (!esAdminPorRol(rolesDelSolicitante)) {
    throw new Error("❌ Permiso denegado: se requiere el rol de administrador.");
  }
  const user = await asegurarUsuario(userId);
  const current = user.inventario.get(itemKey) || 0;
  if (current > 0) {
    if (current === 1) {
      user.inventario.delete(itemKey);
    } else {
      user.inventario.set(itemKey, current - 1);
    }
    await user.save();
    return true;
  }
  return false;
}

// Setear dinero directo
async function setDinero(userId, cantidad, rolesDelSolicitante) {
  if (!esAdminPorRol(rolesDelSolicitante)) {
    throw new Error("❌ Permiso denegado: se requiere el rol de administrador.");
  }
  const user = await asegurarUsuario(userId);
  user.dinero = cantidad;
  await user.save();
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
  esAdminPorRol,
};

