import React from 'react'
import { SwirlShortVideos } from 'swirl-short-videos';
import "./javascript.css"
import { Link } from 'react-router-dom';
const JavascriptComp = () => {
    const queryParams = Object.fromEntries(new URLSearchParams(window.location.search));
    return (
        <>
            <Link to={`/typescript${window.location.search ? window.location.search : ""}`}>typescript</Link>
            <SwirlShortVideos dataCode={queryParams?.usercode ? queryParams?.usercode : "ifitdn8f"} dataPlalistCode={queryParams?.playlistcode ? queryParams?.playlistcode : "bD7Nkw"} />
        </>
    )
}

export default JavascriptComp