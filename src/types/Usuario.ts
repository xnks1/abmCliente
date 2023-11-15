

enum Rol {

    CLIENTE,
    ADMINISTRADOR

}

export type Usuario = {

    rol: Rol |null;
    auth0Id:string | null;
    username:string | null;
    contraseña:string | null;
    fechaAlta: Date | null;
    fechaBaja: Date | null;
}

