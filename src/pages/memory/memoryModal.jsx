import styled from "styled-components";
import ButtonCustom from "../../components/button";
import close from "../../assets/close.svg";
import Modal from "../../components/modal";
import { useState } from "react";
import {
  Title,
  InputContainer,
  InputBody,
  Label,
  FileContainer,
  FileInput,
  FileButton,
  SmallText,
  TextareaContainer,
  TextareaBody,
  SelectContainer,
  RowContainer,
} from "../../components/formCustom";

const MemoryModal = () => {
  // 권한 확인 모달 띄우기
  const [isOpen, setIsOpen] = useState(false);

  const openModal = (e) => {
    e.preventDefault();
    setIsOpen(true);
  };

  return (
    <BackContainer>
      <OutContainer>
        <Title>추억 올리기</Title>
        <CloseIcon src={close} />
        <FormBody>
          <FormRow>
            <Form>
              <InputContainer>
                <Label>닉네임</Label>
                <InputBody placeholder="닉네임을 입력해주세요" />
              </InputContainer>
              <InputContainer>
                <Label>제목</Label>
                <InputBody placeholder="제목을 입력해주세요" />
              </InputContainer>
              <FileContainer>
                <FileInput placeholder="파일을 선택해 주세요" />
                <FileButton>
                  <SmallText>파일 선택</SmallText>
                </FileButton>
              </FileContainer>
              <TextareaContainer>
                <Label>본문</Label>
                <TextareaBody placeholder="본문 내용을 입력해주세요" />
              </TextareaContainer>
            </Form>
            <Form>
              <InputContainer>
                <Label>태그</Label>
                <InputBody placeholder="태그를 입력해주세요" />
              </InputContainer>
              <InputContainer>
                <Label>장소</Label>
                <InputBody placeholder="장소를 입력해주세요" />
              </InputContainer>
              <InputContainer>
                <Label>추억의 순간</Label>
                <InputBody placeholder="YYYY-MM-DD" />
              </InputContainer>
              <SelectContainer>
                <Label>그룹 공개 선택</Label>
                <RowContainer>
                  <SmallText>공개</SmallText>
                </RowContainer>
              </SelectContainer>
              <InputContainer>
                <Label>비밀번호 생성</Label>
                <InputBody placeholder="추억 비밀번호를 생성해 주세요" />
              </InputContainer>
            </Form>
          </FormRow>
          <ButtonCustom title={"올리기"} onClick={openModal} />
        </FormBody>
      </OutContainer>
      {isOpen && (
        <Modal
          title={"추억 올리기"}
          label={"올리기 권한 인증"}
          hint={"그룹 비밀번호를 입력해 주세요"}
          btn={"제출하기"}
        />
      )}
    </BackContainer>
  );
};

export default MemoryModal;

const BackContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
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
  justify-content: center;
  align-items: center;
  width: 55%;
  height: 80%;
  background-color: white;
  position: relative;
`;

export const CloseIcon = styled.img`
  position: absolute;
  top: 4%;
  right: 3%;
  cursor: pointer;
`;

const FormRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  height: 80%;
`;

const FormBody = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  justify-content: space-between;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  height: 90%;
  gap: 30px;
`;
