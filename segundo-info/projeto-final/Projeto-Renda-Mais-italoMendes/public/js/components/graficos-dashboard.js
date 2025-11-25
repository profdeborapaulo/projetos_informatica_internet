// js/components/graficos-dashboard.js

// ===============================
// GRÁFICO DE PIZZA
// ===============================
async function criarGraficoPizza() {
  try {
    const res = await fetch('/api/dashboard/guardado-vs-gasto');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const dados = await res.json();

    const canvas = document.getElementById('graficoPizza');
    if (!canvas) return;

    // destruir gráfico anterior
    try {
      const existing = Chart.getChart(canvas);
      if (existing) existing.destroy();
    } catch (e) {}

    const style = getComputedStyle(document.documentElement);
    const colorGuardado = style.getPropertyValue('--vclaro').trim() || '#6a994e';
    const colorGasto = style.getPropertyValue('--rojo').trim() || '#bc4749';

    new Chart(canvas, {
      type: 'pie',
      data: {
        labels: ['Guardado', 'Gasto'],
        datasets: [{
          data: [dados.guardado ?? 0, dados.gasto ?? 0],
          backgroundColor: [colorGuardado, colorGasto],
          borderColor: '#ffffff',
          borderWidth: 2
        }]
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
          legend: { position: 'bottom' },
          tooltip: {
            callbacks: {
              label: ctx =>
                `${ctx.label}: ${Number(ctx.raw).toLocaleString('pt-BR',{ style:'currency', currency:'BRL'})}`
            }
          }
        }
      }
    });

  } catch (err) {
    console.error('Erro ao criar gráfico de pizza:', err);
  }
}


// ===============================
// GRÁFICO DE BARRAS
// ===============================
async function criarGraficoBarras() {
  try {
    const res = await fetch('/api/dashboard/gastos-mensais');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const dados = await res.json();

    const canvas = document.getElementById('graficoBarras');
    if (!canvas) return;

    // destruir gráfico anterior
    try {
      const existing = Chart.getChart(canvas);
      if (existing) existing.destroy();
    } catch (e) {}

    const ctx = canvas.getContext('2d');
    const style = getComputedStyle(document.documentElement);

    const c1 = style.getPropertyValue('--vyellow').trim() || '#a7c957';
    const c2 = style.getPropertyValue('--vescuro').trim() || '#235321';

    const grad = ctx.createLinearGradient(0, 0, 0, 300);
    grad.addColorStop(0, c1);
    grad.addColorStop(1, c2);

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: dados.meses || [],
        datasets: [{
          label: 'Gastos',
          data: dados.valores || [],
          backgroundColor: grad,
          borderColor: '#145c36',
          borderWidth: 1
        }]
      },
      options: {
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: v =>
                Number(v).toLocaleString('pt-BR',{ style:'currency', currency:'BRL' })
            }
          }
        }
      }
    });

  } catch (err) {
    console.error('Erro ao criar gráfico de barras:', err);
  }
}


// ===============================
// FUNÇÃO PRINCIPAL (AGORA CORRETA)
// ===============================
export async function inicializarGraficosDashboard() {

  // Agora é aqui que garantimos que o container esteja visível
  const container = document.getElementById('container-graficos');
  if (container) container.style.display = '';

  await Promise.all([
    criarGraficoPizza(),
    criarGraficoBarras()
  ]);
}


// ===============================
// BOTÃO "ATUALIZAR GRÁFICO"
// ===============================
(function setupAtualizarButton() {
  const container = document.getElementById('container-graficos');
  if (!container) return;

  let btn = document.getElementById('btn-atualizar-grafico');

  if (!btn) {
    btn = document.createElement('button');
    btn.id = 'btn-atualizar-grafico';
    btn.textContent = 'Atualizar gráfico';
    btn.style.display = 'none';
    btn.className = 'btn btn-paga mt-2';

    container.insertAdjacentElement('afterend', btn);

    btn.addEventListener('click', async () => {
      btn.disabled = true;
      try {
        await inicializarGraficosDashboard();
      } catch (e) {
        console.error('Erro ao atualizar gráficos:', e);
      } finally {
        btn.disabled = false;
        // Mantém o botão visível para que o usuário possa atualizar novamente quando quiser
      }
    });
  }

  // mostrar botão quando uma despesa nova é adicionada
  window.addEventListener('despesa:added', () => {
    btn.style.display = '';
  });
})();
