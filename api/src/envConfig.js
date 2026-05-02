import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

// Reconstrucción de __filename y __dirname en ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Resolución explícita del path al .env
const envPath = path.resolve(__dirname, "../.env");

// Validación de existencia del archivo
if (!fs.existsSync(envPath)) {
  console.error(`❌ No se encuentra el archivo .env en esta ruta: ${envPath}`);
  process.exit(1); // Falla controlada (fail-fast)
}

// Carga de variables de entorno
const result = dotenv.config({ path: envPath });

// Validación de carga correcta
if (result.error) {
  console.error("❌ Error al cargar las variables de entorno:", result.error);
  process.exit(1);
}

// Logging solo en desarrollo
if (process.env.NODE_ENV !== "production") {
  console.log(`✅ Variables de entorno cargadas desde: ${envPath}`);
}