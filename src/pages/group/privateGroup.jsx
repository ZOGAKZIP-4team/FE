import { useState, useEffect } from "react";
import PubYNButton from "../../components/pubYNButton";
import Search from "../../components/search";
import AddViewButton from "../../components/addViewButton";
import AlignDrop from "../../components/alignDropdown";
import PrivateList from "../../components/privateList";
import {
  OutContaienr,
  TopContainer,
  ButtonContainer,
  BtnSearchContainer,
  BodyContainer,
} from "./publicGroup";
import { groupGet } from "../../Utils/GroupUtils";

const PrivateGroup = () => {
  // 목록 상태 관리
  const [list, setList] = useState([]);

  // 그룹 목록 조회
  const handleGroupGet = async () => {
    try {
      const response = await groupGet();
      if (response && response.data) {
        console.log("그룹 목록 조회 성공: ", response);
        setList(response.data);
      }
    } catch (error) {
      console.log("그룹 목록 조회 실패: ", error);
    }
  };

  useEffect(() => {
    handleGroupGet();
  }, []);

  return (
    <OutContaienr>
      <TopContainer>
        <BtnSearchContainer>
          <ButtonContainer>
            <PubYNButton title={"공개"} />
            <PubYNButton title={"비공개"} />
          </ButtonContainer>
          <Search />
        </BtnSearchContainer>
        <AlignDrop />
      </TopContainer>
      <BodyContainer>
        {list
          .filter((item) => item.isPublic === false) // isPublic이 false인 리스트만 필터링
          .map((item, index) => (
            <PrivateList key={index} data={item} />
          ))}
      </BodyContainer>
      <AddViewButton />
    </OutContaienr>
  );
};

export default PrivateGroup;