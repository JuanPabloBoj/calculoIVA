import PromptSync from "prompt-sync";
import { calcularSubtotal, calcularIVA, calcularTotal } from "./service/calcularIVA.js";

const prompt = PromptSync();

const readNumber = (message: string): number => {
    return Number(prompt(message));
};

let decision: boolean = true;
const precios: number[] = [];
const iva: number = 0.12;

const showMenu = (): void => {
    console.log("\n===== MENU =====");
    console.log("1. Agregar precios");
    console.log("2. Mostrar precios");
    console.log("3. Calcular IVA");
    console.log("0. Salir");
};

const agregarPrecio = (): void => {
    const nuevoPrecio = readNumber("Ingrese el precio del producto: ");
    
    // Validacion para evitar montos negativos, strings vacios o errores de tipeo (NaN)
    if (nuevoPrecio <= 0 || isNaN(nuevoPrecio)) {
        console.log("Error: Ingrese un monto numérico válido.");
        return;
    }
    
    precios.push(nuevoPrecio);
    console.log(`Precio ${nuevoPrecio} agregado correctamente.`);
};

const mostrarPrecios = (): void => {
    // Control para verificar si el array tiene elementos cargados antes de recorrerlo
    if (precios.length === 0) {
        console.log("La lista esta vacia.");
        return;
    }
    
    console.log("\n--- Lista de Precios Registrados ---");
    // Recorremos el arreglo usando el indice para listar los productos de forma ordenada
    precios.forEach((precio, index) => {
        console.log(`Producto [${index + 1}]: $${precio}`);
    });
};

const ejecutarCalculoFactura = (): void => {
    // Validacion para asegurar que existan datos antes de procesar operaciones matematicas
    if (precios.length === 0) {
        console.log("No hay datos en la lista para realizar el calculo.");
        return;
    }
    
    // Inyeccion de datos locales hacia las funciones del modulo de servicio importado
    const subtotalResultado = calcularSubtotal(precios);
    const ivaResultado = calcularIVA(subtotalResultado, iva);
    const totalResultado = calcularTotal(subtotalResultado, ivaResultado);

    console.log(`Subtotal (Suma de productos): $${subtotalResultado}`);
    console.log(`IVA (Tasa del 12%):           $${ivaResultado}`);
    console.log(`Total Final de la Compra:     $${totalResultado}`);
};

while (decision) {
    showMenu();
    const opcion = readNumber("Seleccione una opción: ");

    switch (opcion) {
        case 1:
            agregarPrecio();
            break;
        case 2:
            mostrarPrecios();
            break;
        case 3:
            ejecutarCalculoFactura();
            break;
        case 0:
            console.log("Gracias por usar este sistema. Finalizando sesion...");
            decision = false;
            break;
        default:
            console.log("Opción no válida");
            break;
    }
}