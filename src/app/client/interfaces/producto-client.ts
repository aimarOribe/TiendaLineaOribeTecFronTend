export interface ProductoCarrito {
    idProducto: number,
    nombre: string,
    decripcion: string,
    idMarca: string,
    descripcionMarca: string
    idCategoria: number,
    descripcionCategoria: string
    precio: number,
    stock: string,
    rutaImagen?: string,
    nombreImagen?: string,
    activo: boolean,
    cantidad: number
}