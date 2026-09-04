import {estado} from "./estado.js";
import {analisarEstoque} from "./analise.js";
import {lista, estoque} from "./dom.js";

export function renderizarAnaliseEstoque() {
        const analise = analisarEstoque(estado.produtos);

        estoque.innerHTML = `Total de produtos: ${analise.quantidadeProdutosEstoque} 
                            <br> Produtos acima de 100: ${analise.produtosCustamMaisDe100}                                        
                            <br> Produtos até 100: ${analise.produtosCustam100ouMenos}
                            <br> Produtos acima de 1000: ${analise.produtosCustamMaisde1000}
                            <br> Valor total: ${analise.valorTotalProdutos}`;
    }

    // Renderização dos produtos
    function renderizarProduto(produto) {
        const item = criarItemProduto(produto);

        criarBotaoEditarNome(item);
        criarBotaoEditarPreco(item);
        criarBotaoRemover(item);
    }

    function criarItemProduto(produto) {
        const item = document.createElement("li");
        item.dataset.idProduto = produto.id;
        const textoProduto = document.createElement("span");
        textoProduto.textContent = `${produto.id}: ${produto.nome} R$${produto.preco} `;

        item.appendChild(textoProduto);
        lista.appendChild(item);

        return item;
    }

    function criarBotaoEditarNome(item) {
        const editarProduto = document.createElement("button");
        editarProduto.textContent = "Editar Produto";
        item.appendChild(editarProduto);
        editarProduto.dataset.acao = "editarNome";
        
    }

    function criarBotaoEditarPreco(item) {
        const editarPreco = document.createElement("button");
        editarPreco.textContent = "Editar Preço";        
        item.appendChild(editarPreco);
        editarPreco.dataset.acao = "editarPreco";       
    }

    function criarBotaoRemover(item) {
        const remover = document.createElement("button");
        remover.textContent = "Remover";
        item.appendChild(remover);
        remover.dataset.acao = "remover";        
    }

    function renderizarProdutos(listaProdutos) {
        lista.innerHTML = "";

        listaProdutos.forEach(produto => {
            renderizarProduto(produto);
        });
    }

    // Visualização dos produtos

    function obterProdutosParaVisualizacao(produtos, textoPesquisa, filtroAcimaDe100, ordenacao) {
        let produtosListados = [...produtos];

        if (textoPesquisa) {

                produtosListados = produtosListados.filter(produto => produto.nome
                        .toLowerCase()
                        .includes(textoPesquisa)
                );

            } 
        if (filtroAcimaDe100 === true) {

                produtosListados = produtosListados.filter(produto => produto.preco > 100);
                

            }
            if (ordenacao === "menor") {
                produtosListados = produtosListados.sort((a,b) => a.preco - b.preco);
                

            }
            if (ordenacao === "maior") {

                produtosListados = produtosListados.sort((a, b) => b.preco - a.preco);
                

            } 
            return produtosListados;
    }
 
    // Coordena a renderização de acordo com o estado atual
    export function atualizarVisualizacao() {
        const produtosParaExibir = obterProdutosParaVisualizacao(estado.produtos, estado.textoPesquisa, estado.filtroAcimaDe100, estado.ordenacao);        
        renderizarProdutos(produtosParaExibir);
        
    }  