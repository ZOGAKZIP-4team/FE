import styled from "styled-components";
import smallIcon from "../assets/smallIcon.svg";
import seperate from "../assets/seperate.svg";
import {
  DayContainer,
  Day,
  PublicY,
  Title,
  LookContainer,
  GetContainer,
  SmallContent,
  SmallTitle,
  IconContainer,
  Icon,
} from "./publicList";

const PrivateList = () => {
  return (
    <OuterContainer>
      <ContentOutContainer>
        <DayContainer>
          <Day>D+265</Day>
          <img src={seperate} />
          <PublicY>비공개</PublicY>
        </DayContainer>
        <Title>달봉이네 가족</Title>
        <LookContainer>
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

export default PrivateList;

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
