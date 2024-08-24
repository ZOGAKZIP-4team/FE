import styled from "styled-components";
import publicList from "../assets/publicImg.svg";
import smallIcon from "../assets/smallIcon.svg";
import seperate from "../assets/seperate.svg";

const PublicList = () => {
  return (
    <OuterContainer>
      <PhotoContainer src={publicList} />
      <ContentOutContainer>
        <DayContainer>
          <Day>D+265</Day>
          <img src={seperate} />
          <PublicY>공개</PublicY>
        </DayContainer>
        <ContentInContainer>
          <Title>에델바이스</Title>
          <Content>
            서로 한 마음으로 응원하고 아끼는 달봉이네 가족입니다.
          </Content>
        </ContentInContainer>
        <LookContainer>
          <GetContainer>
            <SmallTitle>획득 배지</SmallTitle>
            <SmallContent>2</SmallContent>
          </GetContainer>
          <GetContainer>
            <SmallTitle>추억</SmallTitle>
            <SmallContent>8</SmallContent>
          </GetContainer>
          <GetContainer>
            <SmallTitle>그룹 공감</SmallTitle>
            <IconContainer>
              <Icon src={smallIcon} />
              <SmallContent>1.5K</SmallContent>
            </IconContainer>
          </GetContainer>
        </LookContainer>
      </ContentOutContainer>
    </OuterContainer>
  );
};

export default PublicList;

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
  width: 9rem; /* 91px */
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

const Content = styled.h1`
  font-weight: 400;
  text-align: left;
  font-size: 1rem; /* 16px */
  margin: 0;
`;

export const LookContainer = styled.div`
  display: flex;
  width: 12.4375rem; /* 199px */
  height: 2.375rem; /* 38px */
  gap: 2.5rem; /* 40px */
`;

export const GetContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 3.4375rem; /* 55px */
  height: 2.375rem; /* 38px */
  gap: 0.3125rem; /* 5px */
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
