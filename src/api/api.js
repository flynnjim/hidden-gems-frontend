import axios from "axios";
const hiddenGemsApi = axios.create({
  baseURL: "https://hidden-gems-cd0h.onrender.com/api",
});

export const fetchGems = (sort_by, order) => {
  return hiddenGemsApi
    .get(`/gems`, {
      params: {
        sort_by: sort_by,
        order: order,
      },
    })
    .then(({ data: { gems } }) => {
      return gems;
    })
    .catch((err) => {
      console.log(err);
    });
};
