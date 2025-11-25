// js/utils/loadComponent.js
// Função utilitária para carregar um componente HTML via fetch e injetá-lo no DOM

export async function loadComponent(path, targetId) {
  try {
    const res = await fetch(path);
    if (!res.ok) throw new Error(`Failed to load component: ${path} (status ${res.status})`);
    const html = await res.text();
    const target = document.getElementById(targetId);
    if (!target) throw new Error(`Target element not found: ${targetId}`);
    target.innerHTML = html;
  } catch (err) {
    console.error('loadComponent error:', err);
  }
}
