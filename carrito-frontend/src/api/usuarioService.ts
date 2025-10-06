import axios from 'axios'
import type { Usuario } from "../types/Usuario.ts";


const BASE_URL = 'http://localhost:3000';

export async function createUsuario(usuario: Omit<Usuario, 'ID'>): Promise<Usuario> {
    const response = await axios.post(`${BASE_URL}/usuarios`, usuario)
    return response.data
}

export async function getUsuarios(): Promise<Usuario[]> {
    const response = await axios.get(`${BASE_URL}/usuarios`)
    return response.data
}

export async function deleteUsuario(usuarioId: string): Promise<void> {
    const response = await axios.delete(`${BASE_URL}/usuarios/${usuarioId}`)
    return response.data
}

export async function setNombre(usuarioId: string, nombre: string): Promise<Usuario> {
    const response = await axios.patch(`${BASE_URL}/usuarios/${usuarioId}/nombre`, { nombre })
    return response.data
}

export async function setEmail(usuarioId: string, email: string): Promise<Usuario> {
    const response = await axios.patch(`${BASE_URL}/usuarios/${usuarioId}/email`, { email })
    return response.data
}