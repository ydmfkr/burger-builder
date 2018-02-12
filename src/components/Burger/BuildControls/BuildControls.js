import React from 'react'
import classes from './BuildControls.css'
import BuildControl from "./BuildControl/BuildControl";

const controls = [

    {
        label: 'Salad',
        type: 'salad'
    },

    {
        label: 'Bacon',
        type: 'bacon'
    },
    {
        label: 'Cheese',
        type: 'cheese'
    },
    {
        label: 'Meat',
        type: 'meat'
    }

]

const BuildControls = (props) => {
    return (
        <div className={classes.BuildControls}>
            <p>
                Current Burger Price: <strong>{props.burgerPrice.toFixed(2)} $</strong>
            </p>
            {
                controls.map((control) => <BuildControl
                    key={control.label}
                    label={control.label}
                    added={() => props.addIng(control.type)}
                    removed={() => props.removeIng(control.type)}
                    disabled={props.disabledButton[control.type]}
                />)
            }

            <button
                className={classes.OrderButton}
                disabled={!props.purchasable}
                onClick={props.ordered}>
                Order Now!
            </button>
        </div>
    )
}

export default BuildControls