import styled from "styled-components";
import PublicList from "../../components/publicList";
import PubYNButton from "../../components/pubYNButton";
import Search from "../../components/search";
import AddViewButton from "../../components/addViewButton";
import AlignDrop from "../../components/alignDropdown";
import { useState, useEffect } from "react";
import { groupGet } from "../../Utils/GroupUtils";
import noneGroup from "../../assets/noneGroup.svg";
import ButtonCustom from "../../components/button";
import PrivateList from "../../components/privateList";
import { useCallback } from "react";
import debounce from "lodash/debounce";

const PublicGroup = () => {
  const [list, setList] = useState([]);
  const [keyword, setKeyword] = useState("");
  // 공개 여부에 따라 상태 관리
  const [isPublicFilter, setIsPublicFilter] = useState(true); // default는 공개
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("latest");

  // 그룹 목록 조회
  const handleGroupGet = async (searchKeyword) => {
    try {
      const response = await groupGet(
        page,
        10,
        sortBy,
        searchKeyword,
        isPublicFilter
      );
      if (response && response.data) {
        console.log("그룹 목록 조회 성공: ", response);
        setList(response.data);
      }
    } catch (error) {
      console.log("그룹 목록 조회 실패: ", error);
    }
  };

  // 검색 요청을 디바운스 처리
  const debouncedSearch = useCallback(
    debounce((searchTerm) => {
      handleGroupGet(searchTerm);
    }, 500), // 500ms 지연
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
            hint={"그룹명을 입력해 주세요"}
          />
        </BtnSearchContainer>
        <AlignDrop onSelect={setSortBy} />
      </TopContainer>
      <BodyContainer>
        {filteredList.length === 0 ? (
          <InnerContainer>
            <Notice src={noneGroup} />
            <ButtonCustom title={"그룹 만들기"} />
          </InnerContainer>
        ) : (
          filteredList.map((item, index) =>
            isPublicFilter ? (
              <PublicList key={index} data={item} />
            ) : (
              <PrivateList key={index} data={item} />
            )
          )
        )}
      </BodyContainer>
      <AddViewButton />
    </OutContaienr>
  );
};

export default PublicGroup;

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
