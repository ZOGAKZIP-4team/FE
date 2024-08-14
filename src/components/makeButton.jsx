import styled from "styled-components";

const MakeButton = () => {
  return (
    <OutContainer>
      <Text />
    </OutContainer>
  );
};

export default MakeButton;

const OutContainer = styled.button`
  display: flex;
  width: 200px;
  height: 45px;
  background-color: #282828;
  border-radius: 6px;
`;

const Text = styled.h1`
  display: flex;
  width: 66px;
  height: 18px;
  font-size: 14px;
  font-weight: 700;
  text-align: center;
  color: white;
`;
