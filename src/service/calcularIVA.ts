// Archivo de servicio para separar la logica matematica de la interfaz
export const calcularSubtotal = (precio: number[]): number => {
    let contador = 0;

    // Recorremos el arreglo de precios para acumular el valor total
    for( let cantidad of precio) {
        contador += cantidad;
    }
    return contador;
}

// Retorna el valor del impuesto aplicando la tasa impositiva enviada
export const calcularIVA = (subtotal: number, impuesto: number): number => {
    return subtotal * impuesto;
}

// Suma el subtotal acumulado mas el IVA calculado para obtener el coste final
export const calcularTotal = (subtotal: number, iva: number): number => {
    return subtotal + iva;
}