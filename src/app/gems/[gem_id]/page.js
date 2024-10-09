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
import { GemError } from "@/components/ErrorMessages";

const SingleGemPage = () => {
  const { gem_id } = useParams();
  const [currentGem, setCurrentGem] = useState({});
  const [gemImg, setGemImg] = useState([]);
  const [rating, setRating] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchGemById(gem_id)
      .then(({ gem }) => {
        setCurrentGem(gem);
        setGemImg(gem.img_url);
        setRating(gem.rating);
      })
      .catch((err) => {
        setError(err);
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

  const gemDate = new Date(date).toLocaleDateString("en-GB", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const gemTime = new Date(date).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });

  function handleRating(e) {
    const newRating = e.target.value;
    updateRating(gem_id, newRating).then(({ rating }) => {
      setRating(rating);
      setIsDisabled(true);
    });
  }

  if (error) {
    return <GemError msg={error.message}/>;
  }

  return (
    <>
      <a href="/gems" className="ml-2 mb-2 hover:text-listcolor">
        ← Back to all gems
      </a>
      <div className="text-left ml-3">
        <h1 className="flex items-center text-2xl">
          {title}
          <img src={icon.options.iconUrl} alt={category} className="w-[30px]" />
        </h1>
        {date ? (
          <h2 className="text-sm italic">
            <strong>Date:</strong> {gemDate} <strong>Time:</strong> {gemTime}
          </h2>
        ) : (
          <></>
        )}
        <div className="overflow-x-auto whitespace-nowrap">
          <ul className="flex space-x-4">
            {gemImg.map((img) => {
              return <img className="w-[85vw] mt-2 mb-2" key={img} src={img} />;
            })}
          </ul>
        </div>
        <div className="p-1">
          <h1>{description}</h1>
          <h1 className="mt-3 text-sm"><strong>Where: </strong>{address}</h1>
        </div>
        <div className="flex space-x-4 p-1 mt-2 mb-2">
          <Rating
            onChange={handleRating}
            value={Number(rating)}
            precision={1}
            readOnly={isDisabled}
            icon={<DiamondTwoToneIcon />}
            emptyIcon={<DiamondOutlinedIcon />}
            sx={{ color: "#154532" }}
          />
          <h1>{rating}</h1>
        </div>
      </div>
      <Comments gem_id={gem_id} />
    </>
  );
};
export default SingleGemPage;
