import styled from "styled-components";
import {
  FormBody,
  FileButton,
  FileInput,
  FileContainer,
  InputBody,
  InputContainer,
  FormContainer,
  Label,
  RowContainer,
  SelectContainer,
  SmallText,
  TextareaBody,
  TextareaContainer,
  Title,
} from "../../components/formCustom";
import ButtonCustom from "../../components/button";

const ModModal = () => {
  return (
    <BackContainer>
      <OutContainer>
        <Title>그룹 정보 수정</Title>
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
              <Label>수정 권한 인증</Label>
              <InputBody placeholder="그룹 비밀번호를 입력해 주세요" />
            </InputContainer>
            <MarginB title={"수정하기"} />
          </FormBody>
        </FormContainer>
      </OutContainer>
    </BackContainer>
  );
};

export default ModModal;

export const BackContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
`;

const OutContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 25%;
  height: 90%;
  background-color: white;
  border-radius: 6px;
  justify-content: center;
  align-items: center;
  padding-top: 40px;
  box-sizing: border-box;
`;

const MarginB = styled(ButtonCustom)`
  margin-top: 30px;
`;
