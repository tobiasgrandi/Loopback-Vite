import { useState } from "react";
import UsuarioCrear from "./UsuarioCrear";
import UsuariosLista from "./UsuariosLista";

export default function UsuariosGestion() {
    const [refresh, setRefresh] = useState(false);

    const handleRefresh = () => setRefresh((prev) => !prev);

    return (
        <div>
            <h1>Gestión de Usuarios</h1>
            <UsuarioCrear onCreated={handleRefresh} />
            <UsuariosLista key={refresh ? 'r1' : 'r2'} />
        </div>
    );
}