function GemCard({ gemsData }) {
  const {
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
  } = gemsData;

  console.log(title);

  return (
    <>
      <div>
        <header className="bg-red-900">
          <div className="container">
            <h1>Title</h1>
            <h2>Date</h2>
          </div>
        </header>
        <body>
          <article className="container">
            {/* <img src="https://static-00.iconduck.com/assets.00/gem-icon-2048x1820-nw1vrj8g.png" /> */}
            <br />
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at
              nulla elementum, finibus est dapibus, commodo felis. Integer nec
              dapibus nisi. Mauris elementum nunc a turpis posuere, at
              pellentesque nisi hendrerit.
            </p>
          </article>
          <section>Address</section>
        </body>
      </div>
    </>
  );
}

export default GemCard;
