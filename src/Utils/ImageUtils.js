import axios from 'axios';

// 이미지 URL 변경
export const imagePost = async (file) => {
  try {
    // FormData 객체 생성
    const formData = new FormData();
    formData.append('image', file);

    // Axios POST 요청
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/image`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      }
    );

    console.log("이미지 변환 성공: ", response);
    return response;
  } catch (error) {
    console.log("이미지 변환 실패: ", error);
    throw error;  // 에러를 호출한 쪽에서 처리할 수 있도록 에러를 다시 던짐
  }
};