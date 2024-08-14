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

const PrivateGroup = () => {
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
        <PrivateList />
        <PrivateList />
        <PrivateList />
        <PrivateList />
        <PrivateList />
        <PrivateList />
        <PrivateList />
        <PrivateList />
        <PrivateList />
        <PrivateList />
        <PrivateList />
        <PrivateList />
        <PrivateList />
        <PrivateList />
        <PrivateList />
        <PrivateList />
      </BodyContainer>
      <AddViewButton />
    </OutContaienr>
  );
};

export default PrivateGroup;
