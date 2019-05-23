import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import CocktailList from "../../components/CocktailList/CocktailList";
import {fetchCocktails} from "../../store/actions/cocktailActions";
import {CardColumns} from "reactstrap";

class Cocktails extends Component {
    componentDidMount() {
        this.props.onFetchCocktails();
    }



    render() {
        return (
            <Fragment>
                <h1>
                    Cocktails
                </h1>
                <CardColumns>
                    {this.props.cocktails.map(cocktail => (
                        <CocktailList
                            key={cocktail._id}
                            title={cocktail.title}
                            image={cocktail.image}
                            recipe={cocktail.recipe}
                            ingredients={cocktail.ingredients}
                            published={cocktail.published ? null : 'unpublished'}/>
                    ))}
                </CardColumns>
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        cocktails: state.cocktails.cocktails
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchCocktails: () => dispatch(fetchCocktails())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Cocktails);