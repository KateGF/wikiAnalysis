import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function PaginaBuscarPalabras() {
    const navigate = useNavigate();
    const [searchKeyword, setSearchKeyword] = useState('');
    const [searchResults, setSearchResults] = useState([]);
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
            const response = await axios.get(`http://localhost:3000/search/titles/${searchKeyword}`);
            setSearchResults(response.data);
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
        // Check if subtitles is an array
        if (Array.isArray(imagesArray)) {
            return imagesArray.map((image, index) => (
                <img key={index} src={image.src} alt={image.alt} />
            ));
        }
    }

    function trimContent(content) {
        const maxLength = 100; // Set your desired maximum length
        return content.length > maxLength ? `${content.substr(0, maxLength)}...` : content;
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
                    {searchResults.map((result) => (
                        <div id={result.id} key={result.id}>
                            <h2>{result.title}</h2>
                            {formatSubtitles(result.subtitles)}
                            <h2>Images</h2>
                            {formatImages(result.images)}
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}

export default PaginaBuscarPalabras;
