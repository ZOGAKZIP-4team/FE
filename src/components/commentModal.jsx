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
import { CloseIcon } from "../pages/memory/memoryModal";
import close from "../assets/close.svg";
import { useState } from "react";
import { commentPost } from "../Utils/CommentUtils";
import { useParams } from "react-router-dom";

const CommentModal = ({ onClose }) => {
  const [nickname, setNickname] = useState("");
  const [content, setContent] = useState("");
  const [password, setPassword] = useState();
  const { postId } = useParams();

  // 댓글 등록하기
  const handleCommentPost = async (e) => {
    e.preventDefault();
    try {
      const response = await commentPost(postId, nickname, content, password);
      if (response) {
        console.log("댓글 등록: ", response);
        console.log("비밀번호: ", password);
        const newComment = {
          nickname,
          content,
        };
        onClose(newComment);
      }
    } catch (error) {
      console.log("댓글 등록 실패: ", error);
    } finally {
      setPassword("");
    }
  };

  return (
    <BackContainer>
      <OutContainer>
        <Title>댓글 등록</Title>
        <CloseIcon src={close} onClick={onClose} />
        <FormContainer onSubmit={handleCommentPost}>
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
              <Label>비밀번호 생성</Label>
              <InputBody
                placeholder="댓글 비밀번호를 생성해 주세요"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </InputContainer>
            <MarginB title={"등록하기"} type="submit" />
          </FormBody>
        </FormContainer>
      </OutContainer>
    </BackContainer>
  );
};

export default CommentModal;

CommentModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    introduction: PropTypes.string.isRequired,
    isPublic: PropTypes.bool.isRequired,
    _id: PropTypes.string.isRequired,
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

export const OutContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 25%;
  height: 80%;
  background-color: white;
  border-radius: 6px;
  justify-content: center;
  align-items: center;
  padding-top: 2%;
  box-sizing: border-box;
  position: relative;
  
  @media (min-width: 768px) and (max-width: 1199px) {
    width: 50%;
  }

  @media (min-width: 1200px) and (max-width: 1700px) {
    width: 40%;
  }
`;

export const MarginB = styled(ButtonCustom)`
  margin-top: 30px;
`;
