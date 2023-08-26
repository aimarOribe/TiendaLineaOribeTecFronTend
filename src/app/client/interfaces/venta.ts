export interface Venta {
    idVenta: number,
    idCliente: number,
    descripcionCliente: string,
    totalProducto: number
    montoTotalTexto: string,
    contacto: string
    idDistrito: string,
    telefono: string,
    direccion: string
    idTransaccion: string,
    fechaVenta?: string,
    detalleVenta: DetalleVenta[]
}

export interface DetalleVenta {
    idProducto: number,
    rutaImagen?: string,
    descripcionProducto: string,
    cantidad: number,
    precioTexto: number,
    totalTexto: string
}

export interface Ubicacion {
    descripcionDepartamento: string,
    descripcionProvincia: string,
    descripcionDistrito: string
}