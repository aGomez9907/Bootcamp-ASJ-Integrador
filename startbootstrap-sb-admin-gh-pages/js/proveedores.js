miLocalStorage = window.localStorage;

const agregarProveedor = document.getElementById("btn-agregar-proveedor");

/*-----------FUNCIONES-----------*/

function capturarDatos() {
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

  let prov = JSON.parse(miLocalStorage.getItem("proveedores")) || [];
  prov.push(proveedor);
  miLocalStorage.setItem("proveedores", JSON.stringify(prov));
}

/*----------------------*/

/*------LISTENERS------*/

agregarProveedor.addEventListener("click", () => {});

// capturo el boton luego de que se cree en el evento shown.bs.modal
document
  .getElementById("agregarProveedorModal")
  .addEventListener("shown.bs.modal", function () {
    document
      .getElementById("guardar-proveedor")
      .addEventListener("click", capturarDatos);
  });

/*----------------------*/
