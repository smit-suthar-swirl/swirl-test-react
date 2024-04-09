
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import JavascriptComp from './JavascriptComp';
import TypeScriptComp from './TypeScriptComp';

// import SwirlShortVideos from './SwirlShortVideos';

function App() {

  return (
    <>
      <Router>
        <Routes>
          {/* <Route path="/typescript" element={<TypeScriptComp />} /> */}
          <Route path="/javascript" element={<JavascriptComp />} />
          <Route path="/" element={<JavascriptComp />} />
          <Route path="*" element={<h3>404 Page Not Found !</h3>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
