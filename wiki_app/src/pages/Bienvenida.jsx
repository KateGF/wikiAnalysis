import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/styles.css";
import "bootstrap/dist/css/bootstrap.css";
import { Player } from '@lottiefiles/react-lottie-player';

function Bienvenida() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/defaultPage");
  };
  return (
    <div class="grid grid-cols-3 px-10 py-10 justify-center">
      <div className="col-span-3 main-h-screen flex flex-col justify-center">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <p className="text-center text-2xl font-regular">Bienvenido a</p>
          <h1 className="text-center text-4xl text-blue">
            Wikipedia Analysis
          </h1>
        </div>
        <div class="col"><hr class="border-3" /></div>
      </div>

      <div className="px-40">
              <Player
                  src='https://lottie.host/7bf4941b-e4d3-44c7-8356-aefe56361668/MC5K3cG3gQ.json'
                  style={{ height: '500px', width: '500px' }}
                  className="player"
                  loop
                  autoplay
                />
          </div>
      
      <div className="col-span-2 main-h-screen flex flex-col justify-center px-24">
        <div className="my-4  sm:mx-auto sm:w-full sm:max-w-lg">
          <div className="bg-grisBorde py-4 px-4 shadow sm:rounded-lg sm:px-10">
            <div>
              <h2 className="text-center text-2xl font-semibold">Página Principal</h2>
              <p className="text-center mx-8">
                A continuación, se mostrará las estadísticas generales obtenidas
                a partir del análisis realizado
              </p>
            </div>
            <div className="bg-gris py-2 px-4 shadow sm:rounded-lg sm:px-8">
              <div>
                <br/>
                <button
                  onClick={handleClick}
                  className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-grisMed hover:bg-blue">
                  VER RESULTADOS
                </button>
              </div>
              <div>
                <br />
                <h1 className="text-center text-2xl">
                  Integrantes del proyecto
                </h1>
                <hr class="border-3" />
                <p className="text-center"> Jefazo John Solís Castro </p>
                <p className="text-center"> Katerine Guzmán Flores </p>
                <p className="text-center"> Evelyn Cruz Solís </p>
                <p className="text-center"> Alejandro Barreda Acevedo </p>
              </div>
            </div>
            <br />
          </div>
          
        </div>
        
      </div>
      
    </div>

  );
}

export default Bienvenida;
