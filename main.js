import { estado, salvarEstado, carregarEstado } from "./estado.js";
import {inputProduto,
            inputPreco,
            botaoAdicionar,
            inputPesquisarProduto, 
            botaoPesquisar, 
            botaoOrdenarMaiorMenor, 
            botaoOrdenarMenorMaior,
            botaoMaiorQue100,
            botaoExibirTudo,
            lista} from "./dom.js";
import { atualizarVisualizacao, renderizarAnaliseEstoque } from "./visualizacao.js";






    // CRUD
    function adicionarProduto() {
        const nomeProduto = inputProduto.value.trim();
        const valorProduto = Number(inputPreco.value);        

        if (nomeProduto && !isNaN(valorProduto) && valorProduto > 0) {
            const novoProduto = {
                id: estado.proximoId,
                nome: nomeProduto,
                preco: valorProduto
            };

            estado.proximoId++;
            estado.produtos = [
                        ...estado.produtos,
                        novoProduto
          ];
            
            atualizarAplicacao();

        } else {
            alert("Cadastro não realizado!");
        }

        inputProduto.value = "";
        inputPreco.value = "";
    }

    // Sincroniza persistência, análise e visualização após alteração dos produtos
    function atualizarAplicacao() {
        salvarEstado();
        renderizarAnaliseEstoque();
        atualizarVisualizacao();
    }


    // Eventos
    botaoAdicionar.addEventListener("click", adicionarProduto);


    botaoOrdenarMenorMaior.addEventListener("click", function() {
        estado.ordenacao = "menor";
        salvarEstado();
        atualizarVisualizacao();   
    });


    botaoOrdenarMaiorMenor.addEventListener("click", function() {
        estado.ordenacao = "maior";
        salvarEstado();
        atualizarVisualizacao();  
    });


    botaoMaiorQue100.addEventListener("click", function(){
        estado.filtroAcimaDe100 = !estado.filtroAcimaDe100;
        salvarEstado();
        atualizarVisualizacao();
        
    }
    );


    botaoExibirTudo.addEventListener("click", function(){
        estado.textoPesquisa = "";
        estado.filtroAcimaDe100 = false;
        estado.ordenacao = "";
        inputPesquisarProduto.value = "";
        salvarEstado();
        atualizarVisualizacao();  
    }
    );


    botaoPesquisar.addEventListener(
        "click",
        atualizarVisualizacao
    );


    inputPesquisarProduto.addEventListener("input", function() {
        const campoPesquisar = inputPesquisarProduto.value
            .trim()
            .toLowerCase();

        estado.textoPesquisa = campoPesquisar;
        salvarEstado();
        atualizarVisualizacao();    
        
    });


    inputPreco.addEventListener("keydown", function(e) {
        if (e.key === "Enter") {
            adicionarProduto();
        }
    });

    lista.addEventListener("click", function(event){
        const valorliClosest = event.target.closest("li");
        if (!valorliClosest) return;
        const valorIdProduto = Number(valorliClosest.dataset.idProduto);
        const produtoEncontrado = estado.produtos.find(produto =>{
            return produto.id === valorIdProduto
        });
        const acao = event.target.dataset.acao;
        if(acao === "remover"){
            const ok = confirm(`Remover "${produtoEncontrado.nome}"?`);
            if (!ok) return;
            estado.produtos = estado.produtos.filter(produto =>{
                return produto.id !== valorIdProduto
            });
            atualizarAplicacao();            
        }
        if(acao === "editarNome"){
            const novoNome = prompt("Digite o novo produto:");
            if (novoNome === null) return;
            const nomeLimpo = novoNome.trim();
            if (nomeLimpo) {
                estado.produtos = estado.produtos.map(produto => {
                    if (produto.id === valorIdProduto) {
                    return {
                        ...produto,
                        nome: nomeLimpo
                    }
                }
                return produto;
            });
            atualizarAplicacao();

            } else {
                alert("Nome do produto precisa ser adicionado!");
            }
        }
        if(acao === "editarPreco"){
            const novoPreco = Number(prompt("Digite o novo preco:"));

            if (!isNaN(novoPreco) && novoPreco > 0) {
                estado.produtos = estado.produtos.map(produto => {
                    if (produto.id === valorIdProduto) {
                    return {
                        ...produto,
                        preco: novoPreco
                    }
                }
                return produto;
            });
                atualizarAplicacao();

            } else {
                alert("Preço precisa ser válido!");
            }
        }        
    });
    

    // Inicialização
    carregarEstado();
    inputPesquisarProduto.value = estado.textoPesquisa;
    atualizarVisualizacao();
    renderizarAnaliseEstoque();