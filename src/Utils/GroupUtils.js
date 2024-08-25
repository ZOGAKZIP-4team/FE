import axios from "axios";

// 그룹 등록
export const groupPost = async (
  name,
  password,
  imageUrl,
  isPublic,
  introduction
) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/groups`,
      {
        name: name,
        password: password,
        imageUrl: imageUrl,
        isPublic: isPublic,
        introduction: introduction,
      }
    );
    console.log("그룹 등록 성공: ", response);
    return response;
  } catch (error) {
    console.log("그룹 등록 실패: ", error);
  }
};

// 그룹 목록 조회
export const groupGet = async (page, pageSize, sortBy, keyword, isPublic) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/groups`,
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
    console.log("그룹 목록 조회 성공: ", response);
    return response.data;
  } catch (error) {
    console.log("그룹 목록 조회 실패: ", error);
  }
};

// 그룹 수정
export const groupPut = async (
  name,
  password,
  imageUrl,
  isPublic,
  introduction,
  groupId
) => {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_BASE_URL}/groups/${groupId}`,
      {
        name: name,
        password: password,
        imageUrl: imageUrl,
        isPublic: isPublic,
        introduction: introduction,
      }
    );
    console.log("그룹 수정 성공: ", response.data);
    return response.data;
  } catch (error) {
    console.log("그룹 수정 실패: ", error);
  }
};

// 그룹 삭제
export const groupDel = async (groupId, password) => {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_BASE_URL}/groups/${groupId}`,
      {
        data: {
          password: password,
        },
        headers: {
          "Content-Type": "application/json", // 명시적으로 Content-Type 설정
        },
      }
    );
    console.log("그룹 삭제 성공: ", response);
  } catch (error) {
    console.log("그룹 삭제 실패: ", error);
  }
};

// 그룹 상세 정보 조회
export const groupDetailGet = async (groupId) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/groups/${groupId}`
    );
    console.log("그룹 상세 정보 조회 성공: ", response);
    return response.data;
  } catch (error) {
    console.log("그룹 상세 정보 조회 실패: ", error);
  }
};

// 그룹 조회 권한 확인
export const groupAccessGet = async (groupId, password) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/groups/${groupId}/verify-password`,
      {
        data: {
          password: password,
        },
      }
    );
    console.log("그룹 조회 권한 확인: ", response);
    return response;
  } catch (error) {
    console.log("그룹 조회 권한 실패: ", error);
  }
};

// 그룹 공감하기
export const groupLike = async (groupId) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/groups/${groupId}/like`
    );
    console.log("그룹 공감 확인: ", response);
    return response;
  } catch (error) {
    console.log("그룹 공감 실패: ", error);
  }
};

// 그룹 공개 여부 확인
export const groupIsPublic = async (groupId) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/groups/${groupId}/is-public`
    );
    console.log("그룹 공개 여부 확인: ", response);
    return response;
  } catch (error) {
    console.log("그룹 공개 여부 확인 실패: ", error);
  }
};
