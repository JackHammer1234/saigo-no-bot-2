module.exports = {
  name: "hardcore",
  description: "Crea un personaje HARDCORE aleatorio",
  async execute(message, args) {
    // ----------------------------------------
    // RNG helpers
    // ----------------------------------------
    const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];
    const randInt = (min, max) =>
      Math.floor(Math.random() * (max - min + 1)) + min;

    // ----------------------------------------
    // Aldeas
    // ----------------------------------------
    const aldeas = [
      "Hoja",
      "Nube",
      "Roca",
      "Sonido",
      "Remolino",
      "Arena",
      "Niebla",
      "País del Hierro",
      "Lluvia",
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

    if (clanes[aldea] === "ANY") {
      // Combina absolutamente todos los clanes
      const allClans = Object.values(clanes)
        .filter(x => Array.isArray(x))
        .flat();

      clan = rand(allClans);
    }
    else if (clanes[aldea] === "OTSUTSUKI") {
      // Chance mínima 1% de Otsutsuki
      const roll = Math.random() * 100; 
      clan = roll <= 1 ? "Otsutsuki" : "Desconocido";
    }
    else {
      clan = rand(clanes[aldea]);
    }

    // ----------------------------------------
    // Elementos (1 a 3)
    // ----------------------------------------
    const elementosPool = ["Fuego", "Rayo", "Trueno", "Tierra", "Agua"];
    const numElementos = rand([1, 2, 3]);

    let elementos = [];
    while (elementos.length < numElementos) {
      const el = rand(elementosPool);
      if (!elementos.includes(el)) elementos.push(el);
    }

    // ----------------------------------------
    // Beneficios
    // ----------------------------------------
    const ryo = randInt(500, 3000);
    const rp = randInt(3, 15);
    const rango = rand(["Estudiante", "Genin"]);
    const bonus = rand([1, 2]);

    // ----------------------------------------
    // Genkai Bonus
    // ----------------------------------------
    let genkaiMsg = "";
    if (numElementos === 3 && clan === "Desconocido") {
      genkaiMsg = "\n**Bonus:** Obtienes *dos* Kekkei Genkai elementales.";
    }

    // ----------------------------------------
    // Output
    // ----------------------------------------
    message.reply(
      `🎲 **PERSONAJE HARDCORE GENERADO** 🎲\n\n` +
      `**Aldea:** ${aldea}\n` +
      `**Clan:** ${clan}\n` +
      `**Elementos:** ${elementos.join(", ")}\n\n` +
      `**Ryo Inicial:** ${ryo}\n` +
      `**RP Inicial:** ${rp}\n` +
      `**Rango Inicial:** ${rango}\n` +
      `**Bonus en evaluaciones:** +${bonus}\n` +
      `${genkaiMsg}`
    );
  },
};
