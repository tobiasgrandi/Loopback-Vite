import axios from 'axios';
import type { Articulo } from '../types/Articulo';
import type { Usuario } from '../types/Usuario';
import type { Carrito } from '../types/Carrito';
import type { ArticuloCarrito } from '../types/ArticuloCarrito';

const BASE_URL = 'http://localhost:3000';

export async function createCarrito(carrito: Omit<Carrito, 'id'>): Promise<Carrito> {
    const response = await axios.post(`${BASE_URL}/carritos`, carrito)
    return response.data
}

export async function deleteCarrito(carritoId: string): Promise<void> {
    const response = await axios.delete(`${BASE_URL}/carritos/${carritoId}`)
    return response.data
}

export async function getCarritos(): Promise<Carrito[]> {
    const response = await axios.get(`${BASE_URL}/carritos`)
    return response.data
}

export async function getListaArticulos(carritoId: string): Promise<ArticuloCarrito[]> {
    const response = await axios.get(`${BASE_URL}/carritos/${carritoId}/listaArticulos`);
    return response.data
}

export async function addArticulo(carritoId: string, articulo: Articulo, cantidad: number = 1): Promise<Carrito> {
    const body = {art: articulo, cantidad: cantidad};
    const response = await axios.post(`${BASE_URL}/carritos/${carritoId}/articulos`, body);
    return response.data;
}

export async function deleteArticulo(carritoId: string, articuloId: string): Promise<Carrito> {
    const response = await axios.post(`${BASE_URL}/carritos/${carritoId}/articulos/remove`, { id: articuloId })
    return response.data
}

export async function setUsuario(carritoId: string, usuario: Usuario): Promise<Carrito> {
    const response = await axios.post(`${BASE_URL}/carritos/${carritoId}/usuario`, usuario);
    return response.data;
}