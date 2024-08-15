import styled from "styled-components";
import ButtonCustom from "./button";

const FormCustom = () => {
  return (
    <OutContainer>
      <Title>그룹 만들기</Title>
      <FormContainer>
        <FormBody>
          <InputContainer>
            <Label>그룹명</Label>
            <InputBody placeholder="그룹명을 입력해 주세요" />
          </InputContainer>
          <InputContainer>
            <Label>대표 이미지</Label>
            <FileContainer>
              <FileInput placeholder="파일을 선택해 주세요" />
              <FileButton>
                <SmallText>파일 선택</SmallText>
              </FileButton>
            </FileContainer>
          </InputContainer>
          <TextareaContainer>
            <Label>그룹 소개</Label>
            <TextareaBody placeholder="그룹을 소개해 주세요" />
          </TextareaContainer>
          <SelectContainer>
            <Label>그룹 공개 선택</Label>
            <RowContainer>
              <SmallText>공개</SmallText>
            </RowContainer>
          </SelectContainer>
          <InputContainer>
            <Label>비밀번호 생성</Label>
            <InputBody placeholder="그룹 비밀번호를 생성해 주세요" />
          </InputContainer>
        </FormBody>
        <ButtonCustom title={"만들기"} />
      </FormContainer>
    </OutContainer>
  );
};

export default FormCustom;

const OutContainer = styled.div`
  display: flex;
  position: absolute;
  top: 100px;
  left: 0;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  padding-top: 20px;
  gap: 10px;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 420px;
  height: 100%;
  align-items: center;
  gap: 60px;
`;

export const Title = styled.h1`
  width: 117px;
  height: 30px;
  font-size: 24px;
  font-weight: 700;
`;

const FormBody = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 90%;
  gap: 30px;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  height: 85px;
`;

export const Label = styled.h1`
  display: flex;
  width: 96px;
  height: 20px;
  font-size: 16px;
  font-weight: 500;
`;

export const InputBody = styled.input`
  display: flex;
  width: 400px;
  height: 45px;
  border: 1px solid #dddddd;
  border-radius: 6px;
  padding: 10px 20px;
  box-sizing: border-box;

  &:focus {
    border-color: #282828; /* 원하는 색상으로 변경 */
    outline: none; /* 기본 아웃라인 제거 (선택 사항) */
  }
`;

const FileContainer = styled.div`
  display: flex;
  width: 400px;
  height: 45px;
  justify-content: space-between;
`;

const FileInput = styled(InputBody)`
  display: flex;
  width: 290px;
  height: 45px;
`;

const FileButton = styled.button`
  display: flex;
  width: 100px;
  height: 45px;
  border: 1px solid #282828;
  border-radius: 6px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: transparent;
`;

const TextareaContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  height: 150px;
`;

const TextareaBody = styled.textarea`
  display: flex;
  width: 400px;
  height: 120px;
  border: 1px solid #dddddd;
  border-radius: 6px;
  padding: 10px 20px;
  box-sizing: border-box;

  &:focus {
    border-color: #282828; /* 원하는 색상으로 변경 */
    outline: none; /* 기본 아웃라인 제거 (선택 사항) */
  }
`;

const SelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  height: 64px;
`;

const RowContainer = styled.div`
  display: flex;
  width: 94px;
  height: 24px;
  justify-content: space-between;
`;

const SmallText = styled.h1`
  font-size: 14px;
  font-weight: 400;
`;

//const ToggleButton =
