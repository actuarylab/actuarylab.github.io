async function verificarCertificado() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const clave = params.get('v');
  const contenedor = document.getElementById('resultado');

  if (!id || !clave) {
    mostrarError(contenedor);
    return;
  }

  try {
    const respuesta = await fetch('data/' + id + '.json');
    if (!respuesta.ok) {
      mostrarError(contenedor);
      return;
    }
    const datos = await respuesta.json();

    if (datos.v !== clave) {
      mostrarError(contenedor);
      return;
    }

    mostrarCertificado(contenedor, id, datos);
  } catch (error) {
    mostrarError(contenedor);
  }
}

function mostrarCertificado(contenedor, id, datos) {
  const esVigente = datos.estado === 'Vigente';
  const claseEstado = esVigente ? 'vigente' : 'no-vigente';

  contenedor.innerHTML = `
    <div class="cert-card">
      <span class="cert-status ${claseEstado}">${datos.estado}</span>
      <h2 class="cert-nombre">${datos.nombre}</h2>
      <div class="cert-detalle">
        <div class="cert-item">
          <div class="label">Tipo</div>
          <div class="value">${datos.tipo}</div>
        </div>
        <div class="cert-item">
          <div class="label">Laboratorio acreditado</div>
          <div class="value">${datos.laboratorio}</div>
        </div>
        <div class="cert-item">
          <div class="label">Competencias</div>
          <div class="value">${datos.competencias}</div>
        </div>
        <div class="cert-item">
          <div class="label">Edición</div>
          <div class="value">${datos.edicion}</div>
        </div>
        <div class="cert-item">
          <div class="label">Versión del plan</div>
          <div class="value">${datos.version_plan}</div>
        </div>
        <div class="cert-item">
          <div class="label">Fecha de emisión</div>
          <div class="value">${datos.fecha_emision}</div>
        </div>
      </div>
      <div class="cert-id">
        ID del certificado: <strong>${id}</strong>
      </div>
    </div>
  `;
}

function mostrarError(contenedor) {
  contenedor.innerHTML = `
    <div class="cert-card cert-error">
      <h2>Certificado no encontrado</h2>
      <p>El enlace no corresponde a un certificado válido. Verifica que copiaste la URL completa, o contacta a actuarylab@gmail.com si crees que esto es un error.</p>
    </div>
  `;
}

verificarCertificado();
