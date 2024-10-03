import axios from "axios";
const hiddenGemsApi = axios.create({
  baseURL: "https://hidden-gems-cd0h.onrender.com/api",
});

export const fetchGems = () => {
  return hiddenGemsApi
    .get(`/gems`)
    .then(({ data: { gems } }) => {
      return gems;
    })
    .catch((err) => {
      console.log(err);
    });
};
