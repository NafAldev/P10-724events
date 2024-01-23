import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";


import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus ? data.focus.sort((evtA, evtB) =>
  new Date(evtA.date) > new Date(evtB.date) ? 1 : -1) 
  : [];

  const nextCard = () => {
    setIndex(prevIndex => (prevIndex < byDateDesc.length - 1 ? prevIndex + 1 : 0));
  };

  useEffect(() => {
    const intervalId = setInterval(nextCard, 5000);

    return () => clearInterval(intervalId);
  }, []);
  
  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <div key={event.title}>
          <div
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div> 
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
            {data?.focus?.map((_, radioIdx) => (
                <input
                  key={uuidv4()}
                  type="radio" readOnly
                  name="radio-button"
                  checked={index === radioIdx}      
                />
              ))}
           </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Slider;