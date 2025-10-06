import type { Carrito } from "../types/Carrito";
import styles from "./CarritoUsuario.module.css";


export default function CarritoUsuario({ carrito, handleRemoveArticulo, handleRemoveCarrito }: 
  { carrito: Carrito; handleRemoveArticulo: (articuloId: string) => void; handleRemoveCarrito: () => void }) {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Carrito de {carrito.Usuario.Nombre}</h2>

      {carrito.ListaArticulos.length === 0 ? (
        <p className={styles.empty}>No hay artículos en el carrito</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Descripción</th>
              <th>Código</th>
              <th>Costo</th>
              <th>Cantidad</th>
              <th>Subtotal</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {carrito.ListaArticulos.map((linea) => (
              <tr key={linea.Articulo.ID}>
                <td>{linea.Articulo.Descripcion}</td>
                <td>{linea.Articulo.Codigo}</td>
                <td>${linea.Articulo.Costo.toFixed(2)}</td>
                <td>{linea.Cantidad}</td>
                <td>${linea.Subtotal?.toFixed(2)}</td>
                <td>
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleRemoveArticulo(linea.Articulo.ID!)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button
        className={styles.deleteButton}
        onClick={() => handleRemoveCarrito()}
      >
        Eliminar Carrito
      </button>
    </div>
  );
}
