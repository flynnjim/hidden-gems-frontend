import axios from "axios";

const hiddenGemsApi = axios.create({
  baseURL: "https://hidden-gems-cd0h.onrender.com/api",
});

export const getCommentsByGemId = (gem_id) => {
  return hiddenGemsApi.get(`/comments/${gem_id}`).then(({ data }) => {
    return data;
  });
};

export const addCommentsByGemId = (body) => {
  return hiddenGemsApi.post(`/comments`, body).then(({ data }) => {
    return data;
  });
};
