import React from "react";
import { useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
    const [nuevaTarea, setNuevaTarea] = useState()
    let [ListaDeTareas, setListaDeTareas] = useState([
        "Practicar programacion",
        "Hacer deporte",
        "Despertarse temprano",
        "Leer una hora al dia",
        "Hacer las compras"

    ])
    const agregarTarea = (tecla) => {
        if (tecla === "Enter") {
            setListaDeTareas([...ListaDeTareas, nuevaTarea.trim()]);

        }


}
    return (
        <div className="text-center">
            <div>
                <h1>Todos</h1>
                <input onChange={evento => setNuevaTarea(evento.target.value)} type="text" value={nuevaTarea || ""} 
                onKeyUp={evento => agregarTarea(evento.key)}
                />
            </div>
            {
                ListaDeTareas.map((tarea, index) => {
                    return <p key={index}>{tarea} </p>

                })
            }
        </div>
    );
};

export default Home