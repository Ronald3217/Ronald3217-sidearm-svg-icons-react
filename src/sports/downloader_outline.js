const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

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

// Definir la carpeta donde se guardarán los SVG
const outputFolder = path.join(__dirname, 'sports_outline');

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

      // Reemplazar fill por  fill, stroke y stroke-width
      svgContent = svgContent.replace('fill="currentColor"','fill="white" stroke="black" stroke-width=".25"')

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
