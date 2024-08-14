import styled from "styled-components";
import { useState } from "react";
import PropTypes from "prop-types";

const PubYNButton = ({ title }) => {
  const [back, setBack] = useState("#ffffff");
  const [text, setText] = useState("#282828");
  // 버튼 클릭 핸들러
  const handleButton = () => {
    setBack((prevBack) => (prevBack === "#ffffff" ? "#282828" : "#ffffff"));
    setText((prevText) => (prevText === "#282828" ? "#ffffff" : "#282828"));
  };

  return (
    <OutContainer onClick={handleButton} back={back}>
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
};
