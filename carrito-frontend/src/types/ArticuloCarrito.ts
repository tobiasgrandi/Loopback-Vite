import type { Articulo } from "./Articulo";

export interface ArticuloCarrito {
    ID?: string;
    Articulo: Articulo;
    Cantidad: number;
}