import { useState } from "react";
import ArticuloCrear from "./ArticuloCrear";
import ArticuloLista from "./ArticuloLista";

export default function ArticulosGestion() {
    const [refresh, setRefresh] = useState(false);

    const handleRefresh = () => setRefresh((prev) => !prev);

    return (
        <div>
            <h1>Gestión de Artículos</h1>
            <ArticuloCrear onCreated={handleRefresh} />
            <ArticuloLista key={refresh ? "r1" : "r2"} />
        </div>
    );
}
