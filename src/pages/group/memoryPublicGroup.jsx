import styled from "styled-components";
import PubYNButton from "../../components/pubYNButton";
import Search from "../../components/search";
import AddViewButton from "../../components/addViewButton";
import AlignDrop from "../../components/alignDropdown";
import { useState, useEffect, useCallback } from "react";
import { boardGet } from "../../Utils/BoardUtils";
import noneMemory from "../../assets/noneMemory.svg";
import ButtonCustom from "../../components/button";
import MemoryPrivateList from "../../components/memoryPrivateList";
import MemoryPublicList from "../../components/memoryPublicList";
import { useParams } from "react-router-dom";
import { debounce } from "lodash";

const MemoryPublicGroup = () => {
  const { groupId } = useParams();
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("latest");
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [keyword, setKeyword] = useState("");

  // 공개 여부에 따라 상태 관리
  const [isPublicFilter, setIsPublicFilter] = useState(true); // default는 공개

  // 게시물 목록 조회
  const handleBoardGet = async (searchKeyword) => {
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
        setList(response.data);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.log("게시물 목록 조회 실패: ", error);
    } finally {
      setLoading(false);
    }
  };

  // 검색 디바운스
  const debouncedSearch = useCallback(
    debounce((searchTerm) => {
      handleBoardGet(searchTerm);
    }, 500),
    [isPublicFilter, sortBy]
  );

  useEffect(() => {
    debouncedSearch(keyword);
  }, [keyword, debouncedSearch]);

  // 필터링된 리스트
  const filteredList = list.filter((item) => item.isPublic === isPublicFilter);

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
            <ButtonCustom title={"추억 올리기"} />
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
      <AddViewButton onClick={() => setPage((prevPage) => prevPage + 1)} />
    </OutContaienr>
  );
};

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
