import React, {Component, Fragment} from 'react';
import CocktailList from "../CocktailList/CocktailList";
import {NotificationManager} from "react-notifications";
import Button from "reactstrap/es/Button";

class Rating extends Component {

    render() {
        let button = () => {
            //
        };
        if (this.props.user && this.props.user.role === 'admin') {
            button = (id) => {
                return <Fragment>
                    <Button className="mx-3" onClick={() => this.togglePublished(id)}>Toggle publish</Button>
                    <Button onClick={() => this.deleteCocktail(id)}>Delete</Button>
                </Fragment>
            }
        } else {
            button = () => {
                //
            };
        }

        const {cocktail, user} = this.props;
        const ratingsNum = cocktail.ratings.length;
        let currentRatingObj;
        const sum = cocktail.ratings.reduce((acc, currentVal) => acc += currentVal.rating || 0, 0);
        console.log(sum, ratingsNum);
        let ratingToShow = (sum === 0 && ratingsNum === 0) ? 0 : sum / ratingsNum;
        let average = (sum === 0 && ratingsNum === 0) ? 0 : sum / ratingsNum;
        let changeRating = () => {
            NotificationManager.error('Please, log in to vote!')
        };

        if (user) {
            currentRatingObj = cocktail.ratings.find(rating => rating.userId === user._id);
            changeRating = this.props.changeRating;
            ratingToShow = currentRatingObj ?  currentRatingObj.rating :  0;
        }

        return (
            <CocktailList
                user={user}
                rating={ratingToShow}
                ratingToShow={ratingToShow}
                average={average}
                name={cocktail._id}
                changeRating={changeRating}
                title={cocktail.title}
                image={cocktail.image}
                recipe={cocktail.recipe}
                cocktail={cocktail}
                ingredients={cocktail.ingredients}
                published={cocktail.published ? null : 'Status: unpublished'}>
                {button(cocktail._id)}
            </CocktailList>
        );
    }
}

export default Rating;