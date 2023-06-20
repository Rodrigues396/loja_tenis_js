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
    //c('main').style.display = 'none'
    //c('.carrinho').style.left = "100vw"
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

c('.close--carrinho').addEventListener('click', ()=>{
    c('.carrinho').classList.remove('show')
})
c('.info--compra button').addEventListener('click', ()=>{
    carrinho = []
    atualizarCarrinho()
    alert('Compra realizada com sucesso!!')
})

function atualizarCarrinho(){
    if(carrinho.length > 0){
        c('.menu .tem--produto--carrinho').style.display = 'inline-block'       
        //c('.area--produtos').style.display = 'block'
        c('.carrinho').classList.add('show')
        c('.item--no--carrinho').innerHTML = ''
        let subtotal = 0
        let desconto = 0
        let total = 0
        carrinho.map((itemCarrinho, index) => {
            let modeloItem = tenisJson.find((itemBD) => itemBD.id == itemCarrinho.id)
            subtotal += modeloItem.price * itemCarrinho.qt
            let carrinhoItem = c('.modelo .item--carrinho').cloneNode(true)
            carrinhoItem.querySelector('img').src = modeloItem.img
            carrinhoItem.querySelector('.nome--item--carrinho').innerHTML = `${modeloItem.nome}`//verificar  - ${modeloItem.size[itemCarrinho.tamanho]}
            carrinhoItem.querySelector('.quantidade--item--carrinho').innerHTML = itemCarrinho.qt
            carrinhoItem.querySelector('.menos--item--carrinho').addEventListener('click', ()=> {
                if(itemCarrinho.qt > 1){
                    itemCarrinho.qt--   
                }else{
                    carrinho.splice(index, 1)
                }
                atualizarCarrinho()
            })
            carrinhoItem.querySelector('.mais--item--carrinho').addEventListener('click', ()=> {
                itemCarrinho.qt++
                atualizarCarrinho()
            })
            c('.item--no--carrinho').append(carrinhoItem)
        })
        desconto = subtotal * 0.1
        total = subtotal - desconto
        c('.subtotal .valor--item').innerHTML = `R$ ${subtotal.toFixed(2)}`
        c('.desconto span:last-child').innerHTML = `R$ ${desconto.toFixed(2)}`
        c('.total span:last-child').innerHTML = `<strong>R$ ${total.toFixed(2)}</strong>`
    }else {
        c('.carrinho').classList.remove('show')
        c('.menu .tem--produto--carrinho').style.display = 'none' 
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