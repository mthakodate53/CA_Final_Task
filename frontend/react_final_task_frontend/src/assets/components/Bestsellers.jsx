const Bestsellers = () => {
  const bestsellers = [
    { id: 1, name: "Magnolia", imageUrl: "" },
    { id: 2, name: "Birch Tree", imageUrl: "" },
    { id: 3, name: "Willow tree", imageUrl: "" },
  ];

  return (
    <div className="bestsellers-section">
      <h2>Bestsellers</h2>
      <div className="product-list">
        {bestsellers.map((product) => (
          <div key={product.id} className="product-item">
            <img src={product.imageUrl} alt={"Alt:" + product.name} />
            <p>{product.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bestsellers;
