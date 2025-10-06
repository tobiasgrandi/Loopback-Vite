import { useState } from "react";
import CarritoCrear from "./CarritoCrear";
import CarritoLista from "./CarritoLista";
import CarritoAgregarArticulo from "./CarritoAgregarArticulo";

export default function CarritosGestion() {
    const [refresh, setRefresh] = useState(false);
    const handleRefresh = () => setRefresh((prev) => !prev);

    return (
        <div>
            <h1>Gestión de Carritos</h1>
            <CarritoCrear onCreated={handleRefresh} />
            <CarritoAgregarArticulo onUpdated={handleRefresh} refresh={refresh} />
            <CarritoLista key={refresh ? "r1" : "r2"} />
        </div>
    );
}
