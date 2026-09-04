 // Análise do estoque
    function calcularValorEstoque(produtos) {
        return produtos.reduce((total, produto) => {
            total += produto.preco;
            return total;
        }, 0);
    }

    export function analisarEstoque(produtos) {
            const quantidadeProdutosEstoque = produtos.length;
            const produtosCustamMaisDe100 = obterProdutosAcimaDe100(produtos).length;
            const produtosCustam100ouMenos = produtos.filter(produto => produto.preco <= 100).length;
            const produtosCustamMaisde1000 = obterProdutosAcimaDe1000(produtos).length;
            const valorTotalProdutos = calcularValorEstoque(produtos);
    
            return {
                quantidadeProdutosEstoque,
                produtosCustamMaisDe100,
                produtosCustam100ouMenos,
                produtosCustamMaisde1000,
                valorTotalProdutos
            };
        }

    function obterProdutosAcimaDe100(produtos) {
        return produtos.filter(produto => produto.preco > 100);
    }


    function obterProdutosAcimaDe1000(produtos) {
        return produtos.filter(produto => produto.preco > 1000);
    }