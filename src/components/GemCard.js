import { customIcon, cultureIcon, foodIcon, natureIcon } from "@/utils/icons";

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

  const gemDate = new Date(date).toDateString();
  const gemTime = new Date(date).toLocaleTimeString();

  return (
    <div className="whitespace-wrap">
      <h1 className="flex items-center px-4">
        <img src={icon.options.iconUrl} alt={category} className="w-[30px]" />{" "}
        {title}
      </h1>

      <h2>
        Date: {gemDate} Time: {gemTime}
      </h2>
      <article>
        <img src={img_url} width="500" />
        <br />
        <p>{description}</p>
        <p>Where: {address}</p>
        <p>Rating: {rating}</p>
      </article>
    </div>
  );
}

export default GemCard;
