import NoneData from "./noneData";
import PublicDetail from "../../components/publicDetail";
import MakeButton from "../../components/makeButton";
import {
  OutContainer,
  BodyContainer,
  Bar,
  TitleContainer,
  Title,
} from "./publicGroupDetail";

const DetailNoneData = () => {
  return (
    <OutContainer>
      <BodyContainer>
        <PublicDetail />
        <Bar />
        <TitleContainer>
          <Title>추억 목록</Title>
          <MakeButton title={"추억 올리기"} />
        </TitleContainer>
        <NoneData />
      </BodyContainer>
    </OutContainer>
  )
}

export default DetailNoneData