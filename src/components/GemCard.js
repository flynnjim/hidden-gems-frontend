import { customIcon, cultureIcon, foodIcon, natureIcon } from "@/utils/icons";
import { Rating } from "@mui/material";
import DiamondTwoToneIcon from "@mui/icons-material/DiamondTwoTone";
import DiamondOutlinedIcon from "@mui/icons-material/DiamondOutlined";

function GemCard(gem) {
  const {
    gem: {
      title,
      description,
      category,
      img_url,
      address,
      date,
      type,
      rating,
      user_id,
      gem_id,
    },
  } = gem;
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
            day: "numeric"
          });
  const gemTime = new Date(date).toLocaleTimeString("en-GB", {
                hour: "2-digit",
                minute: "2-digit"
              });

  return (
    <div className="whitespace-wrap m-4 bg-red-100 p-5 ">
      <h1 className="flex items-center px-4  ">
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
      <article>
        <img src={img_url} width="500" />
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
