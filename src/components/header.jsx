import styled from "styled-components";
import logo from "../assets/logo.svg";

const Header = () => {
  return (
    <HeaderContainer>
      <LogoContainer>
        <Logo src={logo} />
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
`;

const Logo = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;
`;
