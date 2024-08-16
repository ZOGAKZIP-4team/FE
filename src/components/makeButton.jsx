import styled from "styled-components";
import PropTypes from "prop-types";

const MakeButton = ({ title }) => {
  return <OutContainer>{title}</OutContainer>;
};

export default MakeButton;

const OutContainer = styled.button`
  display: flex;
  width: 200px;
  height: 45px;
  background-color: #282828;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 700;
  text-align: center; 
  color: white;
  justify-content: center;
  align-items: center;
  margin-left: auto; // 오른쪽 끝에 배치하기 위해 추가한 속성
`;

MakeButton.propTypes = {
  title: PropTypes.string.isRequired,
};
