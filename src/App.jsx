import "./App.css";
import Header from "./components/header";
//import PublicList from "./components/publicList";
//import MakeButton from "./components/makeButton";
//import PubYNButton from "./components/pubYNButton";
//import Search from "./components/search";
//import DropDown from "./components/alignDropdown";
//import AddViewButton from "./components/addViewButton";
import PublicGroup from "./pages/group/publicGroup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MakeGroup from "./pages/group/makeGroup";
//import PrivateList from "./components/privateList";
import PrivateAccess from "./pages/group/privateAccess";
import PublicGroupDetail from "./pages/group/publicGroupDetail";
import PrivateGroupDetail from "./pages/group/privateGroupDetail";
import DetailNoneData from "./pages/group/detailNoneData";
import MemoryDetail from "./pages/memory/memoryDetail";
import Page404 from "./pages/404/page404";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<PublicGroup />} />
        <Route path="/group/create" element={<MakeGroup />} />
        <Route
          path="/group/access/:groupId"
          element={
            <PrivateAccess
              title={"비공개 그룹"}
              content={"비공개 그룹에 접근하기 위해 권한 확인이 필요합니다."}
              hint={"그룹 비밀번호를 입력해 주세요"}
            />
          }
        />
        <Route
          path="/group/public/:groupId"
          element={<PublicGroupDetail />}
        ></Route>
        <Route
          path="/group/private/:groupId"
          element={<PrivateGroupDetail />}
        ></Route>
        <Route path="/group/detail/none" element={<DetailNoneData />}></Route>
        <Route
          path="/memory/access/:postId"
          element={
            <PrivateAccess
              title={"비공개 추억"}
              content={"비공개 추억에 접근하기 위해 권한 확인이 필요합니다."}
              hint={"그룹 비밀번호를 입력해 주세요"}
            />
          }
        />
        <Route path="/memory/:postId" element={<MemoryDetail />} />
        <Route path="*" element={<Page404/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
