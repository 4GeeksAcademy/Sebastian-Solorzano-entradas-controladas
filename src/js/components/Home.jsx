import React from "react";
import { useState } from "react";
import Tarea from "./Tarea";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
    const [nuevaTarea, setNuevaTarea] = useState()
    let [listaDeTareas, setListaDeTareas] = useState([
        "Practicar programacion",
        "Hacer deporte",
        "Despertarse temprano",
        "Leer una hora al dia",
        "Leer codigo de java script"

    ])
    const agregarTarea = (tecla) => {
        if (tecla === "Enter") {
            setListaDeTareas([...listaDeTareas, nuevaTarea.trim()]);
        }
    }

    let eliminarTarea = (index) => {
        setListaDeTareas(listaDeTareas.filter((_, i) => i !== index));




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
                listaDeTareas.map((tarea, index) => {
                    return (<Tarea key={index} descripcion={tarea} onDelete={() => eliminarTarea(index)} />)

                })
            }
        </div>
    );
};

export default Home