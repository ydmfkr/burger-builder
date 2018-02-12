import React from 'react'
import Auxilary from "../../../hoc/Auxilary/Auxilary";
import {INGREDIENT_PRICES}  from "../../../containers/BurgerBuilder/BurgerBuilder";
import Button from "../../UI/Button/Button";


const OrderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(inKey => {
            return (
                <li key={inKey}>
                    <span style={{textTransform: 'capitalize'}}>{inKey} </span> : {props.ingredients[inKey]}
                    : {(INGREDIENT_PRICES[inKey] * props.ingredients[inKey]).toFixed(2) + ' $'}
                </li>
            )
        })
    console.log(ingredientSummary);

    return (
        <Auxilary>
            <h3>Your Order </h3>
            <p>A Delicious Burger With The Following Ingredients: </p>
            <ul>
                <li> Burger Base Price: 1 : {INGREDIENT_PRICES['burgerBase'].toFixed(2)} $</li>
                {ingredientSummary}
            </ul>

            <p><strong>Total Cost of This Delicious Burger: {props.totalPrice.toFixed(2)} $</strong></p>
            <p>Continue to Checkout?</p>
            <Button
                buttonType="Danger"
                clicked={props.canceld}

            >
                Cancel
            </Button>
            <Button
                buttonType="Success"
                clicked={props.continued}

            >
                Continue
            </Button>

        </Auxilary>
    )
}

export default OrderSummary