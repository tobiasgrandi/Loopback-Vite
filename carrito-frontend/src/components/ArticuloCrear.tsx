import { useState } from "react";
import type { Articulo } from "../types/Articulo";
import { createArticulo } from "../api/articuloService";
import styles from "./ArticuloCrear.module.css";

export default function ArticuloCrear({ onCreated }: { onCreated: () => void }) {
  const [descripcion, setDescripcion] = useState("");
  const [codigo, setCodigo] = useState("");
  const [costo, setCosto] = useState<number>(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const nuevoArticulo: Omit<Articulo, "ID"> = { Descripcion: descripcion, Codigo: codigo, Costo: costo };
    try {
      await createArticulo(nuevoArticulo);
      setDescripcion("");
      setCodigo("");
      setCosto(0);
      onCreated(); // refresca la lista
    } catch (error) {
      console.error("Error al crear artículo:", error);
    }
  };

  return (
      <form onSubmit={handleSubmit} className={styles.form}>
        <h3 className={styles.title}>Crear Artículo</h3>

        <input
          type="text"
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          required
          className={styles.input}
        />

        <input
          type="text"
          placeholder="Código"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
          required
          className={styles.input}
        />

        <input
          type="number"
          placeholder="Costo"
          value={costo === 0 ? "" : costo}
          onChange={(e) => setCosto(Number(e.target.value))}
          required
          className={styles.input}
        />

        <button type="submit" className={styles.button}>
          Crear
        </button>
      </form>
  );
}
