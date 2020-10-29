const carrito = document.querySelector('#carrito');
const listaCurso = document.querySelector('#lista-cursos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');

let articuloCarrito =[];
//console.log(listaCurso);

cargarEventListener();
function cargarEventListener () {
    //Cuando agregas un curso presionando "Agregar al Carrito"
    listaCurso.addEventListener('click', agregarCurso)
    carrito.addEventListener('click', elimimarCurso)
    vaciarCarritoBtn.addEventListener('click', ()=>{
       // articuloCarrito =[];// resetear el carrito
        limpiarHTML();
    });
}
//Funciones
function agregarCurso(e){
        e.preventDefault();
     if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccinado = e.target.parentElement.parentElement
        leerDatosCurso(cursoSeleccinado);
    } 
}
function elimimarCurso(e){
    e.preventDefault();

    if(e.target.classList.contains('borrar-curso')){
        const id = e.target.getAttribute('data-id');
        const carritoEliminado = articuloCarrito.filter(curso => curso.id !== id );
        articuloCarrito = [...carritoEliminado];
        carritoHTML();
    } 
    
}


function leerDatosCurso(curso) {
    
        //console.log(curso.children[1].children);
        const infoCurso = {
            imagen : curso.querySelector('img').src,
            nombre: curso.querySelector('h4').textContent,
            precio:curso.querySelector('.precio span').textContent,
            cantidad:1,
            id:curso.querySelector('a').getAttribute('data-id')
    
        }
       //Revisar si un curso ya existe 
       const existe = articuloCarrito.some( curso => curso.id === infoCurso.id)
        if(existe){
            const cursos = articuloCarrito.map(curso => {
                if(curso.id === infoCurso.id){
                    curso.cantidad++;
                    return curso;
                }else{
                    return curso;
                }
            });
            articuloCarrito = [...cursos]

        }else{
             //Agrega elementos al arreglo de carrito
        articuloCarrito = [...articuloCarrito,infoCurso]
        }
   
    
        carritoHTML();
}
//Muestra el carrito de compras en el html

function carritoHTML(){
    //LIMPIAR CARRITO CADA VEZ QUE AGREGA UN NUEVO CURSO
   limpiarHTML();

    //agregar los articulos al carrito
    articuloCarrito.forEach( curso => {
        const {nombre, precio, imagen, id, cantidad} = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
        <td> <img src="${imagen}"  width="100"></td>
        <td>${nombre}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td><a href="#" class="borrar-curso" data-id = "${id}">X</a></td>
        `
        contenedorCarrito.appendChild(row);
        

    })

}

function limpiarHTML () {
   // contenedorCarrito.innerHTML ="";

    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }

}