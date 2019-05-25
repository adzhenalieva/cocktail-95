import React from 'react';
import CocktailThumbnail from "../CocktailThumbnail/CocktailThumbnail";
import {Card, CardBody} from "reactstrap";
import StarRatings from "react-star-ratings";

const CocktailList = props => {
    return (
        <Card className="mb-5" >
            <CardBody>
                <p><strong >
                    {props.title}
                </strong></p>
                <CocktailThumbnail image={props.image}/>
                <p><strong>Recipe</strong> <br/>
                {props.recipe}</p>
                <p><strong>Ingredients</strong></p>
                {props.ingredients.map(ingr => (
                    <p
                        key={ingr._id}>

                        <span>{ingr.name},</span>
                        <span> amount: {ingr.amount}</span>
                    </p>
                ))}
                <p style={{color: "red"}}>{props.published}</p>
                {props.children}
            </CardBody>
            <div style={{display: "flex", flexDirection: "column"}}>
                <div>
                    <StarRatings
                        starDimension={'20px'}
                        rating={props.rating}
                        ratingToShow={props.ratingToShow}
                        starRatedColor="orange"
                        changeRating={props.changeRating}
                        numberOfStars={5}
                        name={props.name}
                    />
                    <div>
                        <p><strong>Number of votes: </strong>{props.cocktail.ratings.length}</p>
                        <p><strong>Average of votes: </strong>{props.average}</p>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default CocktailList;