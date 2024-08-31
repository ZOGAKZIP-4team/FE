import styled from "styled-components";
import ButtonCustom from "./button";
import { useState } from "react";
import { groupPost } from "../Utils/GroupUtils";
import { useNavigate } from "react-router-dom";

const FormCustom = () => {
  // 상태 관리
  const [name, setName] = useState();
  const [file, setFile] = useState(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwyXeKDN29AmZgZPLS7n0Bepe8QmVappBwZCeA3XWEbWNdiDFB"
  );
  const [intro, setIntro] = useState();
  const [isPublic, setIsPublic] = useState(true);
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileButtonClick = () => {
    document.getElementById("fileInput").click();
  };

  const moveToMainPage = () => {
    navigate("/");
  };

  // 그룹 등록
  const handleGroupPost = async () => {
    try {
      const response = await groupPost(name, password, file, isPublic, intro);
      if (response) {
        console.log("그룹 등록 성공: ", response);
        moveToMainPage();
      }
      console.log("data: ", name, file, intro, isPublic, password);
    } catch (error) {
      console.log("그룹 등록 실패: ", error);
    }
  };

  return (
    <OutContainer>
      <Title>그룹 만들기</Title>
      <FormContainer>
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
                value={file ? file.name : ""}
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
              value={intro}
              onChange={(e) => setIntro(e.target.value)}
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
            <Label>비밀번호 생성</Label>
            <InputBody
              placeholder="그룹 비밀번호를 생성해 주세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </InputContainer>
        </FormBody>
        <ButtonCustom
          title={"만들기"}
          type="submit"
          onClick={handleGroupPost}
        />
      </FormContainer>
    </OutContainer>
  );
};

export default FormCustom;

const OutContainer = styled.div`
  display: flex;
  position: absolute;
  top: 6.25rem; /* 100px -> 6.25rem */
  left: 0;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  padding-top: 1.25rem; /* 20px -> 1.25rem */
  gap: 0.625rem; /* 10px -> 0.625rem */
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 26.25rem; /* 420px -> 26.25rem */
  height: 100%;
  align-items: center;
  gap: 3.75rem; /* 60px -> 3.75rem */
`;

export const Title = styled.h1`
  font-size: 1.5rem; /* 24px -> 1.5rem */
  font-weight: 700;
`;

export const FormBody = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 90%;
  gap: 1.875rem; /* 30px -> 1.875rem */
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 25rem; /* 400px -> 25rem */
  height: 5.3125rem; /* 85px -> 5.3125rem */
`;

export const Label = styled.h1`
  display: flex;
  height: 1.25rem; /* 20px -> 1.25rem */
  font-size: 1rem; /* 16px -> 1rem */
  font-weight: 500;
`;

export const InputBody = styled.input`
  display: flex;
  width: 25rem; /* 400px -> 25rem */
  height: 2.8125rem; /* 45px -> 2.8125rem */
  border: 1px solid #dddddd;
  border-radius: 6px;
  padding: 0.625rem 1.25rem; /* 10px 20px -> 0.625rem 1.25rem */
  box-sizing: border-box;

  &:focus {
    border-color: #282828;
    outline: none;
  }
`;

export const HiddenFileInput = styled(InputBody)`
  width: 18.125rem; /* 290px -> 18.125rem */
  height: 2.8125rem; /* 45px -> 2.8125rem */
`;

export const FileContainer = styled.div`
  display: flex;
  width: 25rem; /* 400px -> 25rem */
  height: 2.8125rem; /* 45px -> 2.8125rem */
  justify-content: space-between;
`;

export const FileInput = styled(InputBody)`
  display: none;
`;

export const FileButton = styled.button`
  display: flex;
  width: 6.25rem; /* 100px -> 6.25rem */
  height: 2.8125rem; /* 45px -> 2.8125rem */
  border: 1px solid #282828;
  border-radius: 6px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: transparent;
`;

export const TextareaContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 25rem; /* 400px -> 25rem */
  height: 9.375rem; /* 150px -> 9.375rem */
`;

export const TextareaBody = styled.textarea`
  display: flex;
  width: 25rem; /* 400px -> 25rem */
  height: 7.5rem; /* 120px -> 7.5rem */
  border: 1px solid #dddddd;
  border-radius: 6px;
  padding: 0.625rem 1.25rem; /* 10px 20px -> 0.625rem 1.25rem */
  box-sizing: border-box;

  &:focus {
    border-color: #282828;
    outline: none;
  }
`;

export const SelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 25rem; /* 400px -> 25rem */
  height: 4rem; /* 64px -> 4rem */
`;

export const RowContainer = styled.div`
  display: flex;
  width: 5.875rem; /* 94px -> 5.875rem */
  height: 1.5rem; /* 24px -> 1.5rem */
  justify-content: space-between;
  align-items: center;
`;

export const SmallText = styled.h1`
  font-size: 0.875rem; /* 14px -> 0.875rem */
  font-weight: 400;
`;

export const ToggleSwitch = styled.label`
  position: relative;
  width: 3rem; /* 48px -> 3rem */
  height: 1.5rem; /* 24px -> 1.5rem */
  display: inline-block;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  input:checked + div {
    background-color: #282828;
  }

  input:checked + div:before {
    transform: translateX(23px);
  }
`;

export const Slider = styled.div`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 34px;

  &:before {
    position: absolute;
    content: "";
    height: 1.125rem; /* 18px -> 1.125rem */
    width: 1.125rem; /* 18px -> 1.125rem */
    left: 0.1875rem; /* 3px -> 0.1875rem */
    bottom: 0.1875rem; /* 3px -> 0.1875rem */
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }
`;
