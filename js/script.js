let carrinho = [];
let quantidade = 0;
let key = 0;

const c = (el)=>document.querySelector(el);//retornará o primeiro elemento
const cs = (el)=>document.querySelectorAll(el)//retornará todos os elementos

tenisJson.map((item, index) => { //Inseri o modelo de um elemento dentro de main
    let modeloItem = c('.modelo .item--tenis').cloneNode(true)
    modeloItem.setAttribute('data-key', index) //Cria uma chave de identificação para cada elemento
    modeloItem.querySelector('.img--tenis img').src = item.img
    modeloItem.querySelector('.nome--tenis').innerHTML = item.nome
    modeloItem.querySelector('.preco--tenis').innerHTML = `<strong>R$ ${item.price[0].toFixed(2)}</strong>`
    //Função com evento para abrir janela de visualização do produto
    modeloItem.querySelector('a').addEventListener('click', (e)=>{
        e.preventDefault()
        key = e.target.closest('.item--tenis').getAttribute('data-key') //Pega a chave 
        //Inseri o conteúdo de cada elemento por meio de sua chave de identificação
        quantidade = 1;
        c('.div--img--produto--view img').src = tenisJson[key].img
        c('.info--produto h1').innerHTML = tenisJson[key].nome
        c('.info--produto .desc--produto').innerHTML = tenisJson[key].description
        c('.div--preco--produto .preco--produto').innerHTML = `<strong>R$ ${tenisJson[key].price[0].toFixed(2)}</strong>`
        //c('.tamanho--produto.selecionado').classList.remove('selecionado')
        //Seleção do tamanho do produto
        cs('.tamanho--produto span').forEach((tamanho, sizeIndex)=>{
            tamanho.innerHTML = tenisJson[key].size[sizeIndex]
        })
        //Mostra a janela 
        c('.janela--produto--view').style.display = 'flex'
    })
    c('.area--produtos').append(modeloItem)
})

//Ações da janela

function fecharJanela(){
    c('.janela--produto--view').style.display = 'none'
}

cs('.voltar--home, .button--cancelar').forEach((item)=>{
    item.addEventListener('click', fecharJanela)
})

//Selecionando o tamanho do produto
cs('.tamanho--produto').forEach((tamanho, sizeIndex)=>{
    tamanho.addEventListener('click', (e)=>{
        c('.tamanho--produto.selecionado').classList.remove('selecionado')
        tamanho.classList.add('selecionado')
    })
    
})
//Adicionar ao carrinho
c('.button--addCarrinho').addEventListener('click', ()=>{
    //Modelo do Produto
    //console.log("Produto: " + key)
    //Tamanho do Produto
    let tamanho = parseInt(c('.tamanho--produto.selecionado').getAttribute('data-key'))
    //console.log('tamanho: ' + tamanho)
    let identificador = tenisJson[key].id + '@' + tamanho
    let locaId = carrinho.findIndex((item) => item.identificador == identificador) //Faz a verificação se o produto ja foi inserido no carrinho
    if(locaId > -1){
        carrinho[locaId].qt += quantidade
    }else{
        carrinho.push({
            identificador,
            id: tenisJson[key].id,
            tamanho,
            qt: quantidade
        })  
    }
    atualizarCarrinho()
    fecharJanela()
})

function atualizarCarrinho(){
    if(carrinho.length > 0){
        //c('.area--produtos').style.display = 'block'
        c('.carrinho').classList.add('show')
    }else {
        c('.carrinho').classList.remove('show')
    }
}



//quantidade de itens no carrinho

c('.quantidade--menos').addEventListener('click', ()=>{
    if(quantidade > 1){
        quantidade--
        c('.quantidade--produtos').innerHTML = quantidade
    }
})
c('.quantidade--mais').addEventListener('click', ()=>{
    quantidade++
    c('.quantidade--produtos').innerHTML = quantidade
})