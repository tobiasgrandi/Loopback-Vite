import { useEffect, useState } from "react";
import type { Articulo } from "../types/Articulo";
import { getArticulos, deleteArticulo } from "../api/articuloService";
import styles from "./ArticuloLista.module.css"

export default function ArticuloLista() {
    const [articulos, setArticulos] = useState<Articulo[]>([]);

    const loadArticulos = async () => {
        try {
            const data = await getArticulos();
            setArticulos(data);
        } catch (error) {
            console.error("Error al cargar artículos:", error);
        }
    };

    const handleDelete = async (ID: string) => {
        if (!window.confirm("¿Seguro que querés eliminar este artículo?")) return;
        try {
            await deleteArticulo(ID);
            await loadArticulos(); // refrescar lista
        } catch (error) {
            console.error("Error al eliminar artículo:", error);
        }
    };

    useEffect(() => {
        loadArticulos();
    }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Lista de Artículos</h2>

      {articulos.length === 0 ? (
        <p className={styles.empty}>No hay artículos registrados</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Descripción</th>
              <th>Código</th>
              <th>Costo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {articulos.map((art) => (
              <tr key={art.ID}>
                <td>{art.Descripcion}</td>
                <td>{art.Codigo}</td>
                <td>${art.Costo.toFixed(2)}</td>
                <td>
                  <button
                    onClick={() => handleDelete(art.ID!)}
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
