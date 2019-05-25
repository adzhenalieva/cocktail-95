import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {fetchCocktails, sendRating, togglePublished, deleteItem} from "../../store/actions/cocktailActions";
import {CardColumns} from "reactstrap";
import Rating from "../../components/Rating/Rating";

class Cocktails extends Component {
    componentDidMount() {
        this.props.onFetchCocktails();
    }

    deleteCocktail = (id) => {
        this.props.deleteCocktail(id).then(
            () => {
                this.props.onFetchCocktails();
            }
        )
    };

    togglePublished = id => {
        this.props.togglePublished(id).then(
            () => {
                this.props.onFetchCocktails();
            }
        )
    };

    changeRating = (newRating, cocktailId) => {
        console.log(newRating, cocktailId);

        this.props.sendRating(newRating, cocktailId );
    };

    render() {
        return (
            <Fragment>
                <h1>
                    Cocktails
                </h1>
                <CardColumns>
                    {this.props.cocktails.map(cocktail => {
                        return (
                            <Rating
                                key={cocktail._id}
                                cocktail={cocktail}
                                changeRating={this.changeRating}
                                user={this.props.user}
                                togglePublished={this.togglePublished}
                                deleteCocktail={this.deleteCocktail}
                            />
                        )
                    })}
                </CardColumns>
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        cocktails: state.cocktails.cocktails,
        user: state.users.user
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchCocktails: () => dispatch(fetchCocktails()),
        deleteCocktail: id => dispatch(deleteItem(id)),
        togglePublished: id => dispatch(togglePublished(id)),
        sendRating: (newRating, cocktailId) => dispatch(sendRating(newRating, cocktailId))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Cocktails);