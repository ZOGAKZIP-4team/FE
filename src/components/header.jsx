import styled from "styled-components";
import logo from "../assets/logo.svg";
import { useLocation, useNavigate } from "react-router-dom";
import MakeButton from "./makeButton";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // 버튼 표시 경로
  const showButtonPaths = ["/", "/test"];

  // 그룹 만들기 페이지 이동
  const moveToMakeGroup = () => {
    navigate("/group/create");
  }

  return (
    <HeaderContainer>
      <LogoContainer>
        <Logo src={logo} />
        {showButtonPaths.includes(location.pathname) && (
        <MakeButton title={"그룹 만들기"} onClick={moveToMakeGroup}/>
      )}
      </LogoContainer>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100px;
`;

const LogoContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  position: relative;
  margin: 0 5%;
`;

const Logo = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
`;