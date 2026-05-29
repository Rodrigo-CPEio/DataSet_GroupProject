// ── Sidebar active state ──────────────────────────────────────────────────────
function setActive(el) {
  document.querySelectorAll('.sidebar ul.menu li').forEach(li => li.classList.remove('active'));
  el.classList.add('active');
  localStorage.setItem('activeSection', el.dataset.section);
}

// Restaura aba ativa com base no URL atual
(function () {
  const sectionMap = {
    '/developer': 'overview',
    '/developer/tech-trends': 'tech-trends',
    '/developer/career-paths': 'career-paths',
    '/developer/ai-tools': 'ai-tools',
    '/developer/learning': 'learning',
    '/developer/salary-explorer': 'salary-explorer',
    '/developer/demographics': 'demographics',
  };
  // Prioridade: URL atual > localStorage > 'overview'
  const pathname = window.location.pathname;
  const activeSection = sectionMap[pathname] !== undefined 
    ? sectionMap[pathname]
    : (localStorage.getItem('activeSection') || 'overview');
  
  document.querySelectorAll('.sidebar ul.menu li').forEach(li => {
    li.classList.toggle('active', li.dataset.section === activeSection);
  });
  
  // Guardar no localStorage para persistência
  localStorage.setItem('activeSection', activeSection);
})();

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

// Persite tema seleccionado en localStorage 
  localStorage.setItem('theme', body.classList.contains('light-mode') ? 'light' : 'dark');

}
function carregarRecomendacoesDoAlgoritmo() {
    const container = document.getElementById('recommendations');
    const chartImg = document.getElementById('recChart');
    if (!container) return;

    // 1. Força a imagem PNG guardada a atualizar na interface sem lixo de cache
    if (chartImg) {
    chartImg.src = '/developer/notebooks-files/recommendation_system.png?t=' + new Date().getTime();
    chartImg.style.display = 'block';
}

    const icones = {
        'Python': 'fa-brands fa-python',
        'HTML/CSS': 'fa-solid fa-code',
        'C#': 'fa-solid fa-hashtag',
        'PHP': 'fa-brands fa-php',
        'Java': 'fa-brands fa-java',
        'Rust': 'fa-solid fa-gear',
        'JavaScript': 'fa-brands fa-js',
        'TypeScript': 'fa-solid fa-scroll',
        'SQL': 'fa-solid fa-database'
    };

    // 2. Procura as recomendações textuais na API do Express para colocar abaixo do gráfico
    fetch('/developer/api/recommend')
        .then(response => {
            if (!response.ok) throw new Error("Erro ao ler API de recomendações");
            return response.json();
        })
        .then(data => {
            container.innerHTML = ''; // Limpa resíduos estáticos antigos
            
            data.recommendations.forEach(lang => {
                const iconeClasse = icones[lang] || 'fa-solid fa-code';
                container.innerHTML += `
                    <div class="recommendation-item">
                        <i class="${iconeClasse}"></i>
                        <span>${lang}</span>
                    </div>
                `;
            });
        })
        .catch(error => {
            console.error("Erro ao carregar os dados textuais:", error);
            // Se a API ainda estiver desligada, pelo menos o gráfico PNG já fica visível acima!
        });
}

// Garante que a função corre assim que o HTML carregar
document.addEventListener('DOMContentLoaded', carregarRecomendacoesDoAlgoritmo);

// Garante que a função corre assim que a página carrega
document.addEventListener('DOMContentLoaded', carregarRecomendacoesDoAlgoritmo);

// ── Restaura tema ao carregar página ─────────────────────────────────────────
(function () {
  if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light-mode');
    const icon = document.getElementById('themeIcon');
    if (icon) {
      icon.classList.remove('fa-solid');
      icon.classList.add('fa-regular');
    }
  }
})();

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
}

);