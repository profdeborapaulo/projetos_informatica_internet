const loader = document.querySelector(".loader-overlay")
const modalCriarLista = document.querySelector('#dialogCadastrarLista')
const modalCriarConta = document.querySelector('#dialogCadastrarConta')
const modalVerLista = document.querySelector('#dialogLista')
const modalCadastrarItem = document.querySelector('#dialogCadastrarItem')
const grupoId = window.location.pathname.split('/').pop(); 

const validaToken = async () => {
    const res = await fetch('/api/auth/validate',  {
        method: 'GET'
    })

    if(res.status != 200){
        liProfile.style.display = "none"
        liHome.style.display = "none"
        liLogin.style.display = "block"

        window.location.href = "/"
    }
    else{
        liProfile.style.display = "block";
        liLogin.style.display = "none";
    }
}


document.addEventListener('DOMContentLoaded', function() {
    //Valida o token
    validaToken();
    
    // Carregar dados do grupo
    carregarDados_Contas_Listas();
    
    // Event Listeners para botões (As ? garantem que o item exista ou ent não adiciona o evento)
    document.querySelector('#addLista')?.addEventListener('click', () => modalCriarLista.showModal()); // Tem que passar como função para não chamar automaticamente
    document.querySelector('#addConta')?.addEventListener('click', () => modalCriarConta.showModal());
    document.querySelector('.close-button')?.addEventListener('click', () => modalCriarLista.close()); 
    document.querySelector('#dialogCadastrarContaCloseButton')?.addEventListener('click', () => modalCriarConta.close()); 
    document.querySelector('#btnCriarLista')?.addEventListener('click', criarNovaLista)
    document.querySelector('#btnCriarConta')?.addEventListener('click', criarConta)
    document.querySelector('.btn-grupo.btn-secondary')?.addEventListener('click', compartilharGrupo);
    document.querySelector('#addItem')?.addEventListener('click', () => modalCadastrarItem.showModal());
    document.getElementById('dialogCadastrarItemCloseButton')?.addEventListener('click', () => modalCadastrarItem.close());
    document.getElementById('btnCancelarCadastrarItem')?.addEventListener('click', () => modalCadastrarItem.close());
});

document.addEventListener('DOMContentLoaded', () => {
    const btnConvidar = document.querySelector('#btnConvidar') || document.querySelector('.btn-convidar');
    const grupoCodeEl = document.querySelector('.grupo-code') || document.querySelector('[data-sharecode]');

    if (btnConvidar) {
        btnConvidar.addEventListener('click', async (e) => {
            let code = '';
            if (grupoCodeEl) {
                code = grupoCodeEl.dataset.sharecode || grupoCodeEl.textContent.trim();
            } else {
                const container = document.querySelector('.grupo-header') || document.body;
                code = container?.dataset?.sharecode || '';
            }

            if (!code) {
                alert('Código do grupo não encontrado.');
                return;
            }

            try {
                await navigator.clipboard.writeText(code);
                btnConvidar.textContent = 'Copiado!';
                setTimeout(() => btnConvidar.textContent = 'Convidar', 1200);
            } catch (err) {
                console.error('Erro ao copiar código:', err);
                const dummy = document.createElement('textarea');
                dummy.value = code;
                document.body.appendChild(dummy);
                dummy.select();
                document.execCommand('copy');
                document.body.removeChild(dummy);
                btnConvidar.textContent = 'Copiado!';
                setTimeout(() => btnConvidar.textContent = 'Convidar', 1200);
            }
        });
    }
});

async function carregarDados_Contas_Listas() {
    try {   
        const response = await fetch(`/api/grupo/listasEContas/${grupoId}`, {
            method: 'GET'
        });
        
        if (response.ok) {
            const dados = await response.json();
            atualizarInterface(dados);
        }
    } catch (error) {
        console.error('Erro ao carregar dados:', error);
    }
}

function atualizarInterface(dados) {
    // Atualiza listas
    const listaContainer = document.querySelector('.lista-items');
    if (dados.listas && dados.listas.length > 0) {
        listaContainer.innerHTML = dados.listas.map(lista => `
        <li class="item" onclick="abrirLista(${lista.lista_id}, '${lista.nome_lista}')">
            <span>${lista.nome_lista}</span>
            <span>${lista.quantidade} items</span>
        </li>
    `).join('');
    } 
    else {
        listaContainer.innerHTML = `<div class="sem-item">Nenhuma lista encontrada</div>`;
    }

    // Atualiza contas
    const contasContainer = document.querySelector('.contas-items');
    if (dados.contas && dados.contas.length > 0) {
        contasContainer.innerHTML = dados.contas.map(conta => `
        <li class="item">
            <div>
                <span class="item-status status-${conta.status}"></span>
                <span>${conta.descricao}</span>
            </div>
            <span>R$ ${Number(conta.valor_total).toFixed(2)}</span>
        </li>
    `).join('');
    } 
    else {
        contasContainer.innerHTML = `<div class="sem-item">Nenhuma conta encontrada</div>`;
    }
}

async function criarNovaLista(event) {
    if (event) event.preventDefault();
    try{

        loader.style.display = 'flex';
        const nomeLista = document.querySelector('#nomeLista').value;
        
        const resultado = await fetch('/api/lista/criar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                grupo_id: grupoId,
                nome_lista: nomeLista
            })
        })

        if(resultado.status == 200){
            modalCriarLista.close();
            carregarDados_Contas_Listas();
        }
        else{
            alert('Campos Obrigatorios');
            modalCriarLista.close();
        }
        
        loader.style.display = 'none';
    }
    catch{
        loader.style.display = 'none';
    }
}

async function criarConta() {
    const nomeConta = document.querySelector('#nomeConta').value
    const descricaoConta = document.querySelector('#descricaoConta').value
    const valorConta = document.querySelector('#valorConta').value
    const dataVencimento = document.querySelector('#dataVencimento').value
    const dataPagamento = document.querySelector('#dataPagamento').value
    const statusPagamento = document.querySelector('#statusPagamento').value
    const categoriaConta = document.querySelector('#categoriaConta').value

    try{

        
        const resultado = await fetch('/api/conta/criar', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                grupo_id: grupoId,
                nome: nomeConta,
            descricao: descricaoConta,
            valor_total: valorConta,
            data_vencimento: dataVencimento,
            data_pagamento: dataPagamento,
            paga: statusPagamento,
            categoria_conta: categoriaConta 
        })})
    
        if(resultado.status == 200){
            modalCriarConta.close();
            carregarDados_Contas_Listas();
        }
        else{
            alert('Campos Obrigatorios');
            modalCriarConta.close();
        }
        
        loader.style.display = 'none';

    }
    catch{
        loader.style.display = 'none';
    }
}

function criarNovaConta() {
}

function compartilharGrupo() {
    const codigo = document.querySelector('.grupo-code').texContastContent.split(': ')[1];
    navigator.clipboard.writeText(codigo).then(() => alert('Código copiado para a área de transferência!')).catch(err => console.error('Erro ao copiar código:', err));
}

async function abrirLista(lista_id, nome_lista) {
    try {
        loader.style.display = 'flex';

        const resposta = await fetch(`/api/lista/items/${lista_id}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        if (resposta.ok || resposta.status == 400) {
            const data = await resposta.json();

            const listaTitulo = document.querySelector('#listaTitulo');
            const itensEl = document.querySelector('#listaItens');
            const totalEl = document.querySelector('#listaTotal');
            const countEl = document.querySelector('#listaCount');
            const modalVerLista = document.querySelector('#dialogLista');

            if(nome_lista)
                listaTitulo.textContent = nome_lista ;
        
            const itens = data.resultado || []; // garantindo que sempre vai ser um array para que ele não der erro de nulo caso não tenham itenss
            if (itens.length > 0) {//Verificando se ele já foi comprado para mudadar a classe
                itensEl.innerHTML = itens.map(item => `
                    <li class="lista-item">
                        <label class="item-compra-label" style="display: flex; align-items: center; gap: 0.75rem; cursor: pointer;">
                            <input type="checkbox" class="item-checkbox" value="${item.item_lista_id}" ${item.comprado ? 'checked' : ''}> 
                            <span class="${item.comprado ? 'item-comprado' : ''}"> 
                                ${item.nome_item} <small class="item-qtd">x${item.quantidade || 1}</small> 
                            </span>
                        </label>
                        <label class="item-excluir-label" style="display:none; align-items: center; gap: 0.75rem; cursor: pointer;">
                            <input type="checkbox" class="delete-checkbox" data-item-id="${item.item_lista_id}">
                            <span> 
                                ${item.nome_item} <small class="item-qtd">x${item.quantidade || 1}</small> 
                            </span>
                        </label>
                        <span class="item-valor">R$ ${Number(item.valor_item || 0).toFixed(2)}</span>
                    </li>
                `).join('');
            } else {
                itensEl.innerHTML = `<li class="sem-item">Nenhum item encontrado. Adicione novos itens abaixo!</li>`;
            }

            let soma = 0;
            itens.forEach(item => {
                const valor = Number(item.valor_item || 0);
                const quantidade = Number(item.quantidade || 1);
                soma += valor * quantidade;
            });

            totalEl.textContent = soma.toFixed(2);
            countEl.textContent = itens.length;

            modalVerLista.showModal();

            const closeBtn = document.querySelector('#dialogListaClose');
            closeBtn.onclick = () => modalVerLista.close();

            // Evento para marcar como comprado
            document.querySelectorAll('.item-checkbox').forEach(chk => {
                chk.addEventListener('change', async (e) => {
                    const itemId = e.target.value;
                    const comprado = e.target.checked;
                    const span = e.target.closest('label')?.querySelector('span');

                    try {
                        const res = await fetch(`/api/lista/item/${itemId}`, {
                            method: 'PATCH',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ comprado })
                        });

                        if (!res.ok) {
                            e.target.checked = !comprado;
                            span.classList.toggle('item-comprado', !comprado);
                            alert('Erro ao atualizar item');
                        } else {
                            span.classList.toggle('item-comprado', comprado);
                        }
                    } catch (err) {
                        e.target.checked = !comprado;
                        span.classList.toggle('item-comprado', !comprado);
                        console.error('Erro ao atualizar item:', err);
                        alert('Erro ao atualizar item');
                    }
                });
            });

            const btnOpenCadastrarItem = document.querySelector('#btnAddItem');
            btnOpenCadastrarItem.onclick = () => {
                document.querySelector('#item_lista_id').value = lista_id;
                modalCadastrarItem.showModal();
            };

            const btnExcluirItem = document.querySelector('#btnExcluirItem');
            const btnConfirmarExclusao = document.querySelector('#btnConfirmarExclusao');
            const btnAddItem = document.querySelector('#btnAddItem');

            let isDeleteMode = false;

            btnExcluirItem.onclick = () => {
                isDeleteMode = !isDeleteMode;

                const dialogBtns = btnExcluirItem.closest('.dialog-btns');
                dialogBtns.classList.toggle('delete-mode-active', isDeleteMode);
                
                document.querySelectorAll('.item-compra-label').forEach(label => label.style.display = isDeleteMode ? 'none' : 'flex');
                document.querySelectorAll('.item-excluir-label').forEach(label => label.style.display = isDeleteMode ? 'flex' : 'none');
                
                btnConfirmarExclusao.style.display = isDeleteMode ? 'block' : 'none';
                btnAddItem.style.display = isDeleteMode ? 'none' : 'block';
                
                if (isDeleteMode) {
                    btnExcluirItem.textContent = 'Cancelar';
                    btnExcluirItem.classList.remove('btn-secondary');
                    btnExcluirItem.classList.add('btn-primary');
                } else {
                    btnExcluirItem.textContent = 'Excluir Item';
                    btnExcluirItem.classList.remove('btn-primary');
                    btnExcluirItem.classList.add('btn-secondary');
                }
            };

            btnConfirmarExclusao.onclick = async () => {
                const selectedItems = Array.from(document.querySelectorAll('.delete-checkbox:checked')).map(cb => parseInt(cb.dataset.itemId, 10));
                
                if (selectedItems.length === 0) {
                    alert('Selecione pelo menos um item para excluir.');
                    return;
                }

                if (confirm(`Tem certeza que deseja excluir ${selectedItems.length} item(ns)?`)) {
                    try {
                        loader.style.display = 'flex';
                        const res = await fetch('/api/lista/items', {
                            method: 'DELETE',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ itemIds: selectedItems })
                        });

                        if (res.ok) {
                            await abrirLista(lista_id, nome_lista);
                            await carregarDados_Contas_Listas();
                        } else {
                            const errorBody = await res.json().catch(() => ({ message: res.statusText }));
                            alert(`Erro ao excluir itens: ${errorBody.message}`);
                        }
                    } catch (error) {
                        console.error('Erro ao excluir itens:', error);
                        alert('Ocorreu um erro de rede ou um problema inesperado.');
                    } finally {
                        loader.style.display = 'none';
                        if (isDeleteMode) {
                            btnExcluirItem.click(); // Sair do modo de exclusão
                        }
                    }
                }
            };
        }
    } catch (error) {
        alert(error);
    } finally {
        loader.style.display = 'none';
    }
}


document.getElementById('formCadastrarItem')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    loader.style.display = 'flex';

    const lista_id = document.getElementById('item_lista_id').value;
    const nome = document.getElementById('nomeItem').value.trim();
    const quantidade = Number(document.getElementById('QuantidadeItem').value) || 1; 
    const valor = Number(document.getElementById('ValorItem').value);
    const categoria_item = document.querySelector('#categoriaItem').value;
    const statusPagamento = document.querySelector('#statusCompraItem').value

    if (!lista_id || !nome) 
    { 
        alert('Selecione a lista e informe o nome do item'); 
        return; 
    }

    loader.style.display = 'flex';
    
    try {
        const res = await fetch(`/api/lista/item`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                lista_id,
                nome_item: nome, 
                quantidade, 
                categoria_item,
                comprado: statusPagamento,
                valor_item: valor
            })
        });

        if (res.ok) {
            modalCadastrarItem.close();
            await abrirLista(lista_id, null);
            await carregarDados_Contas_Listas();
        } else {
            const err = await res.json().catch(()=>({message:'Erro'}));
            alert(err.message || 'Erro ao criar item');
        }
    } catch (err) {
        console.error(err);
        alert('Erro ao criar item');
    } finally {
        loader.style.display = 'none';
    }
});