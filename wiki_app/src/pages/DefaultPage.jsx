import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/styles.css";
import "bootstrap/dist/css/bootstrap.css";
import { Player } from '@lottiefiles/react-lottie-player';

function DefaultPage() {
    
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/");
    };

    const handleBuscarPalabras = () => {
        navigate("/buscarPalabras");
    };

    return (
        <div class="grid grid-cols-3 gap-4 px-16 py-10 justify-center">
            <div class=" col-span-3 justify-end"><h1 className="text-2xl text-grisMed">Wikipedia Analysis</h1></div>
            <div class=" col justify-end">
                <button
                    onClick={handleBuscarPalabras}
                    className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-grisMed hover:bg-blue">
                    Búsqueda palabras
                </button>
            </div>
            <div class="col-span-4">
                <h2 className="text-blue">Estadísticas generales</h2>
                <div class="col"><hr class="border-3" /></div>
            </div>

            <div class="col-span-2">
                <div className="text-center">
                    <div className="w-full">
                        <div className="bg-grisBorde py-4 px-4 shadow sm:rounded-lg sm:px-10 text-center">

                        <div className="bg-gris py-2 px-4 shadow sm:rounded-full flex items-center">
                            <h2 id="etiqueta" className="text-lg flex"> No se si se va a usar foreach </h2>
                            <p id="linkActivos" className="ml-auto">#valor a mostrar</p>
                        </div><br/>
                        
                        <div className="bg-gris py-2 px-4 shadow sm:rounded-full flex items-center">
                            <h2 id="etiqueta" className="text-lg flex"> Total títulos </h2>
                            <p id="titulos" className="ml-auto">#titulos</p>
                        </div><br/>

                        <div className="bg-gris py-2 px-4 shadow sm:rounded-full flex items-center">
                            <h2 id="etiqueta" className="text-lg flex"> Palabras distintas </h2>
                            <p id="palabras" className="ml-auto">#palabras</p>
                        </div><br/>

                        <div className="bg-gris py-2 px-4 shadow sm:rounded-full flex items-center">
                            <h2 id="etiqueta" className="text-lg flex"> Links en referencias </h2>
                            <p id="linkReferencias" className="ml-auto">#linkReferencias</p>
                        </div><br/>

                        <div className="bg-gris py-2 px-4 shadow sm:rounded-full flex items-center">
                            <h2 id="etiqueta" className="text-lg flex"> Links activos </h2>
                            <p id="linkActivos" className="ml-auto">#linkActivos</p>
                        </div><br/>

                        <div className="bg-gris py-2 px-4 shadow sm:rounded-full flex items-center">
                            <h2 id="etiqueta" className="text-lg flex"> Nº de referencias utilizadas </h2>
                            <p id="numReferencias" className="ml-auto">#numReferencias</p>
                        </div><br/>

                        <div className="bg-gris py-2 px-4 shadow sm:rounded-full flex items-center">
                            <h2 id="etiqueta" className="text-lg flex"> Imágenes </h2>
                            <p id="imagenes" className="ml-auto">#imagenes</p>
                        </div><br/>

                        <div className="bg-gris py-2 px-4 shadow sm:rounded-full flex items-center">
                            <h2 id="etiqueta" className="text-lg flex"> Imágenes distintas </h2>
                            <p id="imaDistintas" className="ml-auto">#imaDistintas</p>
                        </div><br/>
                        
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-span-2 bg-grisBorde py-4 px-4 shadow sm:rounded-lg sm:px-10 text-center">
                <div class="grid grid-cols-3 text-center">
                    <div><h2 className="text-lg"> Palabras comunes</h2></div>
                    <div ></div>
                    <div><p>¿Pertenece al título?</p></div>
                    <div class="col-span-3"><hr class="border-3" /></div>
                    
                    <div>Palabra</div>
                    <div>hacer for each</div>
                    <div>Sí/No</div>

                    <div>------------</div>
                    <div></div>
                    <div>Sí/No</div>

                    <div>------------</div>
                    <div></div>
                    <div>Sí/No</div>
                    
                </div>
            </div>
            <div class="col-span-3"></div>
            <div class="">
                <button
                    onClick={handleClick}
                    className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-grisMed hover:bg-blue">
                    Volver
                </button>
            </div>
        </div>

    );
}

export default DefaultPage;
