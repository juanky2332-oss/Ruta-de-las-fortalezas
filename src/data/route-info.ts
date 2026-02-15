export const ROUTE_DATA = {
  year: 2026,
  date: "18 de Abril de 2026",
  distanceKm: 52.30,
  elevationGain: 1346,
  elevationLoss: 1292,
  timeLimit: "12 horas",
  startTime: "08:00h",
  metaTime: "20:00h",
  // Hitos Oficiales (Wikiloc: Opción 2 Bis Minarete)
  checkpoints: [
    { id: 1, name: "Salida (Puerto)", km: 0, altitude: 2, type: "start" },
    { id: 2, name: "Santiago Apóstol", km: 1.7, altitude: 10, type: "checkpoint" },
    { id: 3, name: "Ermita del Calvario", km: 5.8, altitude: 220, type: "peak" },
    { id: 4, name: "Batería Gral. Ordóñez", km: 10.9, altitude: 250, type: "fortress" },
    { id: 5, name: "Cala Cortina", km: 14.7, altitude: 5, type: "checkpoint" },
    { id: 6, name: "Batería San Leandro", km: 15.8, altitude: 40, type: "fortress" },
    { id: 7, name: "Muralla Púnica", km: 28.3, altitude: 20, type: "checkpoint" },
    { id: 8, name: "Cerro de la Concepción", km: 29.8, altitude: 70, type: "peak" },
    { id: 9, name: "Parque Arqueológico Molinete", km: 30.9, altitude: 30, type: "checkpoint" },
    { id: 10, name: "Mirador del Cariño", km: 35.9, altitude: 150, type: "checkpoint" },
    { id: 11, name: "Batería San Fulgencio", km: 37.2, altitude: 100, type: "fortress" },
    { id: 12, name: "Castillo de Galeras", km: 40.7, altitude: 220, type: "fortress" },
    { id: 13, name: "Cueva Pelayo", km: 46.3, altitude: 100, type: "checkpoint" },
    { id: 14, name: "Castillo de la Atalaya", km: 49.4, altitude: 240, type: "peak" },
    { id: 15, name: "Meta (Escuela Infantería)", km: 52.3, altitude: 10, type: "finish" }
  ],
  elevationProfile: [
    { km: 0, alt: 2 },
    { km: 1.7, alt: 10 },
    { km: 5.8, alt: 220 }, // Calvario
    { km: 8, alt: 150 },
    { km: 10.9, alt: 276 }, // Ordóñez
    { km: 14.7, alt: 5 }, // Cala Cortina
    { km: 15.8, alt: 40 }, // San Leandro
    { km: 22, alt: 100 }, // Sierra Gorda (paso)
    { km: 28.3, alt: 20 }, // Muralla
    { km: 29.8, alt: 70 }, // Concepción
    { km: 30.9, alt: 30 }, // Molinete
    { km: 35.9, alt: 150 }, // Mirador Cariño
    { km: 37.2, alt: 100 }, // San Fulgencio
    { km: 40.7, alt: 220 }, // Galeras
    { km: 46.3, alt: 100 }, // Cueva Pelayo
    { km: 49.4, alt: 240 }, // Atalaya
    { km: 52.3, alt: 10 } // Meta
  ],
  aidStations: [
    { km: 7.9, type: "solido_liquido", name: "AV 1 - Lo Campano" },
    { km: 14.7, type: "liquido", name: "AV 2 - Cala Cortina" },
    { km: 19, type: "liquido", name: "PH 1 - Palomar" },
    { km: 20.2, type: "solido_liquido", name: "AV 3 - V. Alegre" },
    { km: 23.8, type: "liquido", name: "PH 2 - Gasolinera" },
    { km: 27.8, type: "solido_liquido", name: "AV 4 - P. San Francisco" },
    { km: 32.2, type: "solido_liquido", name: "AV 5 - Fajardo" },
    { km: 38, type: "liquido", name: "PH 3 - Galeras" },
    { km: 41.6, type: "solido_liquido", name: "AV 6 - Navantia" },
    { km: 48.5, type: "liquido", name: "AV 7 - Villalba" }
  ],
  routeAnalysis: {
    totalFlat: 15.00,
    totalUp: 24.30,
    totalDown: 13.00,
    segments: [
      { kmStart: 0, kmEnd: 1.7, type: "llano", description: "Salida -> Santiago Apóstol" },
      { kmStart: 1.7, kmEnd: 5.8, type: "subida", description: "Santiago -> Calvario" },
      { kmStart: 5.8, kmEnd: 10.9, type: "mixto", description: "Calvario -> Batería Ordóñez" },
      { kmStart: 10.9, kmEnd: 14.7, type: "bajada", description: "Ordóñez -> Cala Cortina" },
      { kmStart: 14.7, kmEnd: 15.8, type: "subida", description: "Cala Cortina -> San Leandro" },
      { kmStart: 15.8, kmEnd: 28.3, type: "mixto", description: "San Leandro -> Muralla Púnica" },
      { kmStart: 28.3, kmEnd: 29.8, type: "subida", description: "Muralla -> Castillo Concepción" },
      { kmStart: 29.8, kmEnd: 30.9, type: "bajada", description: "Concepción -> Molinete" },
      { kmStart: 30.9, kmEnd: 35.9, type: "mixto", description: "Molinete -> Mirador del Cariño" },
      { kmStart: 35.9, kmEnd: 37.2, type: "llano", description: "Mirador -> San Fulgencio" },
      { kmStart: 37.2, kmEnd: 40.7, type: "subida", description: "San Fulgencio -> Cast. Galeras" },
      { kmStart: 40.7, kmEnd: 46.3, type: "bajada", description: "Galeras -> Cueva Pelayo" },
      { kmStart: 46.3, kmEnd: 49.4, type: "subida", description: "Cueva Pelayo -> Atalaya (FINAL)" },
      { kmStart: 49.4, kmEnd: 52.3, type: "bajada", description: "Atalaya -> Meta" }
    ]
  }
};

