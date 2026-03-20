function toggleTheme() {
    const body = document.body;
    const icon = document.getElementById("themeIcon");

    body.classList.toggle("light-mode");

    // Cambiar icono
    if (body.classList.contains("light-mode")) {
        icon.classList.remove("fa-solid");
        icon.classList.add("fa-regular");
    } else {
        icon.classList.remove("fa-regular");
        icon.classList.add("fa-solid");
    }
}
// MODAL DEL GRÁFICO
const showChartBtn = document.getElementById('showChartBtn');
const chartModal = document.getElementById('chartModal');
const closeChart = document.getElementById('closeChart');

showChartBtn.addEventListener('click', () => {
    chartModal.style.display = 'block';
});

closeChart.addEventListener('click', () => {
    chartModal.style.display = 'none';
});

// Cerrar modal al hacer clic fuera
window.addEventListener('click', (e) => {
    if(e.target === chartModal){
        chartModal.style.display = 'none';
    }
});