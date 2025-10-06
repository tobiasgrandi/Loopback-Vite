import type { LineaCarrito } from "./LineaCarrito";
import type { Usuario } from "./Usuario";

export interface Carrito {
    ID?: string;
    Usuario: Usuario;
    ListaArticulos: LineaCarrito[];
}