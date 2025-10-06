import { useState, useEffect } from "react";
import type { Carrito } from "../types/Carrito";
import type { Articulo } from "../types/Articulo";
import { getCarritos, addArticulo } from "../api/carritoService";
import { getArticulos } from "../api/articuloService";
import styles from "./CarritoAgregarArticulo.module.css";

export default function CarritoAgregarArticulo({ onUpdated, refresh }: { onUpdated: () => void, refresh: boolean }) {
    const [carritos, setCarritos] = useState<Carrito[]>([]);
    const [articulos, setArticulos] = useState<Articulo[]>([]);
    const [selectedCarrito, setSelectedCarrito] = useState<string>("");
    const [selectedArticulo, setSelectedArticulo] = useState<string>("");
    const [cantidad, setCantidad] = useState<number>(1);

    useEffect(() => {
        const loadData = async () => {
            setCarritos(await getCarritos());
            setArticulos(await getArticulos());
        };
        loadData();
    }, [refresh]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!selectedCarrito || !selectedArticulo || !cantidad) return;

        const art = articulos.find((a) => a.ID === selectedArticulo);
        if (!art) return;

        try {
            await addArticulo(selectedCarrito, art, cantidad);
            setSelectedArticulo("");
            setSelectedCarrito("");
            setCantidad(1);
            onUpdated();
        } catch (error) {
            console.error("Error al agregar artículo:", error);
        }
    };

 return (
    <form onSubmit={handleSubmit} className={styles.form}>
        <h3 className={styles.title}>Agregar Artículo a Carrito</h3>
        <span className={styles.InputText}>Carrito</span>
        <select
            value={selectedCarrito}
            onChange={(e) => setSelectedCarrito(e.target.value)}
            required
            className={styles.select}
        >
            <option value="">Seleccionar carrito</option>
            {carritos.map((c) => (
            <option key={c.ID} value={c.ID}>
                {c.Usuario.Nombre} ({c.Usuario.Email})
            </option>
            ))}
        </select>
        <span className={styles.InputText}>Artículo</span>
        <select
            value={selectedArticulo}
            onChange={(e) => setSelectedArticulo(e.target.value)}
            required
            className={styles.select}
        >
            <option value="">Seleccionar artículo</option>
            {articulos.map((a) => (
            <option key={a.ID} value={a.ID}>
                {a.Descripcion} | {a.Codigo}
            </option>
            ))}
        </select>
        <span className={styles.InputText}>Cantidad</span>
        <input
          type="number"
          placeholder="Cantidad"
          value={cantidad === 0 ? "" : cantidad}
          onChange={(e) => setCantidad(Number(e.target.value))}
          required
          min={1}
          step="1"
          className={styles.select}
        />

      <button type="submit" className={styles.button}>
        Agregar
      </button>
    </form>
  );
}
