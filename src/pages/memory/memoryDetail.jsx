import styled from "styled-components";
import { DayContainer, Day, PublicY } from "../../components/publicList";
import seperate from "../../assets/seperate.svg";
import smallIcon from "../../assets/smallIcon.svg";
import commentIcon from "../../assets/CommentIcon.svg";
import ButtonCustom from "../../components/button";
import arrowRight from "../../assets/arrowRight.svg";
import pen from "../../assets/Pen.svg";
import trashBin from "../../assets/trashBin.svg";
import { useNavigate, useParams } from "react-router-dom";
import { boardDel, boardDetailGet, boardIsPublic, boardLike } from "../../Utils/BoardUtils";
import { useEffect, useState } from "react";
import MemoryModModal from "./memoryModModal";
import Modal from "../../components/modal";
import CommentModal from "../../components/commentModal";
import { commentDel, commentGet } from "../../Utils/CommentUtils";
import PropTypes from "prop-types";
import CommentModModal from "../../components/commentModModal";
import { groupIsPublic } from "../../Utils/GroupUtils";

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

  // 게시글 공개 여부 상태 관리
  const [isPublic, setIsPublic] = useState(true); // 공개

  // 댓글 목록 불러오기 상태 관리
  const [page, setPage] = useState(1);
  const [commentList, setCommentList] = useState([]);
  const [totalItemCount, setTotalItemCount] = useState("");
  const [commentId, setCommentId] = useState("");
  const [postPassword, setPostPassword] = useState("");

  // 공감 개수 상태 관리
  const [likeC, setLikeC] = useState(0);
  // 댓글 개수 상태 관리
  const [commentC, setCommentC] = useState(totalItemCount);

  // 삭제 -> 목록 페이지로 이동
  const navigate = useNavigate();

  useEffect(() => {
    if (memoryDetail) {
      setLikeC(memoryDetail.likeCount || 0); // null 또는 undefined일 경우 대비
      setCommentC(memoryDetail.commentCount || 0); // null 또는 undefined일 경우 대비
    }
  }, [memoryDetail]);

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

  // 게시글 공개 여부 확인
  // const handleIsPublic = async () => {
  //    try {
  //     const response = await boardIsPublic(postId);
  //     if (response) {
  //       console.log("게시글 공개 여부 확인 : ", response);
  //       setIsPublic(response.data.isPublic);
  //     }
  //     return response;
  //   } catch (error) {
  //     console.log("게시글 공개 여부 확인 실패: ", error);
  //   }
  // }

  // 해당 게시글의 그룹 공개 여부 확인
    const handleIsPublicGroup = async (groupId) => {
     try {
      const response = await groupIsPublic(groupId);
      if (response) {
        console.log("그룹 공개 여부 확인 : ", response);
        setIsPublic(response.data.isPublic);
      }
      return response;
    } catch (error) {
      console.log("그룹 공개 여부 확인 실패: ", error);
    }
  }

  // 게시글 상세 정보 조회
  const handleBoardDetailGet = async () => {
    try {
      const response = await boardDetailGet(postId);
      if (response) {
        console.log("게시글 상세 정보: ", response);
        setMemoryDetail(response.data);
        handleIsPublicGroup(response.data.groupId);
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
        if (isPublic) {
        navigate(`/group/public/${memoryDetail.groupId}`);
      } else {
        navigate(`/group/private/${memoryDetail.groupId}`);
      }
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
        setLikeC((prevCount) => prevCount + 1);
      }
    } catch (error) {
      console.log("게시글 공감 실패: ", error);
    }
  };

  // 댓글 목록 조회
  const handleCommentGet = async (newPage = 1) => {
    try {
      const response = await commentGet(postId, newPage, 10);
      if (response) {
        console.log("댓글 목록 조회: ", response);
        console.log("댓글 수: ", response.data.totalItemCount);
        console.log("respone.data: ", response.data);
        console.log("respone.data.data: ", response.data.data);
        // 댓글 목록을 최신순으로 정렬
      const sortedComments = response.data.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      setCommentList(sortedComments); // 정렬된 목록을 설정
        //setCommentList(response.data.data);
        setTotalItemCount(Number(response.data.totalItemCount));
        setCommentC(Number(response.data.totalItemCount));
        setPage(newPage);
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

  // 페이지 변경 처리 함수
  const handlePageChange = (newPage) => {
    //setPage(newPage);
    handleCommentGet(newPage); // 페이지 변경 시 댓글 목록 다시 조회
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
            <TagContainer>
              {memoryDetail.tags.map((tag, index) => (
                <Tag key={index}>#{tag}</Tag>
              ))}
            </TagContainer>
          </ContentContainer>
          <BottomContainer>
            <FirstContainer>
              <Location>{memoryDetail.location}</Location>
              <DateC>{memoryDetail.moment.slice(0, 10).replace(/-/g, ".")}</DateC>
            </FirstContainer>
            <SecondContainer>
              <InfoContainer>
                <img src={smallIcon} />
                <Info>{likeC}</Info>
              </InfoContainer>
              <InfoContainer>
                <img src={commentIcon} />
                <Info>{commentC}</Info>
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
          <BarCustom />
        </BodyContainer>
      </OutContainer>
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
      {totalItemCount === 0 ? (
        <InfoOutContainer>
          <InfoComment1>댓글이 없습니다</InfoComment1>
          <InfoComment2>가장 먼저 댓글을 등록해 보세요!</InfoComment2>
        </InfoOutContainer>
      ) : (
        <PageComponent
          page={page}
          totalPages={Math.ceil(totalItemCount / 10)}
          onPageChange={handlePageChange}
        />
      )}
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
  min-height: 100%;
  align-items: center;
  gap: 10%;
  padding-bottom: 5%;
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
  bottom: 15%;
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
  gap: 8px;
`;

const Tag = styled.span`
  font-size: 18px;
`;

const BottomContainer = styled.div`
  display: flex;
  width: 30%;
  @media (min-width: 768px) and (max-width: 1199px) {
    width: 40%;
    gap: 10%;
  }
`;

const FirstContainer = styled.div`
  display: flex;
  width: 50%;
  gap: 10%;
  align-items: center;
  @media (min-width: 768px) and (max-width: 1199px) {
    width: 50%;
  }
`;

const SecondContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 20%;
  @media (min-width: 768px) and (max-width: 1199px) {
    width: 25%;
  }
`;

const Location = styled.h1`
  font-size: 16px;
  font-weight: 700;
  margin: 0;
`;

const DateC = styled(Location)``;

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
  width: 100%;
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

const InfoOutContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 15rem;
`;

const InfoComment1 = styled.p`
  width: auto;
  font-size: 18px;
  text-align: center;
  color: #8D8D8D;
  font-weight: 700;
`;

const InfoComment2 = styled(InfoComment1)`
  font-size: 14px;
  color: #B8B8B8;
  font-weight: 400;
`
const formatDate = (dateString) => {
  const date = new Date(dateString);

  const year = String(date.getFullYear()).slice(-2); // 연도 마지막 두 자리
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 월 (0부터 시작하므로 +1)
  const day = String(date.getDate()).padStart(2, '0'); // 일
  const hours = String(date.getHours()).padStart(2, '0'); // 시
  const minutes = String(date.getMinutes()).padStart(2, '0'); // 분

  return `${year}.${month}.${day} ${hours}:${minutes}`;
};

export const Comment = ({ data, totalItemCount, onClick, onDel }) => {
  const comments = Array.isArray(data) ? data : [];
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
            <Time>{formatDate(comment.createdAt)}</Time>
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
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      nickname: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
    })
  ).isRequired,
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

const PageComponent = ({ page, totalPages, onPageChange }) => {
  return (
    <PageContainer>
      <Page
        disabled={page === 1}
        onClick={() => page > 1 && onPageChange(page - 1)}
      >
        <LeftB src={arrowRight} disabled={page === 1} />
      </Page>
      <PageBody>
        {Array.from({ length: totalPages }, (_, index) => {
          const pageNumber = index + 1;
          const isActive = page === pageNumber; // 불리언 값을 저장
          
          // isActive 값 출력
          console.log(`Page ${pageNumber} isActive:`, isActive);

          return (
            <Page
              key={pageNumber}
              onClick={() => onPageChange(pageNumber)}
              $isActive={isActive} // 여기서 불리언 값을 전달
            >
              {pageNumber}
            </Page>
          );
        })}
      </PageBody>
      <Page
        disabled={page === totalPages}
        onClick={() => page < totalPages && onPageChange(page + 1)}
      >
        <RightB src={arrowRight} disabled={page === totalPages} />
      </Page>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  display: flex;
  width: 23%;
  align-items: center;
  justify-content: center;
  padding-top: 3rem; 

  @media (min-width: 768px) and (max-width: 1199px) {
    width: 50%;
  }
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
  background-color: ${({ $isActive }) => ($isActive ? 'black' : 'transparent')}; // 활성화된 페이지는 검정색 배경
  color: ${({ $isActive }) => ($isActive ? 'white' : '#282828')}; // 활성화된 페이지는 흰색 글자
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
