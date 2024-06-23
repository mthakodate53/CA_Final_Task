const Video = ({ videoId }) => {
  return (
    <div className="video-container">
      <iframe
        width="100%"
        height="315"
        src={`https://www.youtube.com/embed/${videoId}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;"
        allowFullScreen
        title="YouTube Video"
      ></iframe>
    </div>
  );
};

export default Video;
