//PROBLEMAS
//la primera vez que la funcion cargarListaProveedores se ejecuta carga la lista correctamente pero luego no, puesto que cuando se crea la tabla se borra el id del tbody y no me
//doy cuenta por qué, estoy quemado xd

miLocalStorage = window.localStorage;

let borrarProveedores = document.getElementsByClassName("btn-borrar-proveedor");

/*-----------FUNCIONES-----------*/

function capturarproveedor() {
  let idProveedorInput = document.getElementById("id-proveedor").value;
  let razonSocialInput = document.getElementById("razon-social").value;
  let telefonoInput = document.getElementById("input-tel").value;
  let webInput = document.getElementById("input-web").value;
  let direccionInput = document.getElementById("input-direccion").value;
  let cpInput = document.getElementById("input-cp").value;
  let provinciaInput = document.getElementById("input-provincia").value;
  let paisInput = document.getElementById("input-pais").value;
  let emailInput = document.getElementById("input-email").value;
  let cuitInput = document.getElementById("input-cuit").value;
  let ivaInput = document.getElementById("select-iva").value;
  let rubroInput = document.getElementById("select-rubro").value;

  let proveedor = {
    id: idProveedorInput,
    razonSocial: razonSocialInput,
    telefono: telefonoInput,
    web: webInput,
    direccion: direccionInput,
    cp: cpInput,
    provincia: provinciaInput,
    pais: paisInput,
    email: emailInput,
    cuit: cuitInput,
    iva: ivaInput,
    rubro: rubroInput,
  };

  agregarproveedor(proveedor);
}

function agregarproveedor(proveedor) {
  let provs = JSON.parse(miLocalStorage.getItem("proveedores")) || [];
  provs.push(proveedor);
  miLocalStorage.setItem("proveedores", JSON.stringify(provs));
}

function eliminarProveedor(idProveedor) {
  let provs = JSON.parse(miLocalStorage.getItem("proveedores")) || [];

  for (let i = 0; i < provs.length; i++) {
    if (provs[i].id == idProveedor) {
      //   console.log(provs[i]);
      provs.splice(i, 1);
      break;
    }
  }
  miLocalStorage.setItem("proveedores", JSON.stringify(provs));
  cargarListaProveedores();
}

function cargarListaProveedores() {
  let provs = JSON.parse(miLocalStorage.getItem("proveedores")) || [];
  let proveedoresContainer = document.getElementsByTagName("tbody");

  if (proveedoresContainer[0]) {
    while (proveedoresContainer[0].firstChild) {
      console.log("hla");
      proveedoresContainer[0].removeChild(proveedoresContainer[0].firstChild);
    }

    provs.forEach((proveedor) => {
      let id = proveedor.id;
      let razonSocial = proveedor.razonSocial;
      let rubro = proveedor.rubro;
      let cuit = proveedor.cuit;
      let email = proveedor.email;
      let direccion = proveedor.direccion;
      let telefono = proveedor.telefono;

      let nuevaFila = crearFilaProveedor(
        id,
        razonSocial,
        rubro,
        cuit,
        email,
        direccion,
        telefono
      );
      proveedoresContainer[0].appendChild(nuevaFila);
    });
  }
}

function crearFilaProveedor(
  id,
  razonSocial,
  rubro,
  cuit,
  email,
  direccion,
  telefono
) {
  let fila = document.createElement("tr");

  let celdas = [
    id,
    razonSocial,
    rubro,
    cuit,
    email,
    direccion,
    telefono,
    `<button type="button" class="btn btn-danger btn-borrar-proveedor" value="${id}">Borrar</button>
       <button type="button" class="btn btn-primary btn-editar-proveedor" value="${id}">Editar</button>`,
  ];

  celdas.forEach(function (valor) {
    let celda = document.createElement("td");
    celda.innerHTML = valor;
    fila.appendChild(celda);
  });

  return fila;
}

/*----------------------*/

/*------LISTENERS------*/

// capturo el boton luego de que se cree en el evento shown.bs.modal
document
  .getElementById("agregarProveedorModal")
  .addEventListener("shown.bs.modal", function () {
    document
      .getElementById("guardar-proveedor")
      .addEventListener("click", capturarproveedor);
  });

// for (let btn of borrarProveedores) {
//   btn.addEventListener("click", (btn) => {
//     eliminarProveedor(btn.value);
//     cargarListaProveedores();
//   });
// }

document.addEventListener("click", function (event) {
  if (event.target.classList.contains("btn-borrar-proveedor")) {
    eliminarProveedor(event.target.value);
  }
});

cargarListaProveedores();
/*----------------------*/
