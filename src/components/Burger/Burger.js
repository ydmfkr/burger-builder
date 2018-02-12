/**
 * Created by mohd on 10/01/2018.
 */
import React from 'react'
import classes from './Burger.css'
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";


const Burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            console.log(igKey)
            console.log(props.ingredients[igKey])
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                console.log(igKey + i)
                return <BurgerIngredient
                    key={igKey + i}
                    type={igKey}/>
            })
        })
    console.log(transformedIngredients)
    /*
     reduce goes through the array giving a single array value in @currentArrayValue below

     The reduce() method reduces the array to a single value.

     The reduce() method executes a provided function for each value of the array (from left-to-right).

     The return value of the function is stored in an accumulator (in example below an empty array).

     array.reduce(function(total, currentValue, currentIndex, arr), initialValue)
     */
    let transIngredients = transformedIngredients.reduce((previousArray, currentArrayValue) => {
        console.log(previousArray)
        console.log(currentArrayValue)
        return previousArray.concat(currentArrayValue);
    }, []);
    console.log(transIngredients)
    if(transIngredients.length === 0){
        transIngredients = <p> This Burger Does Not Have Any Ingredients, Please Start Adding Some</p>
    }
    return (


        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    )
}

export default Burger