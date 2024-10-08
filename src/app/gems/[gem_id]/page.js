"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { fetchGemById } from "@/api/api";
import {
  customIcon,
  cultureIcon,
  foodIcon,
  natureIcon,
} from "../../../utils/icons";
import { Rating } from "@mui/material";
import { updateRating } from "@/api/api";
import DiamondTwoToneIcon from "@mui/icons-material/DiamondTwoTone";
import DiamondOutlinedIcon from "@mui/icons-material/DiamondOutlined";
import Comments from "@/components/Comments";

const SingleGemPage = () => {
  const { gem_id } = useParams();
  const [currentGem, setCurrentGem] = useState({});
  const [gemImg, setGemImg] = useState([]);
  const [rating, setRating] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    fetchGemById(gem_id).then(({ gem }) => {
      setCurrentGem(gem);
      setGemImg(gem.img_url);
      setRating(gem.rating);
      setIsError(false)
    }).catch((err) => {
      setIsError(true)
      
    });
  }, [gem_id, rating]);

  const { title, date, description, address, category, user_id } = currentGem;

  let icon;
  switch (category) {
    case "culture":
      icon = cultureIcon;
      break;
    case "food":
      icon = foodIcon;
      break;
    case "nature":
      icon = natureIcon;
      break;
    default:
      icon = customIcon;
  }

  const gemDate = new Date(date).toDateString();
  const gemTime = new Date(date).toLocaleTimeString();

  function handleRating(e) {
    const newRating = e.target.value;
    updateRating(gem_id, newRating).then(({ rating }) => {
      setRating(rating);
      setIsDisabled(true);
    });
  }

  if (isError) {
    return <p1>404 Gem not found</p1>
  }

  return (
    <>
      <div>
        <h1 className="flex items-center px-4">
          <img src={icon.options.iconUrl} alt={category} className="w-[30px]" />{" "}
          {title}
        </h1>
        {date ? (
          <h2>
            Date: {gemDate} Time: {gemTime}
          </h2>
        ) : (
          <></>
        )}
        <div className="overflow-x-auto whitespace-nowrap w-[80vw]">
          <ul className="flex space-x-4 p-4">
            {gemImg.map((img) => {
              return <img key={img} src={img} />;
            })}
          </ul>
        </div>
        <h1>{description}</h1>
        <h1>Where: {address}</h1>
        <div className="flex space-x-4 p-4">
          <h1>Rate:</h1>
          <Rating
            onChange={handleRating}
            value={Number(rating)}
            precision={1}
            readOnly={isDisabled}
            icon={<DiamondTwoToneIcon />}
            emptyIcon={<DiamondOutlinedIcon />}
            sx={{ color: "purple" }}
          />
          <h1>{rating}</h1>
        </div>
        <a href="/gems">← Back to all gems</a>
      </div>
      <Comments gem_id={gem_id}/>
    </>
  );
};
export default SingleGemPage;
