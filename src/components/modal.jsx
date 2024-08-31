import styled from "styled-components";
import { BackContainer } from "../pages/group/modModal";
import { Title, InputContainer, InputBody, Label } from "./formCustom";
import ButtonCustom from "./button";
import PropTypes from "prop-types";
import { CloseIcon } from "../pages/memory/memoryModal";
import close from "../assets/close.svg";

const Modal = ({
  title,
  label,
  hint,
  btn,
  value,
  onChange,
  onSubmit,
  onClose,
}) => {
  return (
    <BackContainer>
      <OutContainer>
        <Title>{title}</Title>
        <CloseIcon src={close} onClick={onClose} />
        <FormBody
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          <InputContainer>
            <Label>{label}</Label>
            <InputBody placeholder={hint} value={value} onChange={onChange} />
          </InputContainer>
          <ButtonCustom title={btn} type="submit" />
        </FormBody>
      </OutContainer>
    </BackContainer>
  );
};

export default Modal;

const OutContainer = styled.div`
  display: flex;
  width: 25%;
  height: 335px;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  flex-direction: column;
  background-color: white;
  border-radius: 6px;
  position: relative;
`;

const FormBody = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 60%;
  gap: 50px;
`;

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  hint: PropTypes.string.isRequired,
  btn: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};
