import { Routes, Route } from "react-router-dom";
import Main from "./pages/Main.tsx";
import Nav from "./components/Navigation.tsx";
import TemplateOne from "./pages/TemplateOne.tsx";
import TemplateTwo from "./pages/TemplateTwo.tsx";
import TemplateThree from "./pages/TemplateThree.tsx";
import TemplateDiagonal from "./pages/TemplateDiagonal.tsx"
import MapStuff from './pages/MapStuff.tsx'
import Draw from './pages/DrawPage.tsx'

import "./App.css";

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/home" element={<Main />} />
        <Route path="/draw" element={<Draw />}/>
        <Route path='/mapstuff' element={<MapStuff/>}/>
        <Route path="/template_one" element={<TemplateOne />}/>
        <Route path="/template_two" element={<TemplateTwo />}/>
        <Route path="/template_three" element={<TemplateThree />}/>
        <Route path="/template_diag" element={<TemplateDiagonal />}/>
      </Routes>
    </div>
  );
}

export default App;
