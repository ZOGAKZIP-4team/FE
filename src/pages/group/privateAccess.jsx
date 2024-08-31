import styled from "styled-components";
import { useState } from "react";
import {
  Title,
  InputContainer,
  Label,
  InputBody,
} from "../../components/formCustom";
import ButtonCustom from "../../components/button";
import PropTypes from "prop-types";
import { groupAccessGet } from "../../Utils/GroupUtils";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { boardAccess } from "../../Utils/BoardUtils";

const PrivateAccess = ({ title, content, hint }) => {
  const navigate = useNavigate();
  // 비밀번호 상태 관리
  const [pwd, setPwd] = useState();
  const { groupId } = useParams();
  const { postId } = useParams();

  // 접근 권한 확인
  const handleAccess = async () => {
    try {
      const response = await groupAccessGet(groupId, pwd);
      console.log("비밀번호 확인: ", pwd);
      if (response) {
        console.log("그룹 접근 권한 확인 성공: ", response);
        navigate(`/group/private/${groupId}`);
      }
    } catch (error) {
      console.log("그룹 접근 권한 확인 실패: ", error);
    }
  };

  // 접근 권한 확인
  const handleBoardAccess = async () => {
    try {
      const response = await boardAccess(postId, pwd);
      if (response) {
        console.log("비공개 게시글 접근 권한 확인: ", response);
        navigate(`/memory/${postId}`);
      }
    } catch (error) {
      console.log("비공개 게시글 접근 권한 실패: ", error);
    }
  };

  // onSubmit 핸들러 결정
  const handleSubmit = (e) => {
    e.preventDefault();
    if (title === "비공개 그룹") {
      handleAccess();
    } else if (title === "비공개 추억") {
      handleBoardAccess();
    }
  };

  return (
    <OutContainer>
      <FormContainer>
        <Title>{title}</Title>
        <Content>{content}</Content>
        <FormBody onSubmit={handleSubmit}>
          <InputContainer>
            <Label>비밀번호 입력</Label>
            <InputBody
              placeholder={hint}
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
            />
          </InputContainer>
          <ButtonCustom title={"제출하기"} type="submit" />
        </FormBody>
      </FormContainer>
    </OutContainer>
  );
};

export default PrivateAccess;

PrivateAccess.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  hint: PropTypes.string.isRequired,
};

const OutContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  gap: 10px;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 420px;
  height: 313px;
  align-items: center;
  gap: 60px;
`;

const Content = styled.h1`
  font-size: 14px;
  font-weight: 400;
`;
const FormBody = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 70%;
  gap: 30px;
`;
