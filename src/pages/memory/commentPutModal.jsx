import styled from "styled-components";
import { BackContainer } from "../group/modModal";
import {
  Title,
  InputContainer,
  InputBody,
  Label,
  TextareaContainer,
  TextareaBody,
} from "../../components/formCustom";
import ButtonCustom from "../../components/button";

const CommentPutModal = () => {
  // 댓글 조회해서 띄워줘야함 !!

  return (
    <BackContainer>
      <OutContainer>
        <FormContainer>
          <Title>댓글 수정</Title>
          <InputContainer>
            <Label>닉네임</Label>
            <InputBody placeholder="닉네임을 입력해 주세요" />
          </InputContainer>
          <TextareaContainer>
            <Label>댓글</Label>
            <TextareaBody placeholder="댓글을 입력해 주세요" />
          </TextareaContainer>
          <InputContainer>
            <Label>수정 권한 인증</Label>
            <InputBody placeholder="댓글 비밀번호를 입력해 주세요" />
          </InputContainer>
          <ButtonCustom title={"등록하기"} />
        </FormContainer>
      </OutContainer>
    </BackContainer>
  );
};

export default CommentPutModal;

const OutContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 25%;
  background-color: white;
  border-radius: 6px;
  justify-content: center;
  align-items: center;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 80%;
  height: 80%;
`;
