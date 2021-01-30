import React from "react";
import { Card, CardBody, CardImg, CardText, CardTitle } from "reactstrap";

function RenderDish({ dish }) {
  if (dish) {
    return (
      <div className="col-12 col-md-5 m-1">
        <Card>
          <CardImg top src={dish.image} alt={dish.name} />
          <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
          </CardBody>
        </Card>
      </div>
    );
  } else {
    return <div></div>;
  }
}
function RenderComments({ dish }) {
  if (dish) {
    const comment = dish.comments.map((com) => {
      const date = new Date(com.date);
      const dateTimeFormat = new Intl.DateTimeFormat("en", {
        year: "numeric",
        month: "short",
        day: "2-digit",
      });
      return (
        <ul key={com.id} className="list-unstyled">
          <li>{com.comment}</li>
          <br />
          <li>
            -- {com.author} , {dateTimeFormat.format(date)}
          </li>
        </ul>
      );
    });
    return (
      <div className="col-12 col-md-5 m-1">
        <h4>Comments</h4>
        {comment}
      </div>
    );
  } else {
    return <div></div>;
  }
}

const DishDetail = (props) => {
  return (
    <div className="row">
      <RenderDish dish={props.dish} />
      <RenderComments dish={props.dish} />
    </div>
  );
};

export default DishDetail;
