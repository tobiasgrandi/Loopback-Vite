import { useState, useEffect } from "react";
import type { Carrito } from "../types/Carrito";
import type { Usuario } from "../types/Usuario";
import { createCarrito } from "../api/carritoService";
import { getUsuarios } from "../api/usuarioService";
import styles from "./CarritoCrear.module.css";

export default function CarritoCrear({ onCreated }: { onCreated: () => void }) {
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [usuarioId, setUsuarioId] = useState<string>("");

    useEffect(() => {
        const loadUsuarios = async () => {
            try {
                const data = await getUsuarios();
                setUsuarios(data);
            } catch (error: any) {
                const msg = error?.response?.data?.error?.message;
                alert(`Error cargando usuarios: ${msg}`);
                console.error("Error cargando usuarios:", error);
            }
        };
        loadUsuarios();
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const usuario = usuarios.find(u => u.ID === usuarioId);
        if (!usuario) return alert("Seleccioná un usuario");

        const nuevoCarrito: Omit<Carrito, "ID"> = {
            Usuario: usuario,
            ListaArticulos: [],
        };

        try {
            await createCarrito(nuevoCarrito);
            setUsuarioId("");
            onCreated();
        } catch (error: any) {
            const msg = error?.response?.data?.error?.message;
            alert(`Error al crear el carrito ${msg}`);
            onCreated();
        }
    };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h3 className={styles.title}>Crear Carrito</h3>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map(u => (
              <tr
                key={u.ID}
                className={usuarioId === u.ID ? styles.selectedRow : ""}
                onClick={() => setUsuarioId(u.ID!)}
              >
                <td>{u.Nombre}</td>
                <td>{u.Email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        type="submit"
        className={styles.button}
        disabled={!usuarioId}
      >
        Crear carrito
      </button>
    </form>
  );
}
