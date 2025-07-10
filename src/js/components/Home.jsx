import React from "react";
import { useState, useEffect } from "react";
import Tarea from "./Tarea";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
    const apiUrl = " https://playground.4geeks.com/todo/users/Sebastian"

    const [nuevaTarea, setNuevaTarea] = useState([])

    let [listaDeTareas, setListaDeTareas] = useState("");

    const onload = () => {
        fetch(apiUrl).then(response => {
            return response.json()
        }).then(datos => {
            setNuevaTarea(datos.todos)
        })


    }
    useEffect(onload, [])




    const agregarTarea = (tecla) => {
        if (tecla === "Enter") {

            //setListaDeTareas([...listaDeTareas, nuevaTarea.trim()]);
            fetch('https://playground.4geeks.com/todo/todos/Sebastian', {
                method: "POST",
                body: JSON.stringify({
                    label:listaDeTareas,
                    is_done:false

                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(resp => {
                    console.log(resp.ok); 
                    if (resp.ok) {
                        //onload()
                        setListaDeTareas("")
                    }
                    console.log(resp.status); // El código de estado 201, 300, 400, etc.
                    return resp.json(); // Intentará parsear el resultado a JSON y retornará una promesa donde puedes usar .then para seguir con la lógica
                })
                .then(data => {
                    // Aquí es donde debe comenzar tu código después de que finalice la búsqueda
                    console.log(data); // Esto imprimirá en la consola el objeto exacto recibido del servidor
                    setListaDeTareas([...listaDeTareas, data]);
                })
                .catch(error => {
                    // Manejo de errores
                    console.log(error);
                });
        }
    }

    let eliminarTarea = (id) => {
        //setListaDeTareas(listaDeTareas.filter((_, i) => i !== index));
        fetch('https://playground.4geeks.com/todo/todos/'+ id, {
                method: "DELETE",
                
            })
                .then(resp => {
                    console.log(resp.ok); 
                    if (resp.ok) {
                        onload()
                        
                    }
                    console.log(resp.status); // El código de estado 201, 300, 400, etc.
                    
                })
                
                .catch(error => {
                    // Manejo de errores
                    console.log(error);
                });





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
                    return (<Tarea key={index} descripcion={tarea} onDelete={() => eliminarTarea(tarea.id)} />)

                })
            }
        </div>
    );
};

export default Home