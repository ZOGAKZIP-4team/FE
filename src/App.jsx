import "./App.css";
import Header from "./components/header";
//import PublicList from "./components/publicList";
//import MakeButton from "./components/makeButton";
//import PubYNButton from "./components/pubYNButton";
//import Search from "./components/search";
//import DropDown from "./components/alignDropdown";
//import AddViewButton from "./components/addViewButton";
import PublicGroup from "./pages/group/publicGroup";
import PrivateGroup from "./pages/group/privateGroup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoneData from "./pages/group/noneData";
//import PrivateList from "./components/privateList";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<PublicGroup />} />
        <Route path="/test" element={<PrivateGroup />} />
        <Route path="/test/none" element={<NoneData/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
