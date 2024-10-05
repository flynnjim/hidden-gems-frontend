import axios from "axios";

const hiddenGemsApi = axios.create({
  baseURL: "https://hidden-gems-cd0h.onrender.com/api",
});

export const fetchGems = (sort_by, order, category) => {
  return hiddenGemsApi
    .get(`/gems`, {
      params: {
        sort_by: sort_by,
        order: order,
        category: category,
      },
    })
    .then(({ data: { gems } }) => {
      return gems;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const fetchGemById = (gem_id) => {
  return hiddenGemsApi.get(`/gems/${gem_id}`).then(({ data }) => {
    return data;
  });
};

export const updateRating = (gem_id, rating) => {
  return hiddenGemsApi
    .patch(`/gems/${gem_id}`, { new_rating: rating })
    .then(({ data }) => {
      return data;
    });
};

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

export const deleteCommentById = (comment_id) => {
  return hiddenGemsApi.delete(`/comments/${comment_id}`);
};

export const postGemByUserID = (title, description, category, img_url, latitude, longitude, address, date, user_id, type) => {
  return hiddenGemsApi.post(`/gems/${user_id}`, {
    title: title,
    description: description,
    category: category,
    img_url: img_url,
    latitude: latitude,
    longitude: longitude,
    address: address,
    date: date,
    user_id: user_id,
    type: type
  })
}