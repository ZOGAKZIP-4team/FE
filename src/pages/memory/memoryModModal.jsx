import styled from "styled-components";
import { useState } from "react";
import { boardPut } from "../../Utils/BoardUtils";
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
import {
  HiddenFileInput,
  ToggleSwitch,
  Slider,
} from "../../components/formCustom";
import ButtonCustom from "../../components/button";
import PropTypes from "prop-types";
import close from "../../assets/close.svg";

const MemoryModModal = ({ data, onClose, onSave }) => {
  // 추억 올리기 값 상태 관리
  const [nickname, setNickname] = useState(data.nickname);
  const [title, setTitle] = useState(data.title);
  const [content, setContent] = useState(data.content);
  const [postPassword, setPostPassword] = useState(data.postPassword);
  const [imageUrl, setImageUrl] = useState(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwyXeKDN29AmZgZPLS7n0Bepe8QmVappBwZCeA3XWEbWNdiDFB"
  );
  const [tags, setTags] = useState(data.tags || []);
  const [location, setLocation] = useState(data.location);
  const [moment, setMoment] = useState(data.moment);
  const [isPublic, setIsPublic] = useState(data.isPublic);
  const [currentTag, setCurrentTag] = useState("");

  // 파일 첨부
  const handleFileChange = (e) => {
    setImageUrl(e.target.files[0]);
  };

  const handleFileButtonClick = () => {
    document.getElementById("fileInput").click();
  };

  const handleTagInput = (e) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault(); // 폼 제출 방지
      const value = currentTag.trim();
      if (value !== "" && !tags.includes(value)) {
        setTags((prevTags) => [...prevTags, value]);
      }
      setCurrentTag("");
    }
  };

  const removeTag = (indexToRemove) => {
    setTags((prevTags) =>
      prevTags.filter((_, index) => index !== indexToRemove)
    );
  };

  // 게시물 수정
  const handleBoardPut = async (e) => {
    e.preventDefault();
    try {
      const response = await boardPut(
        data._id,
        nickname,
        title,
        content,
        postPassword,
        imageUrl,
        tags,
        location,
        moment,
        isPublic
      );
      if (response) {
        console.log("게시물 수정: ", response);
        // 수정된 데이터를 부모 컴포넌트에 전달하여 반영
        onSave({
          nickname,
          title,
          content,
          postPassword,
          imageUrl,
          tags,
          location,
          moment,
          isPublic,
        });
        onClose(); // 수정 후 모달 닫기
      }
    } catch (error) {
      console.log("게시물 수정 실패: ", error);
    }
  };

  return (
    <BackContainer>
      <OutContainer>
        <Title>추억 수정</Title>
        <CloseIcon src={close} onClick={onClose} />
        <FormBody onSubmit={handleBoardPut}>
          <FormRow>
            <Form>
              <InputContainer>
                <Label>닉네임</Label>
                <InputBody
                  placeholder="닉네임을 입력해주세요"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                />
              </InputContainer>
              <InputContainer>
                <Label>제목</Label>
                <InputBody
                  placeholder="제목을 입력해주세요"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </InputContainer>
              <FileContainer>
                <FileInput
                  id="fileInput"
                  type="file"
                  onChange={handleFileChange}
                />
                <HiddenFileInput
                  type="text"
                  placeholder="파일을 선택해 주세요"
                  value={imageUrl ? imageUrl.name : ""}
                  readOnly
                />
                <FileButton onClick={handleFileButtonClick} type="button">
                  <SmallText>파일 선택</SmallText>
                </FileButton>
              </FileContainer>
              <TextareaContainer>
                <Label>본문</Label>
                <TextareaBody
                  placeholder="본문 내용을 입력해주세요"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </TextareaContainer>
            </Form>
            <Form>
              <InputContainer>
                <Label>태그</Label>
                <InputBody
                  placeholder="태그를 입력해주세요"
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  onKeyDown={handleTagInput}
                />
                <TagContainer>
                  {tags.map((tag, index) => (
                    <Tag key={index}>
                      #{tag}{" "}
                      <RemoveTag onClick={() => removeTag(index)}>x</RemoveTag>
                    </Tag>
                  ))}
                </TagContainer>
              </InputContainer>
              <InputContainer>
                <Label>장소</Label>
                <InputBody
                  placeholder="장소를 입력해주세요"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </InputContainer>
              <InputContainer>
                <Label>추억의 순간</Label>
                <InputBody
                  placeholder="YYYY-MM-DD"
                  value={moment.slice(0, 10)}
                  onChange={(e) => setMoment(e.target.value)}
                />
              </InputContainer>
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
                  placeholder="추억 비밀번호를 생성해 주세요"
                  value={postPassword}
                  onChange={(e) => setPostPassword(e.target.value)}
                />
              </InputContainer>
            </Form>
          </FormRow>
          <ButtonCustom title={"수정하기"} type="submit" />
        </FormBody>
      </OutContainer>
    </BackContainer>
  );
};

export default MemoryModModal;

MemoryModModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  data: PropTypes.shape({
    nickname: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    isPublic: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    tags: PropTypes.object.isRequired,
    location: PropTypes.string.isRequired,
    moment: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    postPassword: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
};

const BackContainer = styled.div`
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

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
`;

const Tag = styled.span`
  background-color: #f0f0f0;
  padding: 5px;
  border-radius: 5px;
  display: flex;
  align-items: center;
`;

const RemoveTag = styled.span`
  margin-left: 5px;
  cursor: pointer;
  color: red;
`;
