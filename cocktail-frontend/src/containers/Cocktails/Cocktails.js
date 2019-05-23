import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import CocktailList from "../../components/CocktailList/CocktailList";
import {deleteItem, fetchCocktails, togglePublished} from "../../store/actions/cocktailActions";
import {Button, CardColumns} from "reactstrap";

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
                            published={cocktail.published ? null : 'Status: unpublished'}>
                            {button(cocktail._id)}
                        </CocktailList>

                    ))}
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
        togglePublished: id => dispatch(togglePublished(id))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Cocktails);