import React from 'react';
import CocktailThumbnail from "../CocktailThumbnail/CocktailThumbnail";
import {Card, CardBody} from "reactstrap";

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
                <p>{props.published}</p>
                {props.children}
            </CardBody>
        </Card>
    );
};

export default CocktailList;