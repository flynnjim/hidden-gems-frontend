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
    day: "numeric",
  });
  const gemTime = new Date(date).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const gemStyles = `whitespace-wrap bg-cardcolor p-5 w-[300px] text-wrap h-[375px] rounded`;
  const linkStyling = "text-textcolor hover:text-hovercolor text-sm underline";

  return (
<<<<<<< HEAD
    <div className={gemStyles}>
      <div className="mx-auto">
        <h1 className="flex gap-3 items-center line-clamp-1 text-sm text-textcolor">
          <img src={icon.options.iconUrl} alt={category} className="w-[30px]" />
          {title}
        </h1>
        <Rating
          value={Number(rating)}
          precision={0.5}
          readOnly
          size="small"
          icon={<DiamondTwoToneIcon fontSize="small" />}
          emptyIcon={<DiamondOutlinedIcon fontSize="small" />}
          sx={{ color: "#f7e18b", size: "small" }}
        />
      </div>
      <article className="h-[250px]">
        <img src={img_url} className="w-[300px] h-[175px] object-cover mb-2" />
        <p className="line-clamp-2 mb-1 text-textcolor text-sm">
          {description}
        </p>
        {date ? (
          <h2 className="text-xs italic text-textcolor">{gemDate}</h2>
        ) : (
          <></>
        )}
=======
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
>>>>>>> origin/main
      </article>
      <a href={`/gems/${gem_id}`} className={linkStyling}>
        See more info!
      </a>
    </div>
  );
}

export default GemCard;
