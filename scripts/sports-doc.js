import puppeteer from 'puppeteer';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Obtener el directorio actual del script
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Array de URLs
const urls = [
  "https://icons.dev.sidearmdev.com/sport-icons/icons/icon-sport-all-sports/index.html",
"https://icons.dev.sidearmdev.com/sport-icons/icons/icon-sport-alpine/index.html",
"https://icons.dev.sidearmdev.com/sport-icons/icons/icon-sport-badminton/index.html",
"https://icons.dev.sidearmdev.com/sport-icons/icons/icon-sport-baseball/index.html",
"https://icons.dev.sidearmdev.com/sport-icons/icons/icon-sport-basketball/index.html",
"https://icons.dev.sidearmdev.com/sport-icons/icons/icon-sport-bowling/index.html",
"https://icons.dev.sidearmdev.com/sport-icons/icons/icon-sport-cheer/index.html",
"https://icons.dev.sidearmdev.com/sport-icons/icons/icon-sport-crew/index.html",
"https://icons.dev.sidearmdev.com/sport-icons/icons/icon-sport-cricket/index.html",
"https://icons.dev.sidearmdev.com/sport-icons/icons/icon-sport-cross-country/index.html",
"https://icons.dev.sidearmdev.com/sport-icons/icons/icon-sport-curling/index.html",
"https://icons.dev.sidearmdev.com/sport-icons/icons/icon-sport-cycling/index.html",
"https://icons.dev.sidearmdev.com/sport-icons/icons/icon-sport-dance/index.html",
"https://icons.dev.sidearmdev.com/sport-icons/icons/icon-sport-e-sports/index.html",
"https://icons.dev.sidearmdev.com/sport-icons/icons/icon-sport-equestrian/index.html",
"https://icons.dev.sidearmdev.com/sport-icons/icons/icon-sport-fastpitch/index.html",
"https://icons.dev.sidearmdev.com/sport-icons/icons/icon-sport-fencing/index.html",
"https://icons.dev.sidearmdev.com/sport-icons/icons/icon-sport-field-hockey/index.html",
"https://icons.dev.sidearmdev.com/sport-icons/icons/icon-sport-figure-skate/index.html",
"https://icons.dev.sidearmdev.com/sport-icons/icons/icon-sport-flag-football/index.html",
"https://icons.dev.sidearmdev.com/sport-icons/icons/icon-sport-football/index.html",
"https://icons.dev.sidearmdev.com/sport-icons/icons/icon-sport-golf/index.html",
"https://icons.dev.sidearmdev.com/sport-icons/icons/icon-sport-gymnastics/index.html",
"https://icons.dev.sidearmdev.com/sport-icons/icons/icon-sport-hockey/index.html",
"https://icons.dev.sidearmdev.com/sport-icons/icons/icon-sport-lacrosse/index.html",
"https://icons.dev.sidearmdev.com/sport-icons/icons/icon-sport-mountain-biking/index.html",
"https://icons.dev.sidearmdev.com/sport-icons/icons/icon-sport-nordic/index.html",
"https://icons.dev.sidearmdev.com/sport-icons/icons/icon-sport-polo/index.html",
"https://icons.dev.sidearmdev.com/sport-icons/icons/icon-sport-quidditch/index.html",
"https://icons.dev.sidearmdev.com/sport-icons/icons/icon-sport-rifle/index.html",
"https://icons.dev.sidearmdev.com/sport-icons/icons/icon-sport-rodeo/index.html",
"https://icons.dev.sidearmdev.com/sport-icons/icons/icon-sport-rowing/index.html",
"https://icons.dev.sidearmdev.com/sport-icons/icons/icon-sport-rugby/index.html",
"https://icons.dev.sidearmdev.com/sport-icons/icons/icon-sport-saac/index.html",
"https://icons.dev.sidearmdev.com/sport-icons/icons/icon-sport-sailing/index.html",
"https://icons.dev.sidearmdev.com/sport-icons/icons/icon-sport-soccer/index.html",
"https://icons.dev.sidearmdev.com/sport-icons/icons/icon-sport-softball/index.html",
"https://icons.dev.sidearmdev.com/sport-icons/icons/icon-sport-squash/index.html",
"https://icons.dev.sidearmdev.com/sport-icons/icons/icon-sport-swim/index.html",
"https://icons.dev.sidearmdev.com/sport-icons/icons/icon-sport-swimming/index.html",
"https://icons.dev.sidearmdev.com/sport-icons/icons/icon-sport-sync-skate/index.html",
"https://icons.dev.sidearmdev.com/sport-icons/icons/icon-sport-sync-swim/index.html",
"https://icons.dev.sidearmdev.com/sport-icons/icons/icon-sport-table-tennis/index.html",
"https://icons.dev.sidearmdev.com/sport-icons/icons/icon-sport-tennis/index.html",
"https://icons.dev.sidearmdev.com/sport-icons/icons/icon-sport-tennis-1/index.html",
"https://icons.dev.sidearmdev.com/sport-icons/icons/icon-sport-track/index.html",
"https://icons.dev.sidearmdev.com/sport-icons/icons/icon-sport-triathalon/index.html",
"https://icons.dev.sidearmdev.com/sport-icons/icons/icon-sport-tumbling-acrobatics/index.html",
"https://icons.dev.sidearmdev.com/sport-icons/icons/icon-sport-volleyball/index.html",
"https://icons.dev.sidearmdev.com/sport-icons/icons/icon-sport-water-polo/index.html",
"https://icons.dev.sidearmdev.com/sport-icons/icons/icon-sport-wheelchair-bball/index.html",
"https://icons.dev.sidearmdev.com/sport-icons/icons/icon-sport-womens-gymnastics/index.html",
"https://icons.dev.sidearmdev.com/sport-icons/icons/icon-sport-wrestling/index.html",
];

// Definir la carpeta raíz para guardar la documentación
const docsFolder = path.join(__dirname, 'docs');

// Crear la carpeta raíz si no existe
await fs.mkdir(docsFolder, { recursive: true });

// Función para descargar y guardar el HTML
const downloadAndSaveHtml = async (url) => {
  // Iniciar Puppeteer en modo headless
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  try {
    // Navegar a la URL
    await page.goto(url, { waitUntil: 'networkidle2' });

    // Obtener el contenido HTML de la página
    const htmlContent = await page.content();

    // Crear la estructura de carpetas, pero sin incluir "index.html" en las carpetas
    const folderPath = path.join(docsFolder, new URL(url).pathname.replace('index.html', ''));
    await fs.mkdir(folderPath, { recursive: true });

    // Guardar el archivo index.html en la carpeta correspondiente
    const htmlFilePath = path.join(folderPath, 'index.html');
    await fs.writeFile(htmlFilePath, htmlContent, 'utf8');
    console.log(`HTML guardado: ${htmlFilePath}`);

  } catch (error) {
    console.error(`Error al procesar la URL: ${url}`, error);
  } finally {
    await browser.close();
  }
};

// Función principal para procesar todas las URLs
const scrapeAllDocs = async () => {
  for (const url of urls) {
    await downloadAndSaveHtml(url);
  }
};

// Ejecutar la función principal
scrapeAllDocs();