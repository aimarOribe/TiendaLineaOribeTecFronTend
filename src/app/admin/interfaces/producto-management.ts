export interface Producto {
    idProducto: number,
    nombre: string,
    decripcion: string,
    idMarca: string,
    descripcionMarca: string
    idCategoria: number,
    descripcionCategoria: string
    precio: string,
    stock: string,
    rutaImagen?: string,
    nombreImagen?: string,
    activo: boolean
}