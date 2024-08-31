import styled from "styled-components";
import { DayContainer, Day, PublicY } from "../../components/publicList";
import seperate from "../../assets/seperate.svg";
import smallIcon from "../../assets/smallIcon.svg";
import commentIcon from "../../assets/CommentIcon.svg";
import ButtonCustom from "../../components/button";
import arrowRight from "../../assets/arrowRight.svg";
import pen from "../../assets/Pen.svg";
import trashBin from "../../assets/trashBin.svg";
import { useParams } from "react-router-dom";
import { boardDel, boardDetailGet, boardLike } from "../../Utils/BoardUtils";
import { useEffect, useState } from "react";
import MemoryModModal from "./memoryModModal";
import Modal from "../../components/modal";
import CommentModal from "../../components/commentModal";
import { commentDel, commentGet } from "../../Utils/CommentUtils";
import PropTypes from "prop-types";
import CommentModModal from "../../components/commentModModal";

const MemoryDetail = () => {
  const { postId } = useParams();
  // 상세 정보 상태 관리
  const [memoryDetail, setMemoryDetail] = useState(null);
  // 댓글 삭제 시 비밀번호 사애
  const [commentPassword, setCommentPassword] = useState("");

  // 모달 띄우기
  const [isOpen, setIsOpen] = useState(false);

  // 삭제 모달 띄우기
  const [delOpen, setDelOpen] = useState(false);

  // 댓글 모달 띄우기 (등록)
  const [commentModal, setCommentModal] = useState(false);

  // 댓글 모달 띄우기 (수정)
  const [commentMod, setCommentMod] = useState(false);

  // 댓글 수정 모달에 전달한 데이터
  const [commentData, setCommentData] = useState("");

  // 댓글 삭제 모달
  const [commentDelModal, setCommentDelModal] = useState(false);

  // 댓글 목록 불러오기 상태 관리
  const [page, setPage] = useState(1);
  const [commentList, setCommentList] = useState([]);
  const [totalItemCount, setTotalItemCount] = useState("");
  const [commentId, setCommentId] = useState("");

  const [postPassword, setPostPassword] = useState("");

  const openModModal = () => {
    setIsOpen(true);
  };

  const closeModModal = () => {
    setIsOpen(false);
  };

  const openDelModal = () => {
    setDelOpen(true);
  };

  const closeDelModal = () => {
    setDelOpen(false);
  };

  // 댓글 등록 모달
  const openCommentModal = () => {
    setCommentModal(true);
  };

  const closeCommentModal = () => {
    handleCommentGet();
    setCommentModal(false);
  };

  // 댓글 수정 모달
  const openCommentMod = (comment) => {
    setCommentData(comment);
    setCommentMod(true);
  };

  const closeCommentMod = () => {
    setCommentMod(false);
  };

  // 댓글 삭제 모달
  const openCommentDel = (commentId) => {
    setCommentId(commentId);
    setCommentDelModal(true);
  };

  const closeCommentDel = () => {
    setCommentDelModal(false);
  };

  // 게시글 상세 정보 조회
  const handleBoardDetailGet = async () => {
    try {
      const response = await boardDetailGet(postId);
      if (response) {
        console.log("게시글 상세 정보: ", response);
        setMemoryDetail(response.data);
      }
      return response;
    } catch (error) {
      console.log("게시글 상세 정보 실패: ", error);
    }
  };

  // 게시글 삭제
  const handleBoardDel = async () => {
    try {
      const response = await boardDel(postId, postPassword);
      console.log("비밀번호: ", postPassword);
      if (response) {
        console.log("게시글 삭제", response);
      }
    } catch (error) {
      console.log("게시글 삭제 실패: ", error);
    }
  };

  // 게시글 공감하기
  const handleBoardLike = async () => {
    try {
      const response = await boardLike(postId);
      if (response) {
        console.log("게시글 공감: ", response);
      }
    } catch (error) {
      console.log("게시글 공감 실패: ", error);
    }
  };

  // 댓글 목록 조회
  const handleCommentGet = async () => {
    try {
      const response = await commentGet(postId, page, 10);
      if (response) {
        console.log("댓글 목록 조회: ", response);
        console.log("댓글 수: ", response.data.totalItemCount);
        setCommentList(response.data);
        setTotalItemCount(response.data.totalItemCount);
      }
    } catch (error) {
      console.log("댓글 목록 조회 실패: ", error);
    }
  };

  useEffect(() => {
    handleBoardDetailGet();
  }, [postId]);

  useEffect(() => {
    handleCommentGet();
  }, []);

  // 댓글 삭제
  const handleCommentDel = async () => {
    try {
      const response = await commentDel(commentId, commentPassword);
      console.log("비밀번호: ", commentPassword);
      if (response) {
        console.log("댓글 삭제: ", response);
        handleCommentGet();
        closeCommentDel();
      }
    } catch (error) {
      console.log("댓글 삭제 실패: ", error);
    }
  };

  if (!memoryDetail) {
    return <div>Loading...</div>; // 로딩 상태 또는 빈 div를 보여줌
  }

  return (
    <TotalContainer>
      <OutContainer>
        <BodyContainer>
          <ContentContainer>
            <TopContainer>
              <DayContainer>
                <Day>{memoryDetail.nickname}</Day>
                <img src={seperate} />
                <PublicY>{memoryDetail.isPublic ? "공개" : "비공개"}</PublicY>
              </DayContainer>
              <ModDelContainer>
                <ButtonMod onClick={openModModal}>추억 수정하기</ButtonMod>
                <ButtonDel onClick={openDelModal}>추억 삭제하기</ButtonDel>
              </ModDelContainer>
            </TopContainer>
            <TitleContainer>
              <Title>{memoryDetail.title}</Title>
            </TitleContainer>
            <TagContainer>{memoryDetail.tags}</TagContainer>
          </ContentContainer>
          <BottomContainer>
            <FirstContainer>
              <Location>{memoryDetail.location}</Location>
              <Date>{memoryDetail.moment.slice(0, 10)}</Date>
            </FirstContainer>
            <SecondContainer>
              <InfoContainer>
                <img src={smallIcon} />
                <Info>{memoryDetail.likeCount}</Info>
              </InfoContainer>
              <InfoContainer>
                <img src={commentIcon} />
                <Info>{memoryDetail.commentCount}</Info>
              </InfoContainer>
            </SecondContainer>
          </BottomContainer>
          <SendButton onClick={handleBoardLike}>
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
        <PhotoContainer src={memoryDetail.imageUrl} />
        <Main>{memoryDetail.content}</Main>
      </MainContainer>
      <ButtonCustom title={"댓글 등록하기"} onClick={openCommentModal} />
      <Comment
        data={commentList}
        totalItemCount={totalItemCount}
        onClick={openCommentMod}
        onDel={openCommentDel}
      />
      <PageComponent />
      {isOpen && (
        <MemoryModModal
          data={memoryDetail}
          onClose={closeModModal}
          onSave={(updatedData) => setMemoryDetail(updatedData)}
        />
      )}
      {delOpen && (
        <Modal
          title={"추억 삭제"}
          label={"삭제 권한 인증"}
          hint={"추억 비밀번호를 입력해 주세요"}
          btn={"삭제하기"}
          value={postPassword}
          onChange={(e) => setPostPassword(e.target.value)}
          onSubmit={handleBoardDel}
          onClose={closeDelModal}
        />
      )}
      {commentModal && <CommentModal onClose={closeCommentModal} />}
      {commentMod && (
        <CommentModModal
          onClose={closeCommentMod}
          data={commentData}
          onSave={() => {
            handleCommentGet();
          }}
        />
      )}
      {commentDelModal && (
        <Modal
          title={"댓글 삭제"}
          label={"삭제 권한 인증"}
          hint={"댓글 비밀번호를 입력해 주세요"}
          btn={"삭제하기"}
          value={commentPassword}
          onChange={(e) => setCommentPassword(e.target.value)}
          onSubmit={handleCommentDel}
          onClose={closeCommentDel}
        />
      )}
    </TotalContainer>
  );
};

export default MemoryDetail;

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

export const Comment = ({ data, totalItemCount, onClick, onDel }) => {
  const comments = Array.isArray(data?.data) ? data.data : [];
  return (
    <CommentOutContainer>
      <GapBar>
        <CommentContainer>
          <CommentTitleContainer>
            <CommentTitle>댓글</CommentTitle>
            <CommentTitle>{totalItemCount}</CommentTitle>
          </CommentTitleContainer>
        </CommentContainer>
        <Bar />
      </GapBar>
      {comments.map((comment, index) => (
        <CommentList key={index}>
          <CommentTop>
            <NickName>{comment.nickname}</NickName>
            <Time>{comment.createdAt}</Time>
          </CommentTop>
          <Bottom>
            <CommentContent>{comment.content}</CommentContent>
            <ButtonContainer>
              <Button src={pen} onClick={() => onClick(comment)} />
              <Button src={trashBin} onClick={() => onDel(comment.id)} />
            </ButtonContainer>
          </Bottom>
          <BarCustom />
        </CommentList>
      ))}
    </CommentOutContainer>
  );
};

Comment.propTypes = {
  data: PropTypes.shape({
    data: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        nickname: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        createdAt: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
  totalItemCount: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  onDel: PropTypes.func.isRequired,
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
