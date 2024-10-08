import puppeteer from 'puppeteer';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Obtener el directorio actual del script
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Array de URLs
const urls = [
  "https://icons.dev.sidearmdev.com/social-icons/icons/icon-social-apple/index.html",
"https://icons.dev.sidearmdev.com/social-icons/icons/icon-social-cameo/index.html",
"https://icons.dev.sidearmdev.com/social-icons/icons/icon-social-ear-it/index.html",
"https://icons.dev.sidearmdev.com/social-icons/icons/icon-social-facebook/index.html",
"https://icons.dev.sidearmdev.com/social-icons/icons/icon-social-facebook-like/index.html",
"https://icons.dev.sidearmdev.com/social-icons/icons/icon-social-flickr/index.html",
"https://icons.dev.sidearmdev.com/social-icons/icons/icon-social-google/index.html",
"https://icons.dev.sidearmdev.com/social-icons/icons/icon-social-inflcr/index.html",
"https://icons.dev.sidearmdev.com/social-icons/icons/icon-social-instagram/index.html",
"https://icons.dev.sidearmdev.com/social-icons/icons/icon-social-linkedin/index.html",
"https://icons.dev.sidearmdev.com/social-icons/icons/icon-social-opendorse/index.html",
"https://icons.dev.sidearmdev.com/social-icons/icons/icon-social-pinterest/index.html",
"https://icons.dev.sidearmdev.com/social-icons/icons/icon-social-snapchat/index.html",
"https://icons.dev.sidearmdev.com/social-icons/icons/icon-social-tiktok/index.html",
"https://icons.dev.sidearmdev.com/social-icons/icons/icon-social-twitch/index.html",
"https://icons.dev.sidearmdev.com/social-icons/icons/icon-social-twitter/index.html",
"https://icons.dev.sidearmdev.com/social-icons/icons/icon-social-twitter-like/index.html",
"https://icons.dev.sidearmdev.com/social-icons/icons/icon-social-twitter-message/index.html",
"https://icons.dev.sidearmdev.com/social-icons/icons/icon-social-twitter-reply/index.html",
"https://icons.dev.sidearmdev.com/social-icons/icons/icon-social-twitter-retweet/index.html",
"https://icons.dev.sidearmdev.com/social-icons/icons/icon-social-vimeo/index.html",
"https://icons.dev.sidearmdev.com/social-icons/icons/icon-social-wordpress/index.html",
"https://icons.dev.sidearmdev.com/social-icons/icons/icon-social-youtube/index.html",
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