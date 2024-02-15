fetch('pedidos.json')
    .then(response => response.json())
    .then(data => {
        // Mostrar información de pedidos
        const pedidoTable = document.getElementById('pedidoTable');
        mostrarPedidos(data, pedidoTable);

        // Mostrar información de clientes
        const clienteTable = document.getElementById('clienteTable');
        mostrarClientes(data, clienteTable);

        // Crear factura de un cliente (Tomar el primer cliente como ejemplo)
        const facturaDiv = document.getElementById('factura');
        mostrarFactura(data, facturaDiv);

        // Mostrar productos vendidos en los trimestres especificados
        const productosVendidosTable = document.getElementById('productosVendidosTable');
        mostrarProductosVendidos(data, productosVendidosTable);
    })
    .catch(error => console.error('Error:', error));

function mostrarPedidos(data, table) {
    Object.values(data.pedidos['2021']).forEach(trimestre => {
        trimestre.forEach(pedido => {
            const row = table.insertRow();
            row.innerHTML = `
                <td>${pedido.cliente.nombre} ${pedido.cliente.apellidos}</td>
                <td>${pedido.numeroPedido}</td>
                <td>${pedido.fechaCompra}</td>
                <td>${pedido.fechaEntrega}</td>
                <td>${pedido.totalFactura}</td>
                <td>${pedido.productos.map(producto => producto.nombreProducto).join('<br>')}</td>
                <td>${pedido.productos.map(producto => producto.referencia).join('<br>')}</td>
                <td>${pedido.productos.map(producto => producto.precio).join('<br>')}</td>
                <td>${pedido.productos.map(producto => producto.unidades).join('<br>')}</td>
            `;
        });
    });
}

function mostrarClientes(data, table) {
    Object.values(data.pedidos['2021']).forEach(trimestre => {
        trimestre.forEach(pedido => {
            const cliente = pedido.cliente;
            const row = table.insertRow();
            row.innerHTML = `
                <td>${cliente.nombre} ${cliente.apellidos}</td>
                <td>${cliente.telefono}</td>
                <td>${cliente.direccion.calle}, ${cliente.direccion.ciudad}, ${cliente.direccion.codigoPostal}, ${cliente.direccion.provincia}</td>
                <td>${cliente.correoElectronico}</td>
                <td>${cliente.fechaInclusion}</td>
            `;
        });
    });
}


function mostrarFactura(data, div) {
    const primerPedido = data.pedidos['2021']['trimestre2'][0];
    const clienteFactura = primerPedido.cliente;
    const facturaHTML = `
        <h2>Factura</h2>
        <p><strong>Cliente:</strong> ${clienteFactura.nombre} ${clienteFactura.apellidos}</p>
        <p><strong>Correo Electrónico:</strong> ${clienteFactura.correoElectronico}</p>
        <p><strong>Fecha de Compra:</strong> ${primerPedido.fechaCompra}</p>
        <p><strong>Productos:</strong></p>
        <ul>
            ${primerPedido.productos.map(producto => `<li>${producto.nombreProducto}: ${producto.precio}€</li>`).join('')}
        </ul>
        <p><strong>Total:</strong> ${primerPedido.totalFactura}€</p>
    `;
    div.innerHTML = facturaHTML;

    
}
function mostrarProductosVendidos(data, table) {
    const tbody = table.querySelector('tbody');
    const trimestres = ['2021', '2022']; // Ajustar los años según los datos proporcionados
    trimestres.forEach(año => {
        Object.values(data.pedidos[año]).forEach(trimestre => {
            trimestre.forEach(pedido => {
                pedido.productos.forEach(producto => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${pedido.cliente.nombre} ${pedido.cliente.apellidos}</td>
                        <td>${pedido.numeroPedido}</td>
                        <td>${pedido.fechaCompra}</td>
                        <td>${pedido.fechaEntrega}</td>
                        <td>${pedido.totalFactura}</td>
                        <td>${producto.nombreProducto}</td>
                        <td>${producto.referencia}</td>
                        <td>${producto.precio}</td>
                        <td>${producto.unidades}</td>
                    `;
                    tbody.appendChild(row);
                });
            });
        });
    });
}