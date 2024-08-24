import styled from "styled-components";
import { useState } from "react";
import PublicGroup from "./publicGroup";
import PublicDetail from "../../components/publicDetail";
import MakeButton from "../../components/makeButton";
import ModModal from "./modModal";
import Modal from "../../components/modal";

const PublicGroupDetail = () => {
  // 모달 상태 관리 - 수정
  const [modOpen, setModOpen] = useState(false);
  // 모달 상태 관리 - 삭제
  const [delOpen, setDelOpen] = useState(false);

  // 그룹 수정 모달 띄우기
  const openModModal = () => {
    setModOpen(true);
  };

  // 그룹 삭제 모달 띄우기
  const openDelModal = () => {
    setDelOpen(true);
  };

  const closeModal = () => {
    setModOpen(false);
  };

  return (
    <OutContainer>
      <BodyContainer>
        <PublicDetail onModModal={openModModal} onDelModal={openDelModal}/>
        <Bar />
        <TitleContainer>
          <Title>추억 목록</Title>
          <MakeButton title={"추억 올리기"} />
        </TitleContainer>
        <PublicGroup />
      </BodyContainer>
      {modOpen && <ModModal onClose={closeModal} />}
      {delOpen && <Modal title={"그룹 삭제"} label={"삭제 권한 인증"} hint={"그룹 비밀번호를 입력해 주세요"} btn={"삭제하기"} onClose={closeModal} />}
    </OutContainer>
  );
};

export default PublicGroupDetail;

export const OutContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: center;
`;

export const Bar = styled.hr`
  display: flex;
  width: 92%;
  color: #dddddd;
`;

export const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  justify-content: center;
  align-items: center;
  gap: 100px;
`;

export const TitleContainer = styled.div`
  display: flex;
  width: 90%;
  justify-content: center; /* 전체 컨테이너를 가운데 정렬 */
  align-items: center;
  position: relative;
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  position: absolute; /* absolute로 Title을 가운데 배치 */
  left: 50%; /* 수평으로 가운데 위치 */
  transform: translateX(-50%);
`;
