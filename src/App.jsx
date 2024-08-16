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
import MakeGroup from "./pages/group/makeGroup";
//import PrivateList from "./components/privateList";
import PrivateAccess from "./pages/group/privateAccess";
import PublicGroupDetail from "./pages/group/publicGroupDetail";
import PrivateGroupDetail from "./pages/group/privateGroupDetail";
import DetailNoneData from "./pages/group/detailNoneData";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<PublicGroup />} />
        <Route path="/test" element={<PrivateGroup />} />
        <Route path="/test/none" element={<NoneData />} />
        <Route path="/group/create" element={<MakeGroup />} />
        <Route path="/group/access" element={<PrivateAccess />} />
        <Route
          path="/group/detail/public"
          element={<PublicGroupDetail />}
        ></Route>
        <Route
          path="/group/detail/private"
          element={<PrivateGroupDetail />}
        ></Route>
        <Route path="/group/detail/none" element={<DetailNoneData/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
