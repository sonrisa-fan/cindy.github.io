let selectedCount = 0;
let tolerance = null;
let colors = [];
let resistanceString;

function addColor(colorName, colorClass, colorValue) {
    if(tolerance!== null)
    {
        alert("No se puede seleccionar una banda, ya hay tolerancia.");
        return;
    }
    if (selectedCount >= 4) {
        alert('Solo puedes seleccionar 4 colores de banda.');
        return;
    }
    colors[selectedCount] = colorValue;
    updateResistance();

    if(selectedCount >0)
    {
        const colorContainer = document.getElementById('selected-colors');
        
        // Crear el tag de la sección visual (div)
        const colorSection = document.createElement('div');
        colorSection.className = `${colorClass} m-1`;
        // Agregar la sección al contenedor
        colorContainer.appendChild(colorSection);
    }
    const colorContainer = document.getElementById('selected-colors');
    const colorTag = document.createElement('span');
    colorTag.className = `${colorClass} m-1`;
    colorTag.textContent = colorName;
    colorContainer.appendChild(colorTag);
    selectedCount++;
}

function addTolerance(colorName, colorClass, toleranceValue) {
    if(selectedCount<3){
        alert('Antes de seleccionar una tolerancia necesitas establecer al menos tres colores de banda.');
        return;
    }
    if (tolerance !== null) {
        alert('Solo puedes seleccionar un color de tolerancia.');
        return;
    }
    tolerance = toleranceValue;
    updateResistance();

    const toleranceContainer = document.getElementById('selected-colors');
    const toleranceTag = document.createElement('span');
    toleranceTag.className = `${colorClass} m-1`;
    toleranceTag.textContent = colorName;
    toleranceContainer.appendChild(toleranceTag);
}


function updateResistance() {
    if (selectedCount < 3 ||    tolerance === null) {
        document.getElementById('resistance-value').textContent = '0 Ω';
        document.getElementById('tolerance-value').textContent = 'N/A';
        return;
    }

    let resistanceValue; // Asegúrate de definir la variable fuera de los condicionales
    let significantValue;
    // Cálculo de la resistencia
    if(selectedCount === 3)
    {
        //se rescata el valor de las bandas 
        significantValue = (colors[0] * 10 + colors[1]);
        //Multiplica el valor de las bandas (color multiplicador) 10 elevado a la número del color.
        resistanceValue = significantValue * Math.pow(10, colors[2]);
    }else if(selectedCount ===4){
        //se rescata el valor de las bandas 
        significantValue = (colors[0] * 100 + colors[1]*10 + colors[2]);
        //Multiplica el valor de las bandas (color multiplicador) 10 elevado a la número del color.
        resistanceValue = significantValue * Math.pow(10, colors[3]);
    }
    console.log(resistanceValue); // Verifica el valor de resistanceValue
    //if(tolerance!=null){
    //tambien pudo haber sido un millón
    console.log(resistanceValue); // Verificar el valor de resistanceValue
    if (resistanceValue >= 1e6) {
        resistanceString = `${(resistanceValue / 1e6).toLocaleString()} MΩ`;
        //o 1000 como 1e3
    } else if (resistanceValue >= 1000) {
        resistanceString = `${(resistanceValue / 1000).toLocaleString()} kΩ`;
    } else {
        resistanceString = `${resistanceValue.toLocaleString()} Ω`;
    }

    document.getElementById('resistance-value').textContent = resistanceString;
    document.getElementById('tolerance-value').textContent = `±${tolerance}%`;
//}
}

function removeLastColor() {
    const colorContainer = document.getElementById('selected-colors');

    // Eliminar el último elemento visual del contenedor
    if (colorContainer.lastChild) {
        colorContainer.removeChild(colorContainer.lastChild);

        // Verificar si el último elemento fue un color de tolerancia
        if (tolerance !== null && selectedCount >= 3) {
            tolerance = null;
            document.getElementById('tolerance-value').textContent = "N/A";
        } else if (selectedCount > 0) {
            // Si es un color principal, reducir el contador de colores
            selectedCount--;
            colors[selectedCount] = null;
        }
    }

    // Reiniciar completamente si ya no hay colores seleccionados
    if (colorContainer.childElementCount === 0) {
        colors = [];
        selectedCount = 0;
        tolerance = null;
        document.getElementById('tolerance-value').textContent = "N/A";
        document.getElementById('resistance-value').textContent = "0 Ω";
    }

    updateResistance(); // Actualizar el cálculo de resistencia
}
