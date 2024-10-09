import { useEffect, useState } from "react";
import { Rating } from "@mui/material";
import DiamondTwoToneIcon from "@mui/icons-material/DiamondTwoTone";
import DiamondOutlinedIcon from "@mui/icons-material/DiamondOutlined";
import {
  getCustomIcon,
  getCultureIcon,
  getFoodIcon,
  getNatureIcon,
} from "@/utils/icons";

function GemCard(gem) {
  const {
    gem: {
      title,
      description,
      category,
      img_url,
      address,
      date,
      rating,
      gem_id,
    },
  } = gem;

  // State to store icons after dynamic import
  const [icon, setIcon] = useState(null);

  useEffect(() => {
    // Dynamically import Leaflet and set the appropriate icon based on category
    import("leaflet").then((L) => {
      switch (category) {
        case "culture":
          setIcon(getCultureIcon(L));
          break;
        case "food":
          setIcon(getFoodIcon(L));
          break;
        case "nature":
          setIcon(getNatureIcon(L));
          break;
        default:
          setIcon(getCustomIcon(L));
      }
    });
  }, [category]);

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

  return (
    <div className="whitespace-wrap m-4 bg-red-100 p-5 ">
      <h1 className="flex items-center px-4">
        {icon && (
          <img src={icon.options.iconUrl} alt={category} className="w-[30px]" />
        )}{" "}
        {title}
      </h1>
      {date && (
        <h2>
          Date: {gemDate} Time: {gemTime}
        </h2>
      )}
      <article>
        <img src={img_url} width="500" alt={title} />
        <br />
        <p>{description}</p>
        <p>Where: {address}</p>
        <div className="flex space-x-4 p-4">
          <Rating
            value={Number(rating)}
            precision={1}
            readOnly
            icon={<DiamondTwoToneIcon />}
            emptyIcon={<DiamondOutlinedIcon />}
            sx={{ color: "purple" }}
          />{" "}
          <p>{rating}</p>
        </div>
      </article>
      <a href={`/gems/${gem_id}`}>See more info!</a>
    </div>
  );
}

export default GemCard;
