import styled from "styled-components";
import smallIcon from "../assets/smallIcon.svg";
import seperate from "../assets/seperate.svg";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import {
  DayContainer,
  Day,
  PublicY,
  Title,
  LookContainer,
  GetContainer,
  SmallContent,
  IconContainer,
  Icon,
} from "./publicList";
import commentIcon from "../assets/commentIcon.svg";

const MemoryPrivateList = ({ data }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    console.log("data 객체: ", data);
    //navigate(`/group/private/${data._id}`, {state: {dayCount}});
    //navigate(`/group/access/${data._id}`);
    navigate(`/memory/access/${data._id}`);
  };

  // createdAt을 Date 객체로 변환하고 현재 날짜와의 차이를 계산
  //   const createdAt = new Date(data.createdAt);
  //   const currentDate = new Date();
  //   const timeDiff = Math.abs(currentDate - createdAt);
  //   const dayCount = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // 밀리초를 일수로 변환
  return (
    <OuterContainer onClick={handleClick}>
      <ContentOutContainer>
        <DayContainer>
          <Day>그룹명</Day>
          <img src={seperate} />
          <PublicY>{data.isPublic ? "공개" : "비공개"}</PublicY>
        </DayContainer>
        <Title>추억 이름</Title>
        <LookContainer>
          <GetContainer>
            <IconContainer>
              <Icon src={smallIcon} />
              <SmallContent>120</SmallContent>
            </IconContainer>
            <IconContainer>
              <Icon src={commentIcon} />
              <SmallContent>8</SmallContent>
            </IconContainer>
          </GetContainer>
        </LookContainer>
      </ContentOutContainer>
    </OuterContainer>
  );
};

MemoryPrivateList.propTypes = {
  data: PropTypes.shape({
    imageUrl: PropTypes.string.isRequired,
    isPublic: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    introduction: PropTypes.string.isRequired,
    badgeCount: PropTypes.number.isRequired,
    likeCount: PropTypes.number.isRequired,
    postCount: PropTypes.number.isRequired,
    createdAt: PropTypes.instanceOf(Date).isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
};

export default MemoryPrivateList;

const OuterContainer = styled.div`
  display: flex;
  max-width: 23.4375rem; /* 375px */
  max-height: 9.75rem; /* 156px */
  border: 1px solid #dddddd;
  border-radius: 0.75rem; /* 12px */
  gap: 0.625rem; /* 10px */
  align-items: center;
  padding: 1.875rem; /* 30px */
  box-sizing: border-box;
`;

const ContentOutContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 20.9375rem; /* 335px */
  height: 7.25rem; /* 116px */
  gap: 1.25rem; /* 20px */
`;
