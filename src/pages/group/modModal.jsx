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
import {
  HiddenFileInput,
  ToggleSwitch,
  Slider,
} from "../../components/formCustom";
import PropTypes from "prop-types";
import { groupPut } from "../../Utils/GroupUtils";
import { CloseIcon } from "../memory/memoryModModal";
import close from "../../assets/close.svg";
import { useState } from "react";
import { imagePost } from "../../Utils/ImageUtils";

const ModModal = ({ data, onClose, onSave }) => {
  const [name, setName] = useState(data.name);
  const [introduction, setIntroduction] = useState(data.introduction);
  const [password, setPassword] = useState(data.password);
  const [imageUrl, setImageUrl] = useState(data.imageUrl);
  const [isPublic, setIsPublic] = useState(data.isPublic);

  // 파일 첨부
  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    setImageUrl(selectedFile);

    try {
      const response = await imagePost(selectedFile);
      if (response && response.data) {
        setImageUrl(response.data.imageUrl); // 서버에서 받은 URL을 file 상태에 설정
        console.log("파일 업로드 후 URL:", response.data.imageUrl);
      }
    } catch (error) {
      console.error("파일 업로드 실패:", error);
    }
  };

  const handleFileButtonClick = () => {
    document.getElementById("fileInput").click();
  };

  // 그룹 수정
  const handleGroupPut = async (e) => {
    e.preventDefault();
    try {
      const response = await groupPut(
        data._id,
        name,
        password,
        imageUrl,
        isPublic,
        introduction
      );
      if (response) {
        console.log("그룹 수정: ", response);
        onSave({ name, password, imageUrl, isPublic, introduction });
      }
    } catch (error) {
      console.log("그룹 수정 실패: ", error);
    }
  };

  return (
    <BackContainer>
      <OutContainer>
        <Title>그룹 정보 수정</Title>
        <CloseIcon src={close} onClick={onClose} />
        <FormContainer onSubmit={handleGroupPut}>
          <FormBody>
            <InputContainer>
              <Label>그룹명</Label>
              <InputBody
                placeholder="그룹명을 입력해 주세요"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </InputContainer>
            <InputContainer>
              <Label>대표 이미지</Label>
              <FileContainer>
                <FileInput
                  id="fileInput"
                  type="file"
                  onChange={handleFileChange}
                />
                <HiddenFileInput
                  type="text"
                  placeholder="파일을 선택해 주세요"
                  value={imageUrl ? imageUrl : ""}
                  readOnly
                />
                <FileButton onClick={handleFileButtonClick} type="button">
                  <SmallText>파일 선택</SmallText>
                </FileButton>
              </FileContainer>
            </InputContainer>
            <TextareaContainer>
              <Label>그룹 소개</Label>
              <TextareaBody
                placeholder="그룹을 소개해 주세요"
                value={introduction}
                onChange={(e) => setIntroduction(e.target.value)}
              />
            </TextareaContainer>
            <SelectContainer>
              <Label>그룹 공개 선택</Label>
              <RowContainer>
                <SmallText>공개</SmallText>
                <ToggleSwitch>
                  <input
                    type="checkbox"
                    checked={isPublic}
                    onChange={(e) => setIsPublic(e.target.checked)}
                  />
                  <Slider />
                </ToggleSwitch>
              </RowContainer>
            </SelectContainer>
            <InputContainer>
              <Label>수정 권한 인증</Label>
              <InputBody
                placeholder="그룹 비밀번호를 입력해 주세요"
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

export default ModModal;

ModModal.propTypes = {
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
  position: relative;

  @media (min-width: 768px) and (max-width: 1199px) {
    width: 50%;
  }
`;

const MarginB = styled(ButtonCustom)`
  margin-top: 30px;
`;
