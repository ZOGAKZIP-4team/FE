import styled from "styled-components";
import {
  Title,
  InputContainer,
  Label,
  InputBody,
} from "../../components/formCustom";
import ButtonCustom from "../../components/button";
import PropTypes from "prop-types";

const PrivateAccess = ({ title, content, hint }) => {
  return (
    <OutContainer>
      <FormContainer>
        <Title>{title}</Title>
        <Content>{content}</Content>
        <FormBody>
          <InputContainer>
            <Label>비밀번호 입력</Label>
            <InputBody placeholder={hint} />
          </InputContainer>
          <ButtonCustom title={"제출하기"} />
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
