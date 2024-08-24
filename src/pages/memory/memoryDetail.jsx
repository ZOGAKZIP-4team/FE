import styled from "styled-components";
import PropTypes from "prop-types";
import { DayContainer, Day, PublicY } from "../../components/publicList";
import seperate from "../../assets/seperate.svg";
import smallIcon from "../../assets/smallIcon.svg";
import commentIcon from "../../assets/CommentIcon.svg";
import ButtonCustom from "../../components/button";
import publicImg from "../../assets/publicImg.svg";
import arrowRight from "../../assets/arrowRight.svg";
import pen from "../../assets/Pen.svg";
import trashBin from "../../assets/trashBin.svg";

const MemoryDetail = ({ onModModal, onDelModal }) => {
  return (
    <TotalContainer>
      <OutContainer>
        <BodyContainer>
          <ContentContainer>
            <TopContainer>
              <DayContainer>
                <Day>달봉이아들</Day>
                <img src={seperate} />
                <PublicY>공개</PublicY>
              </DayContainer>
              <ModDelContainer>
                <ButtonMod onClick={onModModal}>추억 수정하기</ButtonMod>
                <ButtonDel onClick={onDelModal}>추억 삭제하기</ButtonDel>
              </ModDelContainer>
            </TopContainer>
            <TitleContainer>
              <Title>인천 앞바다에서 무려 60cm 월척을 낚다!</Title>
            </TitleContainer>
            <TagContainer>#인천 #낚시</TagContainer>
          </ContentContainer>
          <BottomContainer>
            <FirstContainer>
              <Location>인천 앞바다</Location>
              <Date>24.01.19</Date>
            </FirstContainer>
            <SecondContainer>
              <InfoContainer>
                <img src={smallIcon} />
                <Info>120</Info>
              </InfoContainer>
              <InfoContainer>
                <img src={commentIcon} />
                <Info>8</Info>
              </InfoContainer>
            </SecondContainer>
          </BottomContainer>
          <SendButton>
            <img
              src={smallIcon}
              style={{ width: "1.375rem", height: "1.375rem" }}
            />
            공감 보내기
          </SendButton>
        </BodyContainer>
      </OutContainer>
      <BarCustom />
      <MainContainer>
        <PhotoContainer src={publicImg} />
        <Main>
          인천 앞바다에서 월척을 낚았습니다! 가족들과 기억에 오래도록 남을 멋진
          하루였어요 가족들과 기억에 오래도록 남을 멋진 하루였어요 가족들과
          기억에 오래도록 남을 멋진 하루였어요 인천 앞바다에서 월척을
          낚았습니다! 가족들과 기억에 오래도록 남을 멋진 하루였어요 인천
          앞바다에서 월척을 낚았습니다!
        </Main>
      </MainContainer>
      <ButtonCustom title={"댓글 등록하기"} />
      <Comment />
      <PageComponent />
    </TotalContainer>
  );
};

export default MemoryDetail;

MemoryDetail.propTypes = {
  onModModal: PropTypes.func.isRequired,
  onDelModal: PropTypes.func.isRequired,
};

const TotalContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: center;
  gap: 10%;
`;

const OutContainer = styled.div`
  display: flex;
  width: 100%;
  height: 17.0625rem; /* 273px -> 17.0625rem */
  gap: 3.125rem; /* 50px -> 3.125rem */
  justify-content: center;
`;

const ModDelContainer = styled.div`
  display: flex;
  width: 14rem; /* 224px -> 14rem */
  height: 1.125rem; /* 18px -> 1.125rem */
  justify-content: space-between;
`;

const TopContainer = styled.div`
  display: flex;
  width: 100%;
  height: 1.25rem; /* 20px -> 1.25rem */
  justify-content: space-between;
`;

const ButtonMod = styled.button`
  display: inline-flex;
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 0.875rem; /* 14px -> 0.875rem */
  font-weight: 400;
  color: #282828;
  padding: 0;
  background-color: transparent;
`;

const ButtonDel = styled(ButtonMod)`
  color: #8d8d8d;
`;

const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 75%; /* 1238px -> 77.375rem */
  height: 100%; /* 273px -> 17.0625rem */
  position: relative;
  gap: 1.875rem; /* 30px -> 1.875rem */
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%; /* 1238px -> 77.375rem */
  height: 9.125rem; /* 146px -> 9.125rem */
  gap: 1.25rem; /* 20px -> 1.25rem */
`;

const TitleContainer = styled(TopContainer)`
  height: 2.375rem; /* 38px -> 2.375rem */
`;

const Title = styled.h1`
  font-size: 1.875rem; /* 30px -> 1.875rem */
  font-weight: 700;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const SendButton = styled.button`
  display: flex;
  position: absolute;
  right: 0;
  bottom: 0;
  width: 11.75rem; /* 188px -> 11.75rem */
  height: 3.25rem; /* 52px -> 3.25rem */
  padding: 0.9375rem 2.1875rem; /* 15px 35px -> 0.9375rem 2.1875rem */
  font-size: 1rem; /* 16px -> 1rem */
  font-weight: 500;
  border: 1px solid #282828;
  border-radius: 0.375rem; /* 6px -> 0.375rem */
  background-color: transparent;
  align-items: center;
  gap: 0.625rem; /* 10px -> 0.625rem */
`;

const TagContainer = styled.div`
  display: flex;
  width: 60%;
  height: 30%;
  color: #b8b8b8;
  font-size: 18px;
  font-weight: 400;
`;

const BottomContainer = styled.div`
  display: flex;
  width: 30%;
`;

const FirstContainer = styled.div`
  display: flex;
  width: 50%;
  gap: 10%;
`;

const SecondContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 30%;
`;

const Location = styled.h1`
  font-size: 16px;
  font-weight: 700;
  margin: 0;
`;

const Date = styled(Location)``;

const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  width: 40%;
  gap: 15%;
`;

const Info = styled.h1`
  font-size: 14px;
  font-weight: 400;
  color: #8d8d8d;
  margin: 0;
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  gap: 10%;
`;

const PhotoContainer = styled.img`
  width: 50%;
`;

const Main = styled.div`
  display: flex;
  width: 100%;
  height: 30%;
  font-size: 20px;
  font-weight: 400;
  text-align: left;
`;

const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 20%;
`;

const CommentTitleContainer = styled.div`
  display: flex;
  width: 50px;
  gap: 10%;
`;

const CommentTitle = styled.h1`
  font-size: 18px;
  font-weight: 500;
  margin: 0;
`;

const CommentList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 80%;
  gap: 10px;
`;

const CommentTop = styled.div`
  display: flex;
  width: 30%;
  gap: 5%;
`;

const NickName = styled.h1`
  font-size: 16px;
  font-weight: 500;
  margin: 0;
  color: black;
`;

const Time = styled(NickName)`
  color: #b8b8b8;
`;

const CommentContent = styled.div`
  display: flex;
  width: 80%;
`;

const Bar = styled.hr`
  display: flex;
  width: 100%;
  color: #282828;
  opacity: 50%;
`;

const BarCustom = styled(Bar)`
  width: 100%;
  color: #dddddd;
  opacity: 50%;
`;

export const Comment = () => {
  return (
    <CommentOutContainer>
      <GapBar>
        <CommentContainer>
          <CommentTitleContainer>
            <CommentTitle>댓글</CommentTitle>
            <CommentTitle>8</CommentTitle>
          </CommentTitleContainer>
        </CommentContainer>
        <Bar />
      </GapBar>
      <CommentList>
        <CommentTop>
          <NickName>다람이네 가족</NickName>
          <Time>24.01.18 21:50</Time>
        </CommentTop>
        <Bottom>
          <CommentContent>
            우와 60cm이라니..!! 저도 가족들과 가봐야겠어요~
          </CommentContent>
          <ButtonContainer>
            <Button src={pen} />
            <Button src={trashBin} />
          </ButtonContainer>
        </Bottom>
        <BarCustom />
      </CommentList>
    </CommentOutContainer>
  );
};

const CommentOutContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  height: 100%;
  gap: 20px;
`;

const GapBar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50%;
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 60px;
  gap: 20px;
`;

const Button = styled.img`
  width: 1.25rem;
`;

const Bottom = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const PageComponent = () => {
  return (
    <PageContainer>
      <Page>
        <LeftB src={arrowRight} />
      </Page>
      <PageBody>
        <Page>1</Page>
        <Page>2</Page>
        <Page>3</Page>
        <Page>4</Page>
        <Page>5</Page>
      </PageBody>
      <Page>
        <RightB src={arrowRight} />
      </Page>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  display: flex;
  width: 23%;
  align-items: center;
  justify-content: center;
`;

const PageBody = styled.div`
  display: flex;
  width: 80%;
  gap: 10px;
  align-items: center;
  justify-content: center;
`;

const Page = styled.button`
  display: flex;
  width: 3rem;
  height: 3rem;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: 1px solid #282828;
  background-color: transparent;
`;

const LeftB = styled.img`
  display: flex;
  width: 3rem;
  cursor: pointer;
  transform: rotate(180deg);
`;

const RightB = styled.img`
  display: flex;
`;
