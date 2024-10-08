const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

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

// Definir la carpeta donde se guardarán los SVG
const outputFolder = path.join(__dirname, 'solid');

// Crear la carpeta si no existe
if (!fs.existsSync(outputFolder)) {
    fs.mkdirSync(outputFolder);
}

(async () => {
  // Inicializa Puppeteer
  const browser = await puppeteer.launch();

  for (const url of urls) {
    const page = await browser.newPage();

    try {
      // Navega a la página de la URL actual
      await page.goto(url, { waitUntil: 'networkidle2' });

      // Espera a que el selector del título esté disponible
      await page.waitForSelector('h1');

      // Extrae el contenido del h1 como título del archivo
      const title = await page.$eval('h1', element => element.textContent.trim());

      // Extrae el contenido del último .language-html (donde está el SVG)
      let svgContent = await page.evaluate(() => {
        const elements = document.querySelectorAll('.language-html');
        return elements[elements.length - 1].textContent;
      });

      // Reemplaza width="16" height="16" por width="100%" height="100%"
      svgContent = svgContent.replace('width="16" height="16"', 'width="100%" height="100%"');

      // Ruta completa del archivo SVG a guardar en la carpeta
      const filePath = path.join(outputFolder, `${title}.svg`);
        
      // Guarda el SVG modificado en un archivo con el nombre del título
      // Guardar el SVG modificado en la subcarpeta
      fs.writeFileSync(filePath, svgContent, 'utf8');

      console.log(`Archivo guardado: ${title}.svg`);
      
      // Cierra la página para evitar el consumo de demasiada memoria
      await page.close();

    } catch (error) {
      console.error(`Error al procesar la URL: ${url} - Error: ${error.message}`);
    }
  }

  // Cierra el navegador una vez terminado el bucle
  await browser.close();
})();
