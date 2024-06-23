import "../../css/intro.css";

const Intro = ({
  heading,
  paragraph,
  linkUrl,
  linkText,
  imageUrl,
  imageAlt,
}) => {
  return (
    <div className="intro-section">
      <div className="intro-text">
        <h2>{heading}</h2>
        <p className="intro-paragraph">{paragraph}</p>
        {linkUrl && (
          <div className="read-more">
            <a href={linkUrl}>{linkText}</a>
          </div>
        )}
      </div>
      <div className="intro-image">
        <img src={imageUrl} alt={imageAlt} />
      </div>
    </div>
  );
};

export default Intro;
