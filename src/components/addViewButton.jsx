import styled from "styled-components";

const AddViewButton = () => {
  return (
    <ButtonContainer>
        <Text>더보기</Text>
    </ButtonContainer>
  )
}
export default AddViewButton;

const ButtonContainer = styled.button`
    display: flex;
    width: 82%;
    height: 60px;
    border: 1px solid #282828;
    border-radius: 6px;
    justify-content: center;
    align-items: center;
    background-color: transparent;
`;

const Text = styled.h1`
    font-size: 14px;
    font-weight: 700;
`;