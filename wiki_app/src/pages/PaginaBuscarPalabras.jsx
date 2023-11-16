import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/styles.css";
import "bootstrap/dist/css/bootstrap.css";
import { Player } from '@lottiefiles/react-lottie-player';

function PaginaBuscarPalabras() {
    
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/");
    };

    const handleDefault = () => {
        navigate("/defaultPage");
    };

    return (
        <div class="grid grid-cols-3 gap-4 px-16 py-10 justify-center">
            <div class=" col-span-3 justify-end"><h1 className="text-2xl text-blue">Wikipedia Analysis</h1></div>
            <div class="">
                <button
                    onClick={handleDefault}
                    className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-grisMed hover:bg-blue">
                    Volver
                </button>
            </div>
            <div class="col-span-4">
              
            
<form>
    <div class="flex">
    
        <div class="relative w-full">
            <input type="search" id="search" class="block p-2.5 w-full z-20 text-sm text-gray-600 bg-gray-50 rounded-lg border-s-gray-50 border-3 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-transparent dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" 
            placeholder="Búsqueda de palabras por página" required/>
            <button type="submit" class="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-grisMed bg-blue-600 rounded-lg border-3 border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
                <span class="sr-only">Buscar</span>
            </button>
        </div>
    </div>
</form>




                <div class="col"><hr class="border-3" /></div>
            </div>

            <div class="col-span-2">
                <div className="text-center">
                    <div className="w-full">
                        <div className="bg-grisBorde py-4 px-4 shadow sm:rounded-lg sm:px-10 text-center">

                        <div className="bg-gris py-2 px-4 shadow sm:rounded-full flex items-center">
                            <h2 id="etiqueta" className="text-lg flex"> No sé si se va a usar foreach </h2>
                            <p id="linkActivos" className="ml-auto">#valor a mostrar</p>
                        </div><br/>
                        
                        <div className="bg-gris py-2 px-4 shadow sm:rounded-full flex items-center">
                            <h2 id="etiqueta" className="text-lg flex"> Páginas </h2>
                            <p id="paginas" className="ml-auto">#paginas</p>
                        </div><br/>

                        <div className="bg-gris py-2 px-4 shadow sm:rounded-full flex items-center">
                            <h2 id="etiqueta" className="text-lg flex"> Cantidad </h2>
                            <p id="cantidad" className="ml-auto">#cantidad</p>
                        </div><br/>

                        <div className="bg-gris py-2 px-4 shadow sm:rounded-full flex items-center">
                            <h2 id="etiqueta" className="text-lg flex"> Porcentaje </h2>
                            <p id="porcentaje" className="ml-auto">#porcentaje</p>
                        </div><br/>
                        
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-span-2 bg-grisBorde py-4 px-4 shadow sm:rounded-lg sm:px-10 text-center">
                <div class="grid grid-cols-3 text-center">
                    <div><h2 className="text-lg"> Tags</h2></div>
                    <div ></div>
                    <div><h2 className="text-lg">Porcentaje</h2></div>
                    <div class="col-span-3"><hr class="border-3" /></div>
                    
                    <div>Palabra</div>
                    <div>hacer for each</div>
                    <div>%%%</div>

                    <div>------------</div>
                    <div></div>
                    <div>------------</div>

                    <div>------------</div>
                    <div></div>
                    <div>------------</div>
                    
                </div>
            </div>
            <div class="col-span-3"></div>
            <div class=""></div>
        </div>

    );
}

export default PaginaBuscarPalabras;
