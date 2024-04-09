import React from 'react'
import { SwirlShortVideos } from 'swirl-short-videos';
import "./javascript.css"
const JavascriptComp = () => {
    const queryParams = Object.fromEntries(new URLSearchParams(window.location.search));
    return (
        <>
            <SwirlShortVideos dataCode={queryParams?.usercode ? queryParams?.usercode : "ifitdn8f"} dataPlalistCode={queryParams?.playlistcode ? queryParams?.playlistcode : "bD7Nkw"} />
        </>
    )
}

export default JavascriptComp