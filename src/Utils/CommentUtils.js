import axios from "axios";

// 댓글 등록
export const commentPost = async (postId, nickname, content, password) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/posts/${postId}/comments`,
      {
        nickname: nickname,
        content: content,
        password: password,
      }
    );
    if (response) {
      console.log("댓글 등록: ", response);
    }
    return response;
  } catch (error) {
    console.log("댓글 등록 실패: ", error);
  }
};

// 댓글 목록 조회
export const commentGet = async (postId, page, pageSize) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/posts/${postId}/comments`,
      {
        params: {
          postId: postId,
          page: page,
          pageSize: pageSize,
        },
      }
    );
    if (response) {
      console.log("댓글 등록: ", response);
    }
    return response;
  } catch (error) {
    console.log("댓글 목록 조회 실패: ", error);
  }
};

// 댓글 수정
export const commentPut = async (commentId, nickname, content, password) => {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_BASE_URL}/comments/${commentId}`,
      {
        nickname: nickname,
        content: content,
        password: password,
      }
    );
    if (response) {
      console.log("댓글 수정: ", response);
    }
    return response;
  } catch (error) {
    console.log("댓글 수정 실패: ", error);
  }
};

// 댓글 삭제
export const commentDel = async (commentId, password) => {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_BASE_URL}/comments/${commentId}`,
      {
        password: password,
      }
    );
    if (response) {
      console.log("댓글 삭제: ", response);
    }
    return response;
  } catch (error) {
    console.log("댓글 삭제 실패: ", error);
  }
};
