import styled from "styled-components";
import PropTypes from "prop-types";

const PubYNButton = ({ title, isActive, onClick }) => {
  const back = isActive ? "#282828" : "#ffffff";
  const text = isActive ? "#ffffff" : "#282828";

  return (
    <OutContainer onClick={onClick} back={back}>
      <Text text={text}>{title}</Text>
    </OutContainer>
  );
};

export default PubYNButton;

const OutContainer = styled.button`
  display: flex;
  width: 66px;
  height: 45px;
  border-radius: 22.5px;
  background-color: ${(props) => props.back};
  padding: 0;
  justify-content: center;
  align-items: center;
  border: none;
  outline: none;
`;

const Text = styled.h1`
  margin: 0;
  font-weight: 700;
  font-size: 14px;
  color: ${(props) => props.text};
  width: 40px;
  height: 18px;
`;

PubYNButton.propTypes = {
  title: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired, // 버튼 활성 상태
  onClick: PropTypes.func.isRequired, // 클릭 핸들러
};
