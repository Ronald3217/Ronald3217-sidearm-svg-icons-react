const pathname = window.location.pathname;

document.querySelectorAll('div.p-3.py-4.mb-2.bg-light.text-center.rounded').forEach(element => {


    const svg = element.querySelector("svg");
    // Obtener el valor de xlink:href
    const useElement = svg.querySelector('use');
    const xlinkHref = useElement.getAttribute('xlink:href');

    if (xlinkHref) {
        // Extraer el nombre del ícono después del '#'
        const iconName = xlinkHref.split('#')[1];
        if (iconName) {
            // Crear una nueva etiqueta <img> con la ruta de la imagen
            const img = document.createElement('img');
            img.setAttribute("src", `/assets/img/${iconName}.svg`);
            img.setAttribute("width", "32px");
            img.setAttribute("height", "32px");

            // Reemplazar el <svg> con la nueva <img>
            element.replaceChild(img, svg);
        }
    }
});
