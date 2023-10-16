const listadoAlumnos = [];
let alumno;

class Alumno {
  id;
  nombre;
  calificaciones;

  constructor(nombre) {
    this.nombre = nombre;
    this.calificaciones = [];
    listadoAlumnos.push(this);
    this.id = listadoAlumnos.length;
  }
}
// con esto nos aseguramos que este cargado el html y js
document.addEventListener("DOMContentLoaded", () => {
  const listado = document.getElementById("listado");
  const body = document.getElementById("tableBody");
  const agregarAlumnoDiv = document.getElementById("agregarAlumno");
  const formAgregarAlumno = document.getElementById("formAgregarAlumno");
  const agregarAlumnoBtn = document.getElementById("btnAgregarAlumno");
  const agregarCalificacion = document.getElementById("agregarCalificacion");
  const formAgregarCalificacion = document.getElementById('agregarCalificacionAlumno')


  formAgregarCalificacion.addEventListener("submit", (ev) => {
    ev.preventDefault();
    const nota = parseInt(ev.target[0].value,10)
    alumno.calificaciones.push(nota)
    actualizarListado();
    listado.hidden = false;

    agregarCalificacion.hidden = true
    ev.target[0].value = ""

  })
  formAgregarAlumno.addEventListener("submit", (ev) => {
    ev.preventDefault();
    const input = document.getElementById("nombreAlumno");
    const inputName = input.value;
    new Alumno(inputName);
    actualizarListado();
    listado.hidden = false;
    agregarAlumnoDiv.hidden = true;
    input.value = "";
  });

  agregarAlumnoBtn.addEventListener("click", () => {
    listado.hidden = true;
    agregarAlumnoDiv.hidden = false;
    const input = document.getElementById("nombreAlumno");
    input.focus();
  });

  body.addEventListener("click", (ev) => {
    const target = ev.target;
    if (target.tagName.toLowerCase() === "button") {
      if (target.name === "AgregarCalificaciones") {
        const idAlumno = parseInt(target.value);
        AgregarCalificacion(idAlumno);
      }
    }
  });

  function actualizarListado() {
    let html = "";
    const calificaciones = obtenerCantidadCalificaciones();
    const colsCalificaciones = document.getElementById("calificaciones");
    colsCalificaciones.setAttribute("colspan", calificaciones);
    for (let i = 0; i < listadoAlumnos.length; i++) {
      const alumno = listadoAlumnos[i];
      html += `<tr><td>${alumno.id}</td><td>${alumno.nombre}</td>`;
      const arr = [];
      alumno.calificaciones.forEach(calificacion => {
        arr.push(calificacion)
      })
      if (arr.length === 0) {
        arr.push("")
      }
      html += arr
        .map((row) => {
          return `<td>${row}</td>`;
        })
        .join("");
      let suma = 0; 
      arr.forEach(calificacion => suma += calificacion)
      const promedio = suma/arr.length
      console.log(promedio)
      html += `<td>${promedio === 0?"":Math.round(promedio)}</td><td><button value="${alumno.id}" class="notaTabla" name="AgregarCalificaciones">Agregar Nota</button></td><tr>`;
    }
    body.hidden = false;
    body.innerHTML = html;
  }

  function obtenerCantidadCalificaciones() {
    let cantidad = -Infinity;
    for (let i = 0; i < listadoAlumnos.length; i++) {
      const alumno = listadoAlumnos[i];
      if (cantidad < alumno.calificaciones.length) {
        cantidad = alumno.calificaciones.length;
      }
    }
    if (cantidad === 0) {
      return 1;
    }
    return cantidad;
  }
  

  function AgregarCalificacion(idAlumno) {
      alumno = listadoAlumnos.find((alumno) => alumno.id === idAlumno);
      agregarCalificacion.hidden = false;
      listado.hidden = true;
      document.getElementById("nota").focus()
  }
});
