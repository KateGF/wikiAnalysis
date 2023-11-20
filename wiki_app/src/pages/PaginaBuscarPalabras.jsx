import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function PaginaBuscarPalabras() {
    const navigate = useNavigate();
    const [searchKeyword, setSearchKeyword] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [additionalInfo, setAdditionalInfo] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleDefault = () => {
        navigate("/defaultPage");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            // Make the first request to get search results and additional information
            const [response, additionalResponse] = await Promise.all([
                axios.get(`http://localhost:3000/search/titles/${searchKeyword}`),
                axios.get(`http://localhost:3000/search/hadoop/${searchKeyword}`)
            ]);

            setSearchResults(response.data);
            setAdditionalInfo(additionalResponse.data);

        } catch (error) {
            console.error('Error fetching data:', error);
            setError('Error fetching data. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    function formatSubtitles(subtitles) {
        const subtitlesArray = JSON.parse(subtitles);
        // Check if subtitles is an array
        if (Array.isArray(subtitlesArray)) {
            return subtitlesArray.map((subtitle, index) => (
                <span key={index} className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">{subtitle}</span>
            ));
        }
    }

    function formatImages(images) {
        const imagesArray = JSON.parse(images);
        // Check if images is an array
        if (Array.isArray(imagesArray)) {
            return imagesArray.map((image, index) => (
                <img key={index} src={image.src} alt={image.alt} />
            ));
        }
    }

    useEffect(() => {
        // You can add additional logic or use another useEffect for other searches (subtitles, content, etc.)
    }, [searchResults, additionalInfo]); // Add dependencies if needed

    return (
        <div className="grid grid-cols-4 gap-4 px-16 py-10 justify-center">
            <header className="col-span-3 justify-end">
                <h1 className="text-2xl text-blue">Wikipedia Analysis</h1>
                <button
                    onClick={handleDefault}
                    className="group relative h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-grisMed hover:bg-blue"
                >
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
                    {searchResults.length > 0 && (
                        <div id={searchResults[0].id} key={searchResults[0].id}>
                            <h2>{searchResults[0].title}</h2>
                            {formatSubtitles(searchResults[0].subtitles)}
                            <h2>Images</h2>
                            {formatImages(searchResults[0].images)}
                            {/* Render additional information from the second request */}
                            {additionalInfo && (
                                <div>
                                    <h2>Additional Information</h2>
                                    {Object.entries(additionalInfo).map(([key, value]) => (
                                        <div key={key} className="mb-4">
                                            <h3 className="text-lg font-bold mb-2">{key}</h3>
                                            {typeof value === 'object' ? (
                                                // If the value is an object, convert it to an array and render
                                                Object.entries(value).map(([subKey, subValue]) => (
                                                    <p key={subKey} className="mb-1">
                                                        <strong>{subKey}:</strong> {subValue}
                                                    </p>
                                                ))
                                            ) : (
                                                // If the value is not an object, render it directly
                                                <p>{value}</p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default PaginaBuscarPalabras;
