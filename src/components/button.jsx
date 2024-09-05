import styled from "styled-components";
import PropTypes from "prop-types";

const ButtonCustom = ({ title, ...props }) => {
  return (
    <OutContainer {...props}>
      <Text>{title}</Text>
    </OutContainer>
  );
};


export const ButtonMemory = ({ title, ...props }) => {
  return (
    <OutC {...props}>
      <Text>{title}</Text>
    </OutC>
  );
};


export default ButtonCustom;

const OutContainer = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
  border: none;
  border-radius: 6px;
  background-color: #282828;
  outline: none;
  cursor: pointer;
`;

const Text = styled.h1`
  font-size: 14px;
  font-weight: 700;
  color: #f4f4f4;
`;

ButtonCustom.propTypes = {
  title: PropTypes.string.isRequired,
};

ButtonMemory.propTypes = {
  title: PropTypes.string.isRequired,
};


const OutC = styled(OutContainer)`
  width: 40%;
`;
