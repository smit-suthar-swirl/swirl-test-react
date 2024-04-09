import React from 'react'
import { SwirlShortVideos } from 'swirl-short-videos-typescript';

const TypeScriptComp = () => {
    const queryParams = Object.fromEntries(new URLSearchParams(window.location.search));
    return (
        <>
            <SwirlShortVideos dataCode={queryParams?.usercode ? queryParams?.usercode : "ifitdn8f"} dataPlalistCode={queryParams?.playlistcode ? queryParams?.playlistcode : "bD7Nkw"} />
        </>
    )
}

export default TypeScriptComp