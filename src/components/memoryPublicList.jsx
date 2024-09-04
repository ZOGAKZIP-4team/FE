import styled from "styled-components";
//import publicList from "../assets/publicImg.svg";
import smallIcon from "../assets/smallIcon.svg";
import seperate from "../assets/seperate.svg";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import commentIcon from "../assets/commentIcon.svg";

const MemoryPublicList = ({ data }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    console.log("data 객체: ", data);
    navigate(`/memory/${data._id}`);
  };

  return (
    <OuterContainer onClick={handleClick}>
      <PhotoContainer src={data.imageUrl} alt="이미지 준비 중" />
      <ContentOutContainer>
        <DayContainer>
          <Day>{data.nickname}</Day>
          <img src={seperate} />
          <PublicY>{data.isPublic ? "공개" : "비공개"}</PublicY>
        </DayContainer>
        <ContentInContainer>
          <Title>{data.title}</Title>
          <TagContainer>
            {data.tags.map((tag, index) => (
              <Tag key={index}>#{tag}</Tag>
            ))}
          </TagContainer>
        </ContentInContainer>
        <LookContainer>
          <LeftContainer>
            <GetContainer>
              <SmallContent>{data.location}</SmallContent>
            </GetContainer>
            <GetContainer>
              <SmallContent>
                {data.moment.slice(0, 10).replace(/-/g, ".")}
              </SmallContent>
            </GetContainer>
          </LeftContainer>
          <RightContainer>
            <IconContainer>
              <Icon src={smallIcon} />
              <MiddleContent>{data.likeCount}</MiddleContent>
            </IconContainer>
            <IconContainer>
              <Icon src={commentIcon} />
              <MiddleContent>{data.commentCount}</MiddleContent>
            </IconContainer>
          </RightContainer>
        </LookContainer>
      </ContentOutContainer>
    </OuterContainer>
  );
};

MemoryPublicList.propTypes = {
  data: PropTypes.shape({
    nickname: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    isPublic: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    tags: PropTypes.array.isRequired,
    location: PropTypes.string.isRequired,
    moment: PropTypes.string.isRequired,
    commentCount: PropTypes.number.isRequired,
    likeCount: PropTypes.number.isRequired,
    createdAt: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
};

export default MemoryPublicList;

export const OuterContainer = styled.div`
  display: flex;
  align-items: center;
  width: 23.4375rem; /* 375px */
  height: 35.0625rem; /* 561px */
  flex-direction: column;
  border: 1px solid #ededed;
  border-radius: 0.625rem; /* 10px */
  gap: 1.25rem; /* 20px */
`;

const PhotoContainer = styled.img`
  display: flex;
  width: 20.9375rem; /* 335px */
  height: 20.9375rem; /* 335px */
  border-radius: 0.375rem; /* 6px */
  margin-top: 1.25rem; /* 20px */
`;

const ContentOutContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 20.9375rem; /* 335px */
  height: 10.375rem; /* 166px */
  gap: 1.25rem; /* 20px */
`;

export const DayContainer = styled.div`
  display: flex;
  width: 30%;
  height: 1.125rem; /* 18px */
  justify-content: space-between;
  align-items: center;
`;

export const Day = styled.h1`
  font-size: 0.875rem; /* 14px */
  margin: 0;
  font-weight: 400;
`;

export const PublicY = styled(Day)`
  color: #8d8d8d;
`;

export const ContentInContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 20.9375rem; /* 335px */
  height: 4.375rem; /* 70px */
  gap: 0.625rem; /* 10px */
`;

export const Title = styled.h1`
  text-align: left;
  font-size: 1rem; /* 16px */
  font-weight: 700;
  margin: 0;
`;

const TagContainer = styled.div`
  display: flex;
  width: 60%;
  height: 30%;
  color: #B8B8B8;
  font-size: 14px;
  font-weight: 400;
  gap: 6px;
`;

export const LookContainer = styled.div`
  display: flex;
  width: 100%; /* 199px */
  height: 20%;
  gap: 2.5rem; /* 40px */
  justify-content: space-between;
  align-items: center;
`;

export const GetContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 3.4375rem; /* 55px */
  gap: 0.3125rem; /* 5px */
`;

const LeftContainer = styled.div`
  display: flex;
  width: 35%;
  gap: 10%;
`;

const RightContainer = styled.div`
  display: flex;
  width: 35%;
  gap: 15%;
`;

export const SmallTitle = styled.h1`
  font-size: 0.75rem; /* 12px */
  font-weight: 400;
  color: #b8b8b8;
  margin: 0;
  width: 3.4375rem; /* 55px */
  height: 0.9375rem; /* 15px */
  text-align: left;
`;

export const SmallContent = styled(SmallTitle)`
  color: #282828;
  font-size: 12x;
`;

const MiddleContent = styled(SmallContent)`
  font-size: 14px;
`;

export const IconContainer = styled.div`
  display: flex;
  width: 3.1875rem; /* 51px */
  height: 1.125rem; /* 18px */
  align-items: center;
  gap: 0.3125rem; /* 5px */
`;

export const Icon = styled.img`
  display: flex;
  width: 1.125rem; /* 18px */
  height: 1.125rem; /* 18px */
`;

const Tag = styled.span`
  font-size: 14px;
`;