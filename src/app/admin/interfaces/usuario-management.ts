export interface Usuario {
    idUsuario: number,
    nombres: string,
    apellidos: string,
    correo: string,
    idRol: number,
    rolDescripcion: string,
    rutaImagen?: string,
    nombreImagen?: string,
    activo: boolean
}