let startIndex = 0;
const perrosPorPagina = 12;
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');

async function traerPerritos() {
    try {
        const data = await fetch(`https://dog.ceo/api/breeds/list/all`);
        const { message: razas } = await data.json();
        const razasArray = Object.keys(razas);

        const mostrarRazas = async () => {
            const api_container = document.querySelector("#api");
            api_container.innerHTML = ''; // Limpiamos el contenedor antes de mostrar nuevas razas

            for (let i = startIndex; i < startIndex + perrosPorPagina && i < razasArray.length; i++) {
                const raza = razasArray[i];

                const div_main = document.createElement("div");
                div_main.classList.add('text-center');

                const img = document.createElement("img");
                img.alt = raza;
                img.classList.add('h-24', 'max-h-28', 'w-full', 'object-cover', 'mx-auto');

                // Cargar la imagen utilizando fetch y await
                try {
                    const imgData = await fetch(`https://dog.ceo/api/breed/${raza}/images/random`);
                    const imageDog = await imgData.json();
                    img.src = imageDog.message;
                } catch (error) {
                    console.error('Error al cargar la imagen:', error);
                }

                const h1 = document.createElement("h1");
                h1.textContent = raza;
                h1.classList.add('text-lg', 'font-semibold', 'mb-2');

                div_main.appendChild(img);
                div_main.appendChild(h1);
                api_container.appendChild(div_main);
            }

            // Actualizar estado de los botones de navegación
            prevButton.disabled = startIndex === 0;
            nextButton.disabled = startIndex + perrosPorPagina >= razasArray.length;
        };

        mostrarRazas();

        // Event listener para el botón Anterior
        prevButton.addEventListener('click', () => {
            if (startIndex > 0) {
                startIndex -= perrosPorPagina;
                mostrarRazas();
            }
        });

        // Event listener para el botón Siguiente
        nextButton.addEventListener('click', () => {
            if (startIndex + perrosPorPagina < razasArray.length) {
                startIndex += perrosPorPagina;
                mostrarRazas();
            }
        });

    } catch (error) {
        console.error('Error al obtener datos de perros:', error);
    }
}

function search() {
    const input = document.getElementById("searchInput").value.toLowerCase();
    const divs = document.querySelectorAll("#api > div"); 

    divs.forEach(div => {
        const raza = div.querySelector("h1").innerText.toLowerCase(); 
        if (raza.includes(input) || input === "") { 
            div.style.display = "block"; 
        } else {
            div.style.display = "none";
        }
    });
}

document.getElementById("searchInput").addEventListener("input", search);

document.addEventListener('DOMContentLoaded', traerPerritos);
