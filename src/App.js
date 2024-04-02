import logo from './logo.svg';
import './App.css';
// import SwirlShortVideos from './SwirlShortVideos';
import { SwirlShortVideos } from "swirl-short-videos-typescript"
function App() {
  const queryParams = Object.fromEntries(new URLSearchParams(window.location.search));
  return (

    // <SwirlShortVideos dataCode="ifitdn8f" dataPlalistCode="bD7Nkw" />
    <>
      <SwirlShortVideos dataCode={queryParams?.usercode ? queryParams?.usercode : "ifitdn8f"} dataPlalistCode={queryParams?.playlistcode ? queryParams?.playlistcode : "bD7Nkw"} />
    </>
  );
}

export default App;
