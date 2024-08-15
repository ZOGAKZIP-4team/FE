import styled from "styled-components";
import {
  Title,
  InputContainer,
  Label,
  InputBody,
} from "../../components/formCustom";
import ButtonCustom from "../../components/button";
const PrivateAccess = () => {
  return (
    <OutContainer>
      <FormContainer>
        <Title>비공개 그룹</Title>
        <Content>비공개 그룹에 접근하기 위해 권한 확인이 필요합니다.</Content>
        <FormBody>
          <InputContainer>
            <Label>비밀번호 입력</Label>
            <InputBody placeholder="그룹 비밀번호를 입력해 주세요" />
          </InputContainer>
          <ButtonCustom title={"제출하기"} />
        </FormBody>
      </FormContainer>
    </OutContainer>
  );
};

export default PrivateAccess;

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
