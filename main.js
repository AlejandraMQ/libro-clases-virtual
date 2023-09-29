const listadoAlumnos = []

class Alumno {
    id
    nombre
    calificaciones

    constructor(nombre){
        this.nombre = nombre;
        this.calificaciones = []
        listadoAlumnos.push(this)
        this.id = listadoAlumnos.length 
    }
}
// con esto nos aseguramos que este cargado el html y js
document.addEventListener("DOMContentLoaded", () => {
    const listado = document.getElementById("listado")
    const agregarAlumnoDiv = document.getElementById('agregarAlumno')
    const formAgregarAlumno = document.getElementById('FormAgregarAlumno');
    const agregarAlumnoBtn = document.getElementById("AgregarAlumno")

    formAgregarAlumno.addEventListener('submit',(ev) => {
        ev.preventDefault();
        const input = document.getElementById("nombreAlumno")
        const inputName = input.value
        new Alumno(inputName)
        actualizarListado();
        listado.hidden = false;
        agregarAlumnoDiv.hidden = true;
        input.value = ""
    })

    agregarAlumnoBtn.addEventListener("click",() =>{
        listado.hidden = true;
        agregarAlumnoDiv.hidden = false;
        const input = document.getElementById("nombreAlumno")
        input.focus();
    } )
    

})

function actualizarListado(){
    const body = document.getElementById("tableBody");
    let html=""
    const calificaciones = obtenerCantidadCalificaciones();
    const colsCalificaciones = document.getElementById("calificaciones")
    colsCalificaciones.setAttribute("colspan",calificaciones)
    for (let i = 0; i < listadoAlumnos.length; i++) {
        const alumno = listadoAlumnos[i];
        html += `<tr><td>${alumno.id}</td><td>${alumno.nombre}</td>`
        const arr = new Array(calificaciones).fill("");
        for(let j = 0; j < alumno.calificaciones.length;j++){
            arr[j] = alumno.calificaciones[j]
        }
        html+=arr.map(row => {
            return `<td>${row}</td>`
        }).join("")
        console.log(arr,calificaciones)
        html+=`<td><button value="${alumno.id}" name="AgregarCalificaciones">Agregar Nota</button></td><tr>`        
    }
    body.hidden=false
    body.innerHTML = html;
}

function obtenerCantidadCalificaciones(){
    let cantidad = -Infinity;
    for (let i = 0; i < listadoAlumnos.length; i++) {
        const alumno = listadoAlumnos[i];
        if (cantidad < alumno.calificaciones.length){
            cantidad = alumno.calificaciones.length
        }        
    }
    if( cantidad === 0) {
        return 1
    }
    return  cantidad ;
}



