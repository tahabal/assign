import React from "react";
import ReactStars from "react-stars";

const ListItem = function(props) {
  return (
    <div className="list-item">
      <img
        className="list-item__img"
        alt="thumbnail"
        src="https://via.placeholder.com/50x50"
      />
      <div className="list-item__title">{props.title}</div>
      <div className="list-item__stars">
        <ReactStars
          count={5}
          value={props.rating}
          size={24}
          half={false}
          color2={"#ffd700"}
          onChange={newRating => props.ratingChange(props.id, newRating)}
        />
      </div>

      <div
        className="list-item__close"
        onClick={() => props.handleRemove(props.id)}
      >
        ×
      </div>
    </div>
  );
};

export default ListItem;
