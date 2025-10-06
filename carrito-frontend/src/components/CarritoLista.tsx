import { useEffect, useState } from "react";
import type { Carrito } from "../types/Carrito";
import { getCarritos, deleteArticulo, deleteCarrito } from "../api/carritoService";
import styles from "./CarritoLista.module.css"
import CarritoUsuario from "./CarritoUsuario";

export default function CarritosLista({ onUpdated }: { onUpdated?: () => void }) {
    const [carritos, setCarritos] = useState<Carrito[]>([]);

    const loadCarritos = async () => {
        try {
            const data = await getCarritos();
            setCarritos(data);
        } catch (error) {
            console.error("Error al cargar carritos:", error);
        }
    };

    const handleRemoveArticulo = async (carritoId: string, articuloId: string) => {
        if (!window.confirm("¿Seguro que querés eliminar este artículo del carrito?")) return;
        try {
            await deleteArticulo(carritoId, articuloId);
            await loadCarritos();
            if (onUpdated) onUpdated();
        } catch (error) {
            console.error("Error al eliminar artículo:", error);
        }
    };

    const handleRemoveCarrito = async (carritoId: string) => {
        if (!window.confirm("¿Seguro que querés eliminar este carrito?")) return;
        try {
            await deleteCarrito(carritoId);
            await loadCarritos();
            if (onUpdated) onUpdated()
        } catch (error){
            alert(`Error al eliminar artículo: ${error}`)
            console.log("Error al eliminar artículo:", error)
        }
    }

    useEffect(() => {
        loadCarritos();
    }, []);

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Carritos</h2>

            {carritos.length === 0 ? (
                <p className={styles.empty}>No hay carritos</p>
            ) : (
                carritos.map((carrito) => (
                    <CarritoUsuario
                        key={carrito.ID}
                        carrito={carrito}
                        handleRemoveArticulo={(articuloId) => handleRemoveArticulo(carrito.ID!, articuloId)}
                        handleRemoveCarrito={() => handleRemoveCarrito(carrito.ID!)}
                    />
                ))
            )}
        </div>
    );
}
