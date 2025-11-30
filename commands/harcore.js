module.exports = {
  name: "hardcore",
  description: "Crea un personaje HARDCORE totalmente aleatorio",
  async execute(message, args) {
    // ----------------------------------------
    // RNG helpers
    // ----------------------------------------
    const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];

    // ----------------------------------------
    // Aldeas (todas duplicadas excepto La Espada)
    // ----------------------------------------
    const aldeas = [
      "Hoja", "Hoja",
      "Nube", "Nube",
      "Roca", "Roca",
      "Sonido", "Sonido",
      "Remolino", "Remolino",
      "Arena", "Arena",
      "Niebla", "Niebla",
      "País del Hierro", "País del Hierro",
      "Lluvia", "Lluvia",
      "??? (La Espada)"
    ];

    const aldea = rand(aldeas);

    // ----------------------------------------
    // Clanes por aldea
    // ----------------------------------------
    const clanes = {
      "Hoja": ["Senju", "Uchiha", "Lee", "Inuzuka", "Aburame", "Hyuga"],
      "Nube": ["Hatake", "Darui", "Kamizuru", "Namikaze", "Shirogane"],
      "Roca": ["Himejima", "Haruno", "Akimichi", "Sarutobi", "Jashin"],
      "Sonido": ["Cobra", "Kurohari", "Jashin", "Kaguya", "Bakuhatsu", "Kyouon"],
      "Remolino": ["Uzumaki", "Senju", "Kashin", "Tsugikuni", "Kamado", "Tokito"],
      "Arena": ["Sabaku", "Shirogane", "Kamizuru", "Chinoike", "Yakushi"],
      "Niebla": ["Hoshigaki", "Chinoike", "Yuki", "Yamanaka", "Hozuki"],
      "País del Hierro": ["Haruno", "Nara", "Himejima", "Yamanaka", "Yakushi", "Tsugikuni", "Kamado", "Tokito"],
      "Lluvia": "ANY",
      "??? (La Espada)": "OTSUTSUKI"
    };

    let clan;

    // Lluvia → usa la pool completa
    if (clanes[aldea] === "ANY") {
      const allClans = Object.values(clanes)
        .filter(x => Array.isArray(x))
        .flat();
      clan = rand(allClans);
    }
    // La Espada → 1% chance de Otsutsuki
    else if (clanes[aldea] === "OTSUTSUKI") {
      const roll = Math.random() * 100;
      clan = roll <= 1 ? "Otsutsuki" : "Desconocido";
    }
    // Cualquier otra aldea
    else {
      clan = rand(clanes[aldea]);
    }

    // ----------------------------------------
    // Elementos (1 a 3)
    // ----------------------------------------
    const elementosPool = ["Fuego", "Rayo", "Trueno", "Tierra", "Agua"];
    const cantidadElementos = rand([1, 2, 3]);

    let elementos = [];
    while (elementos.length < cantidadElementos) {
      let e = rand(elementosPool);
      if (!elementos.includes(e)) elementos.push(e);
    }

    // ----------------------------------------
    // Bonus de Kekkei Genkai
    // ----------------------------------------
    let genkaiMsg = "";
    if (cantidadElementos === 3 && clan === "Desconocido") {
      genkaiMsg = "\n**Bonus natural:** Puedes usar *dos* Kekkei Genkai elementales.";
    }

    // ----------------------------------------
    // Respuesta
    // ----------------------------------------
    message.reply(
      `🎲 **HARDCORE** 🎲\n\n` +
      `**Aldea:** ${aldea}\n` +
      `**Clan:** ${clan}\n` +
      `**Elementos:** ${elementos.join(", ")}\n` +
      genkaiMsg
    );
  },
};
