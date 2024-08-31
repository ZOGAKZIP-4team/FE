import styled from "styled-components";
import {
  FormBody,
  InputBody,
  InputContainer,
  FormContainer,
  Label,
  TextareaBody,
  TextareaContainer,
  Title,
} from "../components/formCustom";
import ButtonCustom from "../components/button";
import PropTypes from "prop-types";
import { CloseIcon } from "../pages/memory/memoryModModal";
import close from "../assets/close.svg";
import { useState } from "react";
import { commentPut } from "../Utils/CommentUtils";

const CommentModModal = ({ data, onClose, onSave }) => {
  const [nickname, setNickname] = useState(data.nickname);
  const [content, setContent] = useState(data.content);
  const [password, setPassword] = useState("");

  // 댓글 수정하기
  const handleCommentPut = async (e) => {
    e.preventDefault();
    try {
      const response = await commentPut(data.id, nickname, content, password);
      if (response) {
        console.log("댓글 수정: ", response);
        onSave(response.data);
        onClose();
      }
    } catch (error) {
      console.log("댓글 수정 실패: ", error);
    }
  };

  return (
    <BackContainer>
      <OutContainer>
        <Title>댓글 수정</Title>
        <CloseIcon src={close} onClick={onClose} />
        <FormContainer onSubmit={handleCommentPut}>
          <FormBody>
            <InputContainer>
              <Label>닉네임</Label>
              <InputBody
                placeholder="닉네임을 입력해 주세요"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
            </InputContainer>
            <TextareaContainer>
              <Label>댓글</Label>
              <TextareaBody
                placeholder="댓글을 입력해 주세요"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </TextareaContainer>
            <InputContainer>
              <Label>수정 권한 인증</Label>
              <InputBody
                placeholder="댓글 비밀번호를 생성해 주세요"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </InputContainer>
            <MarginB title={"수정하기"} type="submit" />
          </FormBody>
        </FormContainer>
      </OutContainer>
    </BackContainer>
  );
};

export default CommentModModal;

CommentModModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    nickname: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }).isRequired,
};

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
  height: 80%;
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
