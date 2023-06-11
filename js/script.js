//let quantidade = 0;
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
        let key = e.target.closest('.item--tenis').getAttribute('data-key') //Pega a chave 
        //Inseri o conteúdo de cada elemento por meio de sua chave de identificação
        //quantidade = 1;
        c('.div--img--produto--view img').src = tenisJson[key].img
        c('.info--produto h1').innerHTML = tenisJson[key].nome
        c('.info--produto .desc--produto').innerHTML = tenisJson[key].description
        c('.div--preco--produto .preco--produto').innerHTML = `<strong>R$ ${tenisJson[key].price[0].toFixed(2)}</strong>`
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