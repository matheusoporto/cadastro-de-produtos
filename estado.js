// Estado da aplicação
    export const estado = {
        produtos: [],
        proximoId: 1,        
        textoPesquisa: "",
        filtroAcimaDe100: false,
        ordenacao: ""
    };

     // Persistência no localStorage
    export function salvarEstado() {
         const texto = JSON.stringify(estado);
         
        localStorage.setItem("estado", texto);
    }


    export function carregarEstado() {
        const estadoSalvo = localStorage.getItem("estado");

        if (estadoSalvo) {
            try{
                const estadoConvertido = JSON.parse(estadoSalvo);
                

                if (Array.isArray(estadoConvertido.produtos)){
                    const produtosValidos = estadoConvertido.produtos.every(produto => 
                        typeof produto === "object" && 
                        produto != null && 
                        !Array.isArray(produto) && 
                        Number.isInteger(produto.id) && 
                        produto.id > 0 && 
                        typeof produto.nome === "string" && 
                        produto.nome.trim() !="" && 
                        typeof produto.preco === "number" && 
                        produto.preco > 0 &&  
                        Number.isFinite(produto.preco));
                    if(produtosValidos === true){
                    estado.produtos = estadoConvertido.produtos;
                    }
                }
                const maiorId = estado.produtos.reduce((maior, produto) => {
                    if (produto.id > maior) {
                        return produto.id;
                    }

                    return maior;
                }, 0);   

                if (typeof estadoConvertido.proximoId === "number" && 
                    Number.isInteger(estadoConvertido.proximoId) && 
                    estadoConvertido.proximoId > 0 && estadoConvertido.proximoId > maiorId) {
                    estado.proximoId = estadoConvertido.proximoId;
                }else{
                    estado.proximoId = maiorId + 1;
                }

                if (typeof estadoConvertido.textoPesquisa === "string") {
                    estado.textoPesquisa = estadoConvertido.textoPesquisa;
                }  

                if (typeof estadoConvertido.filtroAcimaDe100 === "boolean") {
                    estado.filtroAcimaDe100 = estadoConvertido.filtroAcimaDe100;
                } 

                if (typeof estadoConvertido.ordenacao === "string" && 
                    (estadoConvertido.ordenacao === "" || 
                    estadoConvertido.ordenacao === "menor" || 
                    estadoConvertido.ordenacao === "maior")) {
                    estado.ordenacao = estadoConvertido.ordenacao;
                }      
                     
            } catch(erro){
                localStorage.removeItem("estado")
                console.log(erro);
            }
            
        }
    }