import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import PublicDetail from "../../components/publicDetail";
import MakeButton from "../../components/makeButton";
import ModModal from "./modModal";
import Modal from "../../components/modal";
import MemoryModal from "../memory/memoryModal";
import { groupDetailGet, groupDel } from "../../Utils/GroupUtils";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import MemoryPublicGroup from "./memoryPublicGroup";

const PublicGroupDetail = () => {
  // 모달 상태 관리 - 수정
  const [modOpen, setModOpen] = useState(false);
  // 모달 상태 관리 - 삭제
  const [delOpen, setDelOpen] = useState(false);
  const [delpwd, setDelPwd] = useState("");
  // 모달 상태 관리 - 추억 올리기
  const [memoryModal, setMemoryModal] = useState(false);
  // 그룹 상세 정보 상태 관리
  const { groupId } = useParams();
  const [groupDetail, setGroupDetail] = useState(null);
  // dayCount 가져오기
  const location = useLocation();
  const dayCount = location.state?.dayCount;
  const navigate = useNavigate();

  // 그룹 수정 모달 띄우기
  const openModModal = () => {
    setModOpen(true);
  };

  // 그룹 삭제 모달 띄우기
  const openDelModal = () => {
    setDelOpen(true);
  };

  // 그룹 삭제 모달 닫기
  const closeDelModal = () => {
    setDelPwd("");
    setDelOpen(false);
  };

  const moveToMain = () => {
    navigate("/");
  };

  // MemoryPublicGroup에 대한 레퍼런스 상태 관리
  const memoryGroupRef = useRef();

  // 그룹 삭제하기
  const handleGroupDel = async () => {
    try {
      const response = await groupDel(groupId, delpwd);
      console.log("id, password: ", groupId, delpwd);
      if (response) {
        console.log("그룹 삭제 성공: ", response);
      }
      return response;
    } catch (error) {
      console.log("그룹 삭제 실패: ", error);
    }
  };

  // 그룹 수정 모달 닫기
  const closeModal = () => {
    setModOpen(false);
  };

  // 그룹 상세 정보 조회
  const handleGroupDetailGet = async () => {
    try {
      const response = await groupDetailGet(groupId);
      if (response) {
        console.log("그룹 상세 정보 조회 성공: ", response);
        setGroupDetail(response);
      }
    } catch (error) {
      console.log("그룹 상세 정보 조회 실패: ", error);
    }
  };

  useEffect(() => {
    handleGroupDetailGet();
  }, [groupId]);

  // 데이터가 로딩 중이거나 존재하지 않을 때 로딩 상태를 표시
  if (!groupDetail) {
    return <div>Loading...</div>; // 로딩 중 메시지
  }

  const handleMemoryModal = () => {
    setMemoryModal(true);
    console.log("추억 올리기 클릭");
  };

  const handleMemoryCloseModal = () => {
    setMemoryModal(false);
    memoryGroupRef.current.handleNewMemoryAdded(); // 목록 업데이트
  };

  // MemoryPublicGroup에서 알림을 받으면 그룹 상세 정보 다시 조회
  const handleUpdateGroupDetail = () => {
    handleGroupDetailGet();
  };

    // 추억이 성공적으로 추가되었을 때 호출될 함수
  // const handleMemoryAdded = () => {
  //   // 추억 개수를 증가시킴
  //   setGroupDetail((prevDetail) => ({
  //     ...prevDetail,
  //     postCount: prevDetail.postCount + 1,
  //   }));
  // };

  // 추억이 성공적으로 삭제되었을 때 호출될 함수
  // const handleMemoryDeleted = () => {
  //   // 추억 개수를 감소시킴
  //   setGroupDetail((prevDetail) => ({
  //     ...prevDetail,
  //     postCount: prevDetail.postCount - 1,
  //   }));
  // };

  return (
    <OutContainer>
      <BodyContainer>
        <PublicDetail
          onModModal={openModModal}
          onDelModal={openDelModal}
          data={groupDetail}
          dayCount={dayCount}
        />
        <Bar />
        <TitleContainer>
          <Title>추억 목록</Title>
          <MakeButton title={"추억 올리기"} onClick={handleMemoryModal} />
        </TitleContainer>
        <MemoryPublicGroup ref={memoryGroupRef} onUpdateGroupDetail={handleUpdateGroupDetail}/>
      </BodyContainer>
      {modOpen && (
        <ModModal
          data={groupDetail}
          onClose={closeModal}
          onSave={(updatedData) => setGroupDetail(updatedData)}
        />
      )}
      {delOpen && (
        <Modal
          title={"그룹 삭제"}
          label={"삭제 권한 인증"}
          hint={"그룹 비밀번호를 입력해 주세요"}
          btn={"삭제하기"}
          value={delpwd}
          onChange={(e) => setDelPwd(e.target.value)}
          onSubmit={handleGroupDel}
          onClose={closeDelModal}
          main={moveToMain}
        />
      )}
      {memoryModal && <MemoryModal onClose={handleMemoryCloseModal} onMemoryAdded={handleMemoryAdded}/>}
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
