import { useState } from "react";
import type { Usuario } from "../types/Usuario";
import { createUsuario } from "../api/usuarioService";
import styles from "./UsuarioCrear.module.css";

export default function UsuarioCrear({ onCreated }: { onCreated: () => void }) {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newUsuario: Omit<Usuario, "ID"> = { Nombre: nombre, Email: email };
        try {
            await createUsuario(newUsuario);
            setNombre('');
            setEmail('');
            onCreated();
        } catch (error: any) {
            const msg = error?.response?.data?.error?.message;
            alert(`Error al crear usuario: ${msg}`)
            console.error("Error al crear usuario: ", error)
        }
    };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h3 className={styles.title}>Crear usuario</h3>

      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
        className={styles.input}
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className={styles.input}
      />

      <button type="submit" className={styles.button}>
        Crear
      </button>
    </form>
  );
}