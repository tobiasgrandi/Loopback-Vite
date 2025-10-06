import type { Articulo } from "./Articulo";

export interface LineaCarrito {
    ID?: string;
    Articulo: Articulo;
    Cantidad: number;
    Subtotal: number;
}