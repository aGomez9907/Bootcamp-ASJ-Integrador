miLocalStorage = window.localStorage;

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

function eliminarproveedor(idProveedor) {
  let provs = JSON.parse(miLocalStorage.getItem("proveedores")) || [];

  for (let i = 0; i < provs.length; i++) {
    if (provs[i].id == idProveedor) {
      //   console.log(provs[i]);
      provs.splice(i, 1);
      break;
    }
  }
  miLocalStorage.setItem("proveedores", JSON.stringify(provs));
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

/*----------------------*/
