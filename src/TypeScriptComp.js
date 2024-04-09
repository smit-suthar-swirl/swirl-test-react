import React from 'react'
import { Link } from 'react-router-dom';
import { SwirlShortVideos } from 'swirl-short-videos-typescript';

const TypeScriptComp = () => {
    const queryParams = Object.fromEntries(new URLSearchParams(window.location.search));

    return (
        <>
            <Link to={`/javascript${window.location.search ? window.location.search : ""}`}>javascript</Link>
            <SwirlShortVideos dataCode={queryParams?.usercode ? queryParams?.usercode : "ifitdn8f"} dataPlalistCode={queryParams?.playlistcode ? queryParams?.playlistcode : "bD7Nkw"} />
        </>
    )
}

export default TypeScriptComp