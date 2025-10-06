import { useEffect, useState } from "react";
import type { Usuario } from "../types/Usuario";
import { getUsuarios, deleteUsuario } from "../api/usuarioService";
import styles from "./UsuariosLista.module.css";

export default function UsuariosLista() {
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);

    const loadUsuarios = async () => {
        try {
            const data = await getUsuarios();
            setUsuarios(data);
        } catch (error) {
            alert("Error al cargar usuarios")
            console.error("Error al cargar usuarios: ", error);
        };
    }

    const handleDelete = async (ID: string) => {
        if (!window.confirm('¿Seguro que querés eliminar este usuario?')) return;
        try {
            await deleteUsuario(ID);
            await loadUsuarios();
        } catch (error) {
            alert('Error al eliminar usuario')
            console.log('Error al eliminar usuario: ', error);
        }
    };

    useEffect(() => {
        loadUsuarios();
    }, []);

    return (
    <div className={styles.container}>
      <h2 className={styles.title}>Lista de Usuarios</h2>

      {usuarios.length === 0 ? (
        <p className={styles.empty}>No hay usuarios registrados</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usr) => (
              <tr key={usr.ID}>
                <td>{usr.Nombre}</td>
                <td>{usr.Email}</td>
                <td>
                  <button
                    onClick={() => handleDelete(usr.ID!)}
                    className={styles.deleteButton}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    );
}