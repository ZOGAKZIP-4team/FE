import styled from "styled-components";
import PubYNButton from "../../components/pubYNButton";
import Search from "../../components/search";
import AddViewButton from "../../components/addViewButton";
import AlignDrop from "../../components/alignDropdown";
import { useState, useEffect, useCallback, useImperativeHandle, forwardRef } from "react";
import { boardGet } from "../../Utils/BoardUtils";
import noneMemory from "../../assets/noneMemory.svg";
import ButtonCustom from "../../components/button";
import MemoryPrivateList from "../../components/memoryPrivateList";
import MemoryPublicList from "../../components/memoryPublicList";
import { useParams } from "react-router-dom";
import { debounce } from "lodash";
import MemoryModal from "../memory/memoryModal";

const MemoryPublicGroup = forwardRef((props, ref) => {
  const { groupId } = useParams();
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("latest");
  const [list, setList] = useState([]);
  const [keyword, setKeyword] = useState("");

  const { onUpdateGroupDetail } = props; // 부모 컴포넌트로부터 받은 props 함수

  // 모달 상태 관리 - 추억 올리기
  const [memoryModal, setMemoryModal] = useState(false);

  const handleMemoryModal = () => {
    setMemoryModal(true);
    console.log("추억 올리기 클릭");
  };

  const handleMemoryCloseModal = () => {
    setMemoryModal(false);
  };

  // 공개 여부에 따라 상태 관리
  const [isPublicFilter, setIsPublicFilter] = useState(true); // default는 공개

  // 게시물 목록 조회
  const handleBoardGet = async (searchKeyword, page) => {
    try {
      const response = await boardGet(
        groupId,
        page,
        10,
        sortBy,
        searchKeyword,
        isPublicFilter
      );
      if (response && response.data) {
        console.log("게시물 목록 조회 성공: ", response.data);
        if (page == 1) {
          setList(response.data);
        } else {
          setList((prevList) => [...prevList, ...response.data]);
        }

        // 목록이 변경되었을 때 부모 컴포넌트로 알림을 보냄
        if (onUpdateGroupDetail) {
          onUpdateGroupDetail(); // PublicGroupDetail에 변경 사항 알림
        }
      }
    } catch (error) {
      console.log("게시물 목록 조회 실패: ", error);
    }
  };

  // 검색 디바운스
  const debouncedSearch = useCallback(
    debounce((searchTerm) => {
      handleBoardGet(searchTerm, page);
    }, 500),
    [isPublicFilter, sortBy, page]
  );

  useEffect(() => {
    debouncedSearch(keyword);
  }, [keyword, debouncedSearch]);

  // 필터링된 리스트
  const filteredList = list.filter((item) => item.isPublic === isPublicFilter);

  // 페이지 증가
  const handleLoadMore = () => {
    console.log("클릭");
    setPage((prevPage) => prevPage + 1);
  };

  //게시물 등록 후 목록 업데이트
  const handleNewMemoryAdded = async () => {
    // 첫 페이지의 데이터를 다시 불러와 목록을 갱신
    setKeyword("");
    await handleBoardGet(keyword, 1);
  };

   // Ref를 통해 외부에서 이 함수를 호출할 수 있도록 합니다.
  useImperativeHandle(ref, () => ({
    handleNewMemoryAdded,
  }));

  return (
    <OutContaienr>
      <TopContainer>
        <BtnSearchContainer>
          <ButtonContainer>
            <PubYNButton
              title={"공개"}
              isActive={isPublicFilter}
              onClick={() => setIsPublicFilter(true)}
            />
            <PubYNButton
              title={"비공개"}
              isActive={!isPublicFilter}
              onClick={() => setIsPublicFilter(false)}
            />
          </ButtonContainer>
          <Search
            onSearch={(value) => setKeyword(value)}
            hint={"태그 혹은 제목을 입력해 주세요"}
          />
        </BtnSearchContainer>
        <AlignDrop onSelect={setSortBy} />
      </TopContainer>
      <BodyContainer>
        {filteredList.length === 0 ? (
          <InnerContainer>
            <Notice src={noneMemory} />
            <ButtonCustom title={"추억 올리기"} onClick={handleMemoryModal} />
          </InnerContainer>
        ) : (
          filteredList.map((item, index) =>
            isPublicFilter ? (
              <MemoryPublicList key={index} data={item} />
            ) : (
              <MemoryPrivateList key={index} data={item} />
            )
          )
        )}
      </BodyContainer>
      <AddViewButton onClick={handleLoadMore} />
      {memoryModal && <MemoryModal onClose={handleMemoryCloseModal} onMemoryAdded={handleNewMemoryAdded}/>}
    </OutContaienr>
  );
});

MemoryPublicGroup.displayName = 'MemoryPublicGroup';

export default MemoryPublicGroup;

export const OutContaienr = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 60px;
  width: 100%;
  padding: 20px 0 100px 0;
`;
export const TopContainer = styled.div`
  display: flex;
  width: 90%;
  height: 50px;
  gap: 30px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  width: 160px;
  height: 50px;
  padding: 0;
  gap: 10px;
`;

export const BtnSearchContainer = styled.div`
  display: flex;
  align-items: center;
  width: 90%;
  height: 50px;
  padding: 0;
  gap: 20px;
`;

export const BodyContainer = styled.div`
  display: flex;
  width: 95%;
  height: 100%;
  justify-content: center;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 400px;
  height: 500px;
  gap: 180px;
  padding-top: 100px;
`;

const Notice = styled.img`
  display: flex;
  width: 208px;
  height: 201px;
  padding: 0;
  margin: 0;
`;
