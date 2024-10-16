const getById = id => document.getElementById(id);

const getIO = () => ({
    text: getById("text").value.normalize(),
    search: getById("search").value.normalize(),
    view: getById("view")
});

const clean_string = (text) => 
    text
      .replace(/[\n\r\t]+/igm, " ")
      .replace(/[^a-zñáéíóú0-9 \.,;:()¿?¡!“”❝❞«»❛❜'‘’\-_]+/igm, "")
      .replace(/[ ]+/gm, " ");

/**
 * Convierte el texto en un array de palabras válidas.
 * @param {string} text - El texto a analizar.
 * @returns {Array} - Array de palabras extraídas del texto.
 */
const word_array = (text) => 
    clean_string(text)
      .toLowerCase()
      .split(/[\s,.!?;:()]+/)
      .filter(word => word);

// Función para contar repeticiones en un array ordenado
const repetitions = (ordered_array) => 
    ordered_array
      .reduce((acc, el, i, a) => {
        if (i === 0) acc.push({ s: el, n: 1 });
        else if (el === a[i - 1]) acc[acc.length - 1].n++;
        else acc.push({ s: el, n: 1 });
        return acc;
      }, []);

// Función para mostrar el conteo de palabras, caracteres, etc.
const count = () => {
    let { text, view } = getIO();
    
    let result = `Caracteres: ${text.length}\n`;
    result += `Palabras: ${word_array(text).length}\n`;
    result += `Frases: ${text.split(/[.!?]/).length}\n`;
    result += `Líneas: ${text.split("\n").length}\n`;

    view.innerHTML = result;
};

// Función para listar repeticiones de palabras
const word_index = () => {
    let { text, view } = getIO();
  
    let ordered_words = word_array(text).sort();
    let result = repetitions(ordered_words)
      .map(el => `${el.s}: ${el.n}`)
      .join("\n");
  
    view.innerHTML = result;
};

// Función para buscar palabras que contengan el texto de búsqueda
const search_words = () => {
    let { text, view, search } = getIO();
  
    let searched_words = word_array(text)
      .filter(word => word.includes(search.toLowerCase()))
      .sort();
      
    let result = `Hay ${searched_words.length} palabras que contienen '${search}'.\n\n`;
    result += repetitions(searched_words)
      .map(el => `${el.n} repeticiones de: ${el.s}`)
      .join("\n");
  
    view.innerHTML = result;
};
