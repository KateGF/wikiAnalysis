import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { hadoopResults } from "../static/data";
import Hadoop from "./Hadoop";

function BusquedaProyecto() {
    const navigate = useNavigate();
    const [searchKeyword, setSearchKeyword] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showSubtitles, setShowSubtitles] = useState(false);

    const handleDefault = () => {
        navigate("/defaultPage");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.get(`http://localhost:3000/search/word/${searchKeyword}`);
            setSearchResults(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
            setError('Error fetching data. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    function formatSubtitles(subtitles) {
        // Check if subtitles is defined and not null
        if (subtitles && subtitles !== 'undefined') {
            try {
                // Split the subtitles string into an array based on commas
                const subtitlesArray = subtitles.split(',').map((subtitle) => subtitle.trim());

                // Check if subtitlesArray is an array and not empty
                if (Array.isArray(subtitlesArray) && subtitlesArray.length > 0) {
                    return subtitlesArray.map((subtitle, index) => (
                        <div key={index} className="mb-2">
                            <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">{subtitle}</span>
                        </div>
                    ));
                }
            } catch (error) {
                console.error('Error parsing subtitles:', error);
                return <p>Error parsing subtitles. Please try again.</p>;
            }
        }

        return null; // Return null if subtitles is undefined or null
    }

    function formatTags(tags) {
        // Check if tags is defined and not null
        if (tags && tags !== 'undefined') {
            try {
                // Split the tags string into an array based on commas
                const tagsArray = tags.split(',').map((tag) => tag.trim());

                // Check if tagsArray is an array and not empty
                if (Array.isArray(tagsArray) && tagsArray.length > 0) {
                    return (
                        <div className="flex flex-wrap">
                            {tagsArray.map((tag, index) => (
                                <span key={index} className="bg-green-100 text-green-800 text-xs font-medium me-2 mb-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300 break-all">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    );
                }
            } catch (error) {
                console.error('Error parsing tags:', error);
                return <p>Error parsing tags. Please try again.</p>;
            }
        }

        return null; // Return null if tags is undefined or null
    }

    useEffect(() => {
        // You can add additional logic or use another useEffect for other searches (subtitles, content, etc.)
    }, [searchResults]); // Add dependencies if needed

    return (
        <div className="grid grid-cols-4 gap-4 px-16 py-10 justify-center">
            <header className="col-span-3 justify-end">
                <h1 className="text-2xl text-blue">Wikipedia Analysis</h1>
                <button
                    onClick={handleDefault}
                    className="group relative  h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-grisMed hover:bg-blue">
                    Volver
                </button>
            </header>

            <div className="col-span-2">
                <form onSubmit={handleSubmit}>
                    <div className="flex">
                        <div className="relative w-full">
                            <input
                                type="search"
                                id="search"
                                value={searchKeyword}
                                onChange={(e) => setSearchKeyword(e.target.value)}
                                className="..."
                                placeholder="Búsqueda de palabras por página"
                                required
                            />
                            <button
                                type="submit"
                                className="..."
                            >
                                <svg
                                    className="w-4 h-4"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                    />
                                </svg>
                                <span className="sr-only">Buscar</span>
                            </button>
                        </div>
                    </div>
                </form>
                <hr className="border-3" />
                <div className="text-center">
                    {isLoading && <p>Loading...</p>}
                    {error && <p>Error: {error}</p>}
                    {searchResults.length > 0 && searchResults.map((result) => (
                        <div id={result.id} key={result.id}>
                            <h2>{result.title}</h2>
                            <div>
                                <strong>Aparece en las páginas de wikipedia:</strong>
                                <button
                                    onClick={() => setShowSubtitles(!showSubtitles)}
                                    className="ml-2 text-blue-500 hover:underline focus:outline-none"
                                >
                                    {showSubtitles ? 'Hide' : 'Show'}
                                </button>
                                {showSubtitles && formatSubtitles(result.aparece_en)}
                            </div>
                            <div>
                                <strong>Tags:</strong> {formatTags(result.tags)}
                            </div>
                            <div>
                                <strong>Porcentaje total en comparación con el resto de palabras:</strong> {result.porcentaje}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="col-span-2">
                {hadoopResults.map((hadoop) => (
                    <div>
                        <Hadoop logData={hadoop}></Hadoop>
                        <hr></hr>
                    </div>
                ))}

            </div>
        </div>
    );
}

export default BusquedaProyecto;

