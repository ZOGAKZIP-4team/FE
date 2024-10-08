import styled from "styled-components";
import PropTypes from "prop-types";
import { DayContainer, Day, PublicY } from "./publicList";
import seperate from "../assets/seperate.svg";
import next from "../assets/next.svg";
import smallIcon from "../assets/smallIcon.svg";
//import publicImg from "../assets/publicImg.svg";
import { groupLike } from "../Utils/GroupUtils";
import { useRef, useState } from "react";

const PublicDetail = ({ onModModal, onDelModal, data, dayCount }) => {
  const badgesRef = useRef(null); // 배지 영역에 대한 참조를 생성
  // 공감하기 클릭 시 상태 변화
  const [likeC, setLikeC] = useState(data.likeCount || 0);
  // 추억 업로드 시 상태 변화
  //const [postC, setPostC] = useState(data.postCount || 0);

  // 그룹 공감하기
  const handleGroupLike = async () => {
    try {
      const response = await groupLike(data._id);
      if (response) {
        console.log("그룹 공감 성공: ", response);
        setLikeC((prevCount) => prevCount + 1);
      }
    } catch (error) {
      console.log("그룹 공감 실패: ", error);
    }
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  // next 버튼 클릭 시 스크롤 이동
  const handleNextClick = () => {
    console.log("next 버튼 클릭");
    if (badgesRef.current) {
      badgesRef.current.scrollBy({
        left: 200, // 스크롤할 픽셀 양 (배지 2~3개씩 보이도록 설정)
        behavior: "smooth",
      });
    }
  };

  return (
    <OutContainer>
      <PhotoContaienr src={data.imageUrl} />
      <BodyContainer>
        <ContentContainer>
          <TopContainer>
            <DayContainer>
              <Day>D+{dayCount}</Day>
              <img src={seperate} />
              <PublicY>공개</PublicY>
            </DayContainer>
            <ModDelContainer>
              <ButtonMod onClick={onModModal}>그룹 정보 수정하기</ButtonMod>
              <ButtonDel onClick={onDelModal}>그룹 삭제하기</ButtonDel>
            </ModDelContainer>
          </TopContainer>
          <TitleContainer>
            <Title>{data.name}</Title>
            <RightContainer>
              <NoticeContainer1>추억 {data.postCount || 0}</NoticeContainer1>
              <img src={seperate} />
              <NoticeContainer1>그룹 공감 {likeC}</NoticeContainer1>
            </RightContainer>
          </TitleContainer>
          <Content>{data.introduction}</Content>
        </ContentContainer>
        <BadgeContainer>
          <BadgeTitle>획득 배지</BadgeTitle>
          <Badges ref={badgesRef}> {/* Badges에 ref 연결 */}
            {data.badges &&
              data.badges.length > 0 &&
              data.badges.map((badge, index) => (
                <BadgeButton key={index}>{badge}</BadgeButton>
              ))}
          </Badges>
          {data.badges && data.badges.length > 0 && (
            <NextButton src={next} onClick={handleNextClick} />  // NextButton이 BadgeContainer 안에 있지만 위치는 고정
          )}
        </BadgeContainer>
        <SendButton onClick={handleGroupLike}>
          <img
            src={smallIcon}
            style={{ width: "1.375rem", height: "1.375rem" }}
          />
          공감 보내기
        </SendButton>
      </BodyContainer>
    </OutContainer>
  );
};

export default PublicDetail;

PublicDetail.propTypes = {
  onModModal: PropTypes.func.isRequired,
  onDelModal: PropTypes.func.isRequired,
  dayCount: PropTypes.number.isRequired,
  data: PropTypes.shape({
    imageUrl: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    postCount: PropTypes.number.isRequired,
    likeCount: PropTypes.number.isRequired,
    introduction: PropTypes.string.isRequired,
    badges: PropTypes.arrayOf(PropTypes.string).isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
};

const OutContainer = styled.div`
  display: flex;
  width: 100%;
  height: 17.0625rem; /* 273px -> 17.0625rem */
  gap: 3.125rem; /* 50px -> 3.125rem */
  justify-content: center;
`;

const PhotoContaienr = styled.img`
  display: flex;
  width: 16.375rem; /* 262px -> 16.375rem */
  height: 17.0625rem; /* 273px -> 17.0625rem */
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

const BadgeContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%; /* 994px -> 62.125rem */
  height: 6.5rem; /* 82px -> 5.125rem */
  gap: 1.7rem; /* 20px -> 1.25rem */
`;

const TitleContainer = styled(TopContainer)`
  height: 2.375rem; /* 38px -> 2.375rem */
`;

const RightContainer = styled.div`
  display: flex;
  width: 15rem; /* 224px -> 14rem */
  height: 1rem;
  justify-content: space-between;
`;

const Title = styled.h1`
  font-size: 1.875rem; /* 30px -> 1.875rem */
  font-weight: 700;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Content = styled.h1`
  font-size: 1.125rem; /* 18px -> 1.125rem */
  font-weight: 400;
  margin: 0;
  text-align: left;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
`;

const NoticeContainer1 = styled.div`
  display: inline-flex;
  font-size: 1.125rem; /* 18px -> 1.125rem */
  font-weight: 700;
  align-items: center;
`;

const BadgeTitle = styled.h1`
  text-align: left;
  font-size: 1rem; /* 16px -> 1rem */
  font-weight: 700;
  margin: 0;
`;

const Badges = styled.div`
  display: flex;
  width: 100%; /* 994px -> 62.125rem */
  height: 3.25rem; /* 52px -> 3.25rem */
  gap: 0.625rem; /* 10px -> 0.625rem */
  position: relative;
  overflow: hidden;
  scroll-behavior: smooth; /* 스크롤이 부드럽게 이동 */
  white-space: nowrap; /* 배지가 한 줄에 나열되도록 설정 */
  &::-webkit-scrollbar {
    display: none; /* 스크롤바 숨김 */
  }

  @media (min-width: 768px) and (max-width: 1199px) {
    width: 80%;
  }

  @media (min-width: 1200px) and (max-width: 1776px) {
    width: 90%;
  }
`;

const BadgeButton = styled.button`
  display: inline-flex;
  align-items: center;
  padding: 1rem 1.875rem; /* 16px 30px -> 1rem 1.875rem */
  background-color: #f4f4f4;
  border-radius: 1.875rem; /* 30px -> 1.875rem */
  outline: none;
  font-size: 1rem; /* 16px -> 1rem */
  font-weight: 500;
`;

const NextButton = styled.img`
  display: flex;
  position: absolute;
  right: 22%;
  bottom: 2%;
  cursor: pointer;
  @media (max-width: 900px) {
    right: 30%;
  }
  z-index: 10;
`;

const SendButton = styled.button`
  display: flex;
  position: absolute;
  right: 0;
  bottom: 2%;
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
  @media (max-width: 1300px) {
    bottom: 30%;
    right: 5%;
  }
`;
