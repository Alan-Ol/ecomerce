//variables globales
let carrito = [];
let productosJSON = [];
let dolarCompra;


//renderizamos los productos 
function renderizarProductos() {

    console.log(productosJSON)
    for (const prod of productosJSON) {
        document.querySelector("#milista").innerHTML+=(`
        <div class="card">
            <div class="imgBx">
                <img src="${prod.foto}" alt="">
            </div>
            <div class="contentBx">
                <h3>${prod.nombre}</h3>
                <h2 class="price">${prod.precio}</h2>
                <a href="#" class="buy" id='btn${prod.id}'>Buy Now</a>
            </div>
        </div> 
        `);
    }


    
    //EVENTOS
    for (const prod of productosJSON) {
         //Evento para cada boton
         document.querySelector(`#btn${prod.id}`).onclick= function() {
            agregarACarrito(prod);
        };
    }
}

function agregarACarrito(productoNuevo) {
    let encontrado = carrito.find(p => p.id == productoNuevo.id);
    console.log(encontrado);
    if (encontrado == undefined) {
        let prodACarrito = new ProductoCarrito(productoNuevo);
        carrito.push(prodACarrito);
        console.log(carrito);
        Swal.fire(
            'Nuevo producto agregado al carro',
            productoNuevo.nombre,
            'success'
        );
        //agregamos una nueva fila a la tabla de carrito
        document.querySelector("#tablabody").innerHTML+=(`<div>
            <tr id='fila${prodACarrito.id}'>
            <td> ${prodACarrito.id} </td>
            <td> ${prodACarrito.nombre}</td>
            <td id='${prodACarrito.id}'> ${prodACarrito.cantidad}</td>
            <td> ${prodACarrito.precio}</td>
            <td> <button class='btn-card' onclick='eliminar(${prodACarrito.id})'>Eliminar producto</button>        
        </div>
`);
    } else {
        //pido al carro la posicion del producto 
        let posicion = carrito.findIndex(p => p.id == productoNuevo.id);
        console.log(posicion);
        carrito[posicion].cantidad += 1;
        //con querySelector falla
        document.getElementById(productoNuevo.id).innerHTML=carrito[posicion].cantidad;
    }
    document.querySelector("#gastoTotal").innerText=(`Total: $ ${calcularTotal()}`);

}

//calcular total del precio final
function calcularTotal() {
    let suma = 0;
    for (const elemento of carrito) {
        suma = suma + (elemento.precio * elemento.cantidad);
    }
    return suma;
}

//eliminar producto
function eliminar(id){
    let indice=carrito.findIndex(prod => prod.id==id);
    carrito.splice(indice,1);
    let fila=document.getElementById(`fila${id}`);
    document.getElementById("tablabody").removeChild(fila);
    document.querySelector("#gastoTotal").innerText=(`Total: $ ${calcularTotal()}`);
}

class ProductoCarrito {
    constructor(objProd) {
        this.id = objProd.id;
        this.foto = objProd.foto;
        this.nombre = objProd.nombre;
        this.precio = objProd.precio;
        this.cantidad = 1;
    }
}

//llamada asincronica al json
async function obtenerJSON() {
    const URLJSON="./js/product.json"
    const resp=await fetch("./js/product.json")
    const data= await resp.json()
    productosJSON = data;
    renderizarProductos();
}

obtenerJSON()


//preload
setTimeout(function(){
    $('.loader_bg').fadeToggle();
}, 1300);

//modo dark-ligth
let logo = document.getElementById("logos")
let icon = document.getElementById("icon")

if(localStorage.getItem("theme") == null){
    localStorage.setItem("theme", "light");
}




let localData = localStorage.getItem("theme");

if(localData == "light"){
    logo.src = "./img/pngegg (11).png"
    icon.src = "./img/moon.png";
    document.body.classList.remove("dark-theme");
}else if(localData == "dark"){
    logo.src = "./img/logo.png"
    icon.src = "./img/sun.png";
    document.body.classList.add("dark-theme");

}

icon.onclick = function() {
    document.body.classList.toggle("dark-theme")
    if(document.body.classList.contains("dark-theme")){
        logo.src = "./img/logo-blanco.png"
        icon.src = "./img/sun.png";
        localStorage.setItem("theme", "dark");
    }else{
        logo.src = "./img/pngegg (11).png"
        icon.src = "./img/moon.png"
        localStorage.setItem("theme", "light");
    }
}



// icono scroll

document.getElementById("button-up").addEventListener("click", scrollUp);

function scrollUp(){

    let currentScroll = document.documentElement.scrollTop;

    //Operadores avanzados AND

    currentScroll > 0 && window.requestAnimationFrame(scrollUp);
    window.scrollTo (0, currentScroll - (currentScroll / 10));


    // if(currentScroll > 0){
    //     window.requestAnimationFrame(scrollUp);
    //     window.scrollTo (0, currentScroll - (currentScroll / 10));
    // }
}


buttonUp = document.getElementById("button-up");

window.onscroll = function(){

    let scroll = document.documentElement.scrollTop;


    if(scroll > 500){
        buttonUp.style.transform = "scale(1)"
    } else if (scroll < 500){
        buttonUp.style.transform = "scale(0)"
    }
}



