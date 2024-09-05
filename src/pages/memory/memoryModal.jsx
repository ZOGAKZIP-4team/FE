import styled from "styled-components";
import { ButtonMemory } from "../../components/button";
import close from "../../assets/close.svg";
import Modal from "../../components/modal";
import { boardPost } from "../../Utils/BoardUtils";
import { useState } from "react";
import PropTypes from "prop-types";
import {
  HiddenFileInput,
  ToggleSwitch,
  Slider,
} from "../../components/formCustom";
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
import { useParams } from "react-router-dom";
import { imagePost } from "../../Utils/ImageUtils";

const MemoryModal = ({ onClose, onMemoryAdded }) => {
  const { groupId } = useParams();
  // 권한 확인 모달 띄우기
  const [isOpen, setIsOpen] = useState(false);
  // 추억 올리기 값 상태 관리
  const [nickname, setNickname] = useState();
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [postPassword, setPostPassword] = useState();
  const [groupPassword, setGroupPassword] = useState();
  const [imageUrl, setImageUrl] = useState("");
  const [tags, setTags] = useState([]);
  const [location, setLocation] = useState();
  const [moment, setMoment] = useState();
  const [isPublic, setIsPublic] = useState(true);
  const [currentTag, setCurrentTag] = useState("");

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

  const openModal = (e) => {
    e.preventDefault();
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  // 게시물 등록
  const handleBoardPost = async () => {
    console.log(
      "게시물 내용: ",
      nickname,
      title,
      content,
      postPassword,
      groupPassword,
      imageUrl,
      tags,
      location,
      moment,
      isPublic
    );
    try {
      const response = await boardPost(
        groupId,
        nickname,
        title,
        content,
        postPassword,
        groupPassword,
        imageUrl,
        tags,
        location,
        moment,
        isPublic
      );
      if (response) {
        console.log("게시물 등록: ", response);
        if (onMemoryAdded) {
          onMemoryAdded(); // 게시글 목록 갱신을 위해 콜백 호출
        }
        onClose();
      }
    } catch (error) {
      console.log("게시물 등록 실패: ", error);
    }
  };

  return (
    <BackContainer>
      <OutContainer>
        <Title>추억 올리기</Title>
        <CloseIcon src={close} onClick={onClose} />
        <FormBody>
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
                  value={moment}
                  onChange={(e) => setMoment(e.target.value)}
                />
              </InputContainer>
              <SelectContainer>
                <Label>추억 공개 선택</Label>
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
          <ButtonMemory title={"올리기"} onClick={openModal} />
        </FormBody>
      </OutContainer>
      {isOpen && (
        <Modal
          title={"추억 올리기"}
          label={"올리기 권한 인증"}
          hint={"그룹 비밀번호를 입력해 주세요"}
          btn={"제출하기"}
          onSubmit={handleBoardPost}
          value={groupPassword}
          onChange={(e) => setGroupPassword(e.target.value)}
          onClose={closeModal}
        />
      )}
    </BackContainer>
  );
};

export default MemoryModal;

MemoryModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onMemoryAdded: PropTypes.func,
};

const BackContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  position: fixed;
  left: 0;
  top: 0;
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

  @media (min-width: 768px) and (max-width: 1199px) {
    width: 100%;
  }

  @media (min-width: 1200px) and (max-width: 1700px) {
    width: 80%;
  }
`;

export const CloseIcon = styled.img`
  position: absolute;
  top: 4%;
  right: 3%;
  cursor: pointer;
`;

const FormRow = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 90%;
  height: 80%;
  @media (min-width: 768px) and (max-width: 1199px) {
    width: 100%;
  }
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
