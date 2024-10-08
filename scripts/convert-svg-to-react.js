import { transform } from '@svgr/core';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Obtener __dirname en ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const srcDir = path.join(__dirname, '../src');
const outputDir = path.join(__dirname, '../dist');

// Convierte todos los archivos SVG en componentes React de manera recursiva
function convertSvgToReact() {
  processDirectory(srcDir, outputDir);
}

// Procesa una carpeta y todos sus subdirectorios
function processDirectory(currentDir, outputFolder) {
  fs.readdirSync(currentDir).forEach((entry) => {
    const entryPath = path.join(currentDir, entry);
    const entryOutputFolder = path.join(outputFolder, entry);

    if (fs.lstatSync(entryPath).isDirectory()) {
      // Si es una carpeta, crea la carpeta correspondiente en el output y recorre su contenido
      if (!fs.existsSync(entryOutputFolder)) {
        fs.mkdirSync(entryOutputFolder, { recursive: true });
      }
      processDirectory(entryPath, entryOutputFolder); // Llama a esta función de manera recursiva
      generateIndexFile(entryOutputFolder); // Genera el index.js para cada carpeta
      generateTypesFile(entryOutputFolder); // Genera el archivo de tipos para cada carpeta
    } else if (path.extname(entryPath) === '.svg') {
      // Si es un archivo SVG, lo transforma a componente React
      const svgCode = fs.readFileSync(entryPath, 'utf8');

      transform(
        svgCode,
        {
          plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx', '@svgr/plugin-prettier'],
          icon: true,
          ref: false,
          typescript: false, // Cambiar a `true` si usas TypeScript
          jsxRuntime: "classic",
          expandProps: "end", // Asegura que las props estén expandidas en el componente
          exportType: "default", // Exporta como componente funcional por defecto
          prettier: true, // Puedes desactivar Prettier si no lo necesitas
          svgo: false // Opcional: desactivar optimización de SVG si tienes problemas con la salida
        },
        { componentName: toPascalCase(entry) }
      ).then((reactComponentCode) => {
        const outputFilePath = path.join(outputFolder, entry.replace('.svg', '.jsx'));
        fs.writeFileSync(outputFilePath, reactComponentCode);
      });
    }
  });
}

// Helper function para convertir el nombre del archivo a PascalCase
function toPascalCase(filename) {
  return filename
    .replace(/\.svg$/, '')
    .replace(/(^\w|-\w)/g, (match) => match.replace('-', '').toUpperCase());
}

// Genera el archivo index.jsx que exporta todos los componentes
function generateIndexFile(outputFolder) {
  const files = fs.readdirSync(outputFolder)
    .filter(file => file !== 'index.jsx' && file.endsWith('.jsx')) // Filtramos solo los archivos .js generados
    .map(file => {
      const componentName = toPascalCase(file.replace('.jsx', '')); // Quitar extensión .jsx para el nombre del componente
      console.log(componentName);

      const importPath = file.replace('.jsx', ''); // Quitar extensión .jsx para la ruta de importación
      return `export { default as ${componentName} } from './${importPath}';`;
    });

  const indexFilePath = path.join(outputFolder, 'index.jsx');
  fs.writeFileSync(indexFilePath, files.join('\n')); // Escribimos las exportaciones en index.js
}

// Genera el archivo de tipos .d.ts que declara todos los componentes
function generateTypesFile(outputFolder) {
  const files = fs.readdirSync(outputFolder)
    .filter(file => file !== 'index.jsx' && file.endsWith('.jsx')) // Filtramos solo los archivos .jsx generados
    .map(file => {
      const componentName = toPascalCase(file.replace('.jsx', '')); // Quitar extensión .jsx para el nombre del componente
      console.log(componentName);
      return `export const ${componentName}: React.FC<React.SVGProps<SVGSVGElement>>;`;
    });

  const typesFilePath = path.join(outputFolder, 'index.d.ts');
  fs.writeFileSync(typesFilePath, files.join('\n')); // Escribimos las declaraciones de tipo en index.d.ts
}

convertSvgToReact();
