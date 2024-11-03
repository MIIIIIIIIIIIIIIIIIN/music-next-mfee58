import NewsCardItem from "./new-card-item";




  const NewsCard= ({ newsItems }) => {
    return (

        <>
        {newsItems.map((item, index) => (
            <NewsCardItem
              key={index}
              date={item.date}
              title={item.title}
              description={item.description}
              image={item.image}
            />
          ))}
          </>
    )
  };
  
  export default NewsCard;
