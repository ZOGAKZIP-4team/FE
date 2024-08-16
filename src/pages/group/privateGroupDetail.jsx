//import styled from "styled-components";
import PrivateGroup from "./privateGroup";
import PublicDetail from "../../components/publicDetail";
import MakeButton from "../../components/makeButton";
import {
  OutContainer,
  BodyContainer,
  Bar,
  TitleContainer,
  Title,
} from "./publicGroupDetail";
const PrivateGroupDetail = () => {
  return (
    <OutContainer>
      <BodyContainer>
        <PublicDetail />
        <Bar />
        <TitleContainer>
          <Title>추억 목록</Title>
          <MakeButton title={"추억 올리기"} />
        </TitleContainer>
        <PrivateGroup />
      </BodyContainer>
    </OutContainer>
  );
};

export default PrivateGroupDetail;
