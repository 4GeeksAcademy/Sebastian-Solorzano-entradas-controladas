import React from "react";
import { useState, useEffect } from "react";
import Tarea from "./Tarea";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
    const apiUrl = "https://playground.4geeks.com/todo/users/Sebastian"

    const [nuevaTarea, setNuevaTarea] = useState("")

    let [listaDeTareas, setListaDeTareas] = useState([]);

    const onload = () => {
        fetch(apiUrl).then(response => {
            return response.json()
        }).then(datos => {
            setListaDeTareas(datos.todos)
        })


    }
    useEffect(onload, [])




    const agregarTarea = (tecla) => {
        if (tecla === "Enter") {

            //setListaDeTareas([...listaDeTareas, nuevaTarea.trim()]);
            fetch('https://playground.4geeks.com/todo/todos/Sebastian', {
                method: "POST",
                body: JSON.stringify({
                    label:nuevaTarea,
                    is_done:false

                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(resp => {
                    console.log(resp.ok); 
                    if (resp.ok) {
                        setNuevaTarea("");
                        onload();
                    }
                    console.log(resp.status); 
                    return resp.json(); 
                })
                .then(data => {
                    
                    console.log(data); 
                    
                })
                .catch(error => {
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
                    console.log(resp.status); 
                    
                })
                
                .catch(error => {
                    console.log(error);
                });





    }
    return (
        <div className="text-center">
            <div>
                <h1>Todos</h1>
                <input onChange={evento => setNuevaTarea(evento.target.value)} type="text" value={nuevaTarea}
                    onKeyUp={evento => agregarTarea(evento.key)}
                />
            </div>
            {
                listaDeTareas.map((tarea, index) => {
                    return (<Tarea key={index} descripcion={tarea.label} onDelete={() => eliminarTarea(tarea.id)} />)

                })
            }
        </div>
    );
};

export default Home