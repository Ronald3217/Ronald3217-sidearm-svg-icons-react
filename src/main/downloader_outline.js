const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

// Array de URLs
const urls = [
  "https://icons.dev.sidearmdev.com/main-icons/icons/icon-activity/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-arrow-down/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-arrow-down-circle/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-arrow-left/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-arrow-left-circle/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-arrow-right/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-arrow-right-circle/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-arrow-up/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-arrow-up-circle/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-audio/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-award/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-boxscore/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-calendar/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-camera/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-carat-down/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-carat-left/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-carat-right/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-carat-up/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-cart/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-cart-added/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-cart-subtracted/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-chevron-down/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-chevron-down-skip/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-chevron-left/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-chevron-left-skip/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-chevron-right/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-chevron-right-skip/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-chevron-up/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-chevron-up-skip/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-close/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-close-circle/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-clouds/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-coffee/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-comment/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-comparison/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-complete/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-copy/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-credit-card/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-cursor/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-desktop/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-directions/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-disabled/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-dollar/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-donate/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-download/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-drivesummary/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-edit/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-email/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-expand/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-fast-forward/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-figma/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-file/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-file-upload/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-filter/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-filter-sort/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-grid-view/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-headphones/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-hearing/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-heart/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-help/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-hide/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-home/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-info/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-insecure/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-launch/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-layout/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-link/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-list/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-location/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-locked/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-maximize/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-megaphone/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-menu/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-menu-left/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-menu-right/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-mic/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-minimize/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-minus/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-minus-circle/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-mobile/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-more-horizontal/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-more-vertical/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-move/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-music/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-mute/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-news/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-no-volume/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-notification/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-notification-off/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-pause/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-phone/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-photo/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-play/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-play-by-play/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-plus/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-plus-circle/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-podcast/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-print/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-rain/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-recap/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-refresh/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-repeat/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-rewind/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-rss/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-school/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-search/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-secure/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-send/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-settings/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-share/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-shop/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-shotchart/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-show/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-shrink/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-shuffle/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-sidearm/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-single-view/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-skip-backward/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-skip-forward/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-smile/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-sms/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-snow/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-social/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-splitbox/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-standings/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-star/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-stats/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-storm/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-sun/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-table-view/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-tablet/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-tag/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-text/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-tickets/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-time/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-timeline/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-trash/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-trending-down/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-trending-up/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-trophy/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-tv/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-unlocked/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-upload/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-user/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-users/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-video/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-volume-1/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-volume-2/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-warning/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-zoom-in/index.html",
"https://icons.dev.sidearmdev.com/main-icons/icons/icon-zoom-out/index.html",
];

// Definir la carpeta donde se guardarán los SVG
const outputFolder = path.join(__dirname, 'outline');

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
