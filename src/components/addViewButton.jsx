import styled from "styled-components";
import PropTypes from "prop-types";

const AddViewButton = ({ onClick }) => {
  return (
    <ButtonContainer onClick={onClick}>
      <Text>더보기</Text>
    </ButtonContainer>
  );
};
export default AddViewButton;

AddViewButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

const ButtonContainer = styled.button`
  display: flex;
  width: 82%;
  height: 60px;
  border: 1px solid #282828;
  border-radius: 6px;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  outline: none;
`;

const Text = styled.h1`
  font-size: 14px;
  font-weight: 700;
`;
