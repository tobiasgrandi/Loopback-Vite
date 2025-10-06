import axios from 'axios'
import type { Articulo } from "../types/Articulo.ts";


const BASE_URL = 'http://localhost:3000';

export async function createArticulo(articulo: Omit<Articulo, 'ID'>): Promise<Articulo> {
    const response = await axios.post(`${BASE_URL}/articulos`, articulo)
    return response.data
}

export async function getArticulos(): Promise<Articulo[]> {
    const response = await axios.get(`${BASE_URL}/articulos`)
    return response.data
}

export async function deleteArticulo(articuloId: string): Promise<void> {
    const response = await axios.delete(`${BASE_URL}/articulos/${articuloId}`)
    return response.data
}

export async function setDescripcion(articuloId: string, descripcion: string): Promise<Articulo> {
    const response = await axios.patch(`${BASE_URL}/articulos/${articuloId}/descripcion`, { descripcion })
    return response.data
}

export async function setCosto(articuloId: string, costo: string): Promise<Articulo> {
    const response = await axios.patch(`${BASE_URL}/articulos/${articuloId}/costo`, { costo })
    return response.data
}

export async function setCodigo(articuloId: string, codigo: string): Promise<Articulo> {
    const response = await axios.patch(`${BASE_URL}/articulos/${articuloId}/descripcion`, { codigo })
    return response.data
}