import axios from "axios";

//게시글 등록
export const boardPost = async (
  groupId,
  nickname,
  title,
  content,
  postPassword,
  groupPassword,
  imageUrl,
  tags,
  location,
  moment,
  isPublic
) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/groups/${groupId}/posts`,
      {
        nickname: nickname,
        title: title,
        content: content,
        postPassword: postPassword,
        groupPassword: groupPassword,
        imageUrl: imageUrl,
        tags: tags,
        location: location,
        moment: moment,
        isPublic: isPublic,
      }
    );
    if (response) {
      console.log("게시글 등록: ", response);
    }
    return response;
  } catch (error) {
    console.log("게시글 등록 실패: ", error);
  }
};

// 게시글 목록 조회
export const boardGet = async (
  groupId,
  page,
  pageSize,
  sortBy,
  keyword,
  isPublic
) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/groups/${groupId}/posts`,
      {
        params: {
          page: page,
          pageSize: pageSize,
          sortBy: sortBy,
          keyword: keyword,
          isPublic: isPublic,
        },
      }
    );
    if (response) {
      console.log("게시글 조회: ", response);
    }
    return response.data;
  } catch (error) {
    console.log("게시글 조회 실패: ", error);
  }
};

// 게시글 수정
export const boardPut = async (
  postId,
  nickname,
  title,
  content,
  postPassword,
  imageUrl,
  tags,
  location,
  moment,
  isPublic
) => {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_BASE_URL}/posts/${postId}`,
      {
        nickname: nickname,
        title: title,
        content: content,
        postPassword: postPassword,
        imageUrl: imageUrl,
        tags: tags,
        location: location,
        moment: moment,
        isPublic: isPublic,
      }
    );
    if (response) {
      console.log("게시글 수정: ", response);
    }
    return response;
  } catch (error) {
    console.log("게시글 수정 실패: ", error);
  }
};

// 게시글 삭제
export const boardDel = async (postId, postPassword) => {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_BASE_URL}/posts/${postId}`,
      {
        data: { postPassword: postPassword },
      }
    );
    if (response) {
      console.log("게시글 삭제: ", response);
    }
    return response;
  } catch (error) {
    console.log("게시글 삭제 실패: ", error);
  }
};

// 게시글 상세 정보 조회
export const boardDetailGet = async (postId) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/posts/${postId}`
    );
    if (response) {
      console.log("게시글 상세 정보 조회: ", response);
    }
    return response;
  } catch (error) {
    console.log("게시글 상세 정보 조회 실패: ", error);
  }
};

// 게시글 조회 권한 확인
export const boardAccess = async (postId, password) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/posts/${postId}/verify-password`,
      {
        password: password,
      }
    );
    if (response) {
      console.log("게시글 조회 권한 확인: ", response);
    }
    return response;
  } catch (error) {
    console.log("게시글 조회 권한 확인 실패: ", error);
  }
};

// 게시글 공감하기
export const boardLike = async (postId) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/posts/${postId}/like`
    );
    if (response) {
      console.log("게시글 조회 권한 확인: ", response);
    }
    return response;
  } catch (error) {
    console.log("게시글 조회 권한 확인 실패: ", error);
  }
};

// 게시글 공개 여부 확인
export const boardIsPublic = async (postId) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/posts/${postId}/is-public`
    );
    if (response) {
      console.log("게시글 공개 여부 확인: ", response);
    }
    return response;
  } catch (error) {
    console.log("게시글 공개 여부 확인 실패: ", error);
  }
};
