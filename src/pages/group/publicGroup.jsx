import styled from "styled-components";
import PublicList from "../../components/publicList";
import PubYNButton from "../../components/pubYNButton";
import Search from "../../components/search";
import AddViewButton from "../../components/addViewButton";
import AlignDrop from "../../components/alignDropdown";

const PublicGroup = () => {
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
        <PublicList />
        <PublicList />
        <PublicList />
        <PublicList />
        <PublicList />
        <PublicList />
        <PublicList />
        <PublicList />
        <PublicList />
        <PublicList />
        <PublicList />
        <PublicList />
        <PublicList />
        <PublicList />
        <PublicList />
        <PublicList />
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
