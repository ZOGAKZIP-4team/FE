import styled from "styled-components";
import PubYNButton from "../../components/pubYNButton";
import Search from "../../components/search";
import AlignDrop from "../../components/alignDropdown";
import ButtonCustom from "../../components/button";

import {
  OutContaienr,
  TopContainer,
  ButtonContainer,
  BtnSearchContainer,
  BodyContainer,
} from "./publicGroup";
import noneGroup from "../../assets/noneGroup.svg";

const NoneData = () => {
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
        <InnerContainer>
            <Notice src={noneGroup} />
            <ButtonCustom title={"그룹 만들기"}/>
        </InnerContainer>
      </BodyContainer>
    </OutContaienr>
  );
};

export default NoneData;

const Notice = styled.img`
  display: flex;
  width: 208px;
  height: 201px;
  padding: 0;
  margin: 0;
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
