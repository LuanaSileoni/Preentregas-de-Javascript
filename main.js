function comprarProductos() {
    let producto = '';
    let precio = 0;
    let cantidad = 0;
    let totalCompra = 0;
    let cantidadTotal = 0;
    let seguirComprando = false;

    do {
        producto = prompt('¿Querés comprar remeras, pantalones, blusas, camisas o chombas?', 'Ej: chombas');
        cantidad = parseInt(prompt('¿Cuanto/as ' +producto+ ' querés comprar?', 'Ej: 2'));

        let cantidadValidada = validarCantidad(cantidad);

        switch (producto) {
            case 'remeras':
                precio = 1500;
                break;
            case 'pantalones':
                precio = 3900;
                break;
            case 'blusas':
                precio = 1800;
                break;
            case 'camisas':
                precio = 4000;
                break;
            case 'chombas':
                precio = 2400;
                break;
            default:
                alert('Alguno de los datos ingresados no es correcto.');
                precio = 0;
                cantidad = 0;
                break;
        }

        totalCompra += precio * cantidadValidada;
        seguirComprando = confirm('¿Querés agregar otra prenda?');

    } while (seguirComprando)

    const totalConDescuento = aplicarDescuento(totalCompra);
    const totalConEnvio = calcularEnvio(totalConDescuento);

    return totalConEnvio;
}

function validarCantidad(cantidad) {
    while(Number.isNaN(cantidad) || cantidad === 0) {
        if (cantidad !== 0) {
            alert('Debes ingresar un número.')
        } else {
            alert('Debe ingresar un número distinto de cero.')
        }
        cantidad = parseInt(prompt('¿Cuántos/as' +producto+ 'querés agregar?'));
    }

    return cantidad;
}

function aplicarDescuento(totalCompra) {
    let totalConDescuento = 0;

    if (totalCompra >= 7000) {
        totalConDescuento = totalCompra * 0.95;
        return totalConDescuento;
    } else {
        return totalCompra;
    }
}

function calcularEnvio(totalCompra) {
    let tieneEnvioADomicilio = false;

    tieneEnvioADomicilio = confirm('¿Querés que te lo enviemos a tu casa?');

    if (tieneEnvioADomicilio && totalCompra >= 7000) {
        alert('Tenes envio gratis. El total de la compra es: '+totalCompra);
    } else if (tieneEnvioADomicilio && totalCompra < 7000 && totalCompra !== 0) {
        totalCompra += 1000;
        alert('El envío cuesta $1000. El total de la compra es: '+totalCompra);
    } else {
        alert('El total de la compra es: '+totalCompra);
    }

    return totalCompra;
}

function calcularCantidadDeCuotas() {
    let cuotas = 0;
    let tieneCuotas = false;

    tieneCuotas = confirm('¿Querés pagar en cuotas?');

    if (tieneCuotas) {
        cuotas = parseInt(prompt('¿En cuántas cuotas querés pagar?'));
        if (cuotas === 0) {
            cuotas = 1;
        } else if (Number.isNaN(cuotas)) {
            calcularCantidadDeCuotas();
        }
    } else {
        cuotas = 1;
    }

    return cuotas;
}

function calcularIntereses(cuotas) {
    let tasa = 15.5;
    let sinIntereses = 0;
    let tasaTotal = 0;
    let interesesTotales = 0;

    if (cuotas === 1) {
        return sinIntereses;
    } else {
        tasaTotal = tasa + cuotas * 0.2;
        interesesTotales = tasaTotal * cuotas;
        return interesesTotales;
    }
}

function calcularTotalAPagar(totalCompra, cuotas, intereses) {
    totalCompra = totalCompra + intereses;
    let valorCuota = totalCompra / cuotas;
    alert('El total a pagar es: $'+totalCompra+' en '+cuotas+' cuotas de $'+valorCuota);
}

const totalCompra = comprarProductos();
const cuotas = calcularCantidadDeCuotas();
const intereses = calcularIntereses(cuotas);

calcularTotalAPagar(totalCompra, cuotas, intereses);