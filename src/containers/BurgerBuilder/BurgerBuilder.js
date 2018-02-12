/**
 * Created by mohd on 10/01/2018.
 */
import React, {Component} from 'react'
import Auxilary from "../../hoc/Auxilary/Auxilary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import AxiosOrdersInstance from '../../axois-orders'
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

export const INGREDIENT_PRICES = {
	'salad': 0.5,
	'bacon': 0.7,
	'cheese': 0.3,
	'meat': 2.0,
	'burgerBase': 10
}

class BurgerBuilder extends Component {

	state = {
		ingredients: null,
		purchasable: false,
		purchasing: false,
		totalPrice: 10,
		loading: false,
		error: false
	}

	addIngredientHandler = (type) => {
		const oldIngCount = this.state.ingredients[type]
		const updatedIngCount = oldIngCount + 1;
		const updatedIngredients = {
			...this.state.ingredients
		}
		updatedIngredients[type] = updatedIngCount;
		const priceAddition = INGREDIENT_PRICES[type]
		const oldPrice = this.state.totalPrice
		const newPrice = oldPrice + priceAddition
		this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
		this.updatePurchaseState(updatedIngredients)

	}

	removeIngredientHandler = (type) => {

		const oldIngCount = this.state.ingredients[type]
		if (oldIngCount <= 0) {
			return
		}
		const updatedIngCount = oldIngCount - 1;
		const updatedIngredients = {
			...this.state.ingredients
		}
		updatedIngredients[type] = updatedIngCount;
		const priceDeduction = INGREDIENT_PRICES[type]
		const oldPrice = this.state.totalPrice
		const newPrice = oldPrice - priceDeduction
		this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
		this.updatePurchaseState(updatedIngredients)

	}

	updatePurchaseState(ing) {
		const ingredients = ing;
		const sum = Object.keys(ingredients)
			.map(igKey => {
				return ingredients[igKey]
			})
			.reduce((prev, current) => {
				return (prev + current)
			}, 0)
		console.log(this)
		this.setState({purchasable: sum > 0})
	}

	purchaseHandler = () => {
		console.log("Here")
		console.log(this)
		this.setState({purchasing: true})
	}

	purchaseCanceledHandler = () => {
		this.setState({purchasing: false})
	}

	purchaseContinueHandler = () => {
		//alert('Continue!');

		const queryParams = [];
		for (let i in this.state.ingredients) {
			queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i])
			)
		}
		queryParams.push('price='+ this.state.totalPrice)
		const queryString = queryParams.join('&')
		this.props.history.push({
			pathname: '/checkout',
			search: '?' + queryString
		})
	}

	componentDidMount() {

		console.log(this.props)
		AxiosOrdersInstance.get("https://react-my-burger-f9a2d.firebaseio.com/ingredients.json")
			.then(response => {
				this.setState({ingredients: response.data})
			})
			.catch(error => {
				console.log(error);
				this.setState({error: true})
			})
	}

	render() {
		const disabledInfo = {
			...this.state.ingredients
		}
		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0
		}
		let orderSumamry = null

		let burger = this.state.error ? <p>Error</p> : <Spinner/>

		if (this.state.ingredients) {
			burger =
				<Auxilary>
					<Burger ingredients={this.state.ingredients}/>
					<BuildControls
						addIng={this.addIngredientHandler}
						removeIng={this.removeIngredientHandler}
						disabledButton={disabledInfo}
						burgerPrice={this.state.totalPrice}
						purchasable={this.state.purchasable}
						ordered={this.purchaseHandler}/>

				</Auxilary>

			orderSumamry = <OrderSummary
				ingredients={this.state.ingredients}
				canceld={this.purchaseCanceledHandler}
				continued={this.purchaseContinueHandler}
				totalPrice={this.state.totalPrice}
			/>

		}

		if (this.state.loading) {
			orderSumamry = <Spinner/>
		}
		return (
			<Auxilary>
				{burger}
				<Modal
					show={this.state.purchasing}
					modalClosed={this.purchaseCanceledHandler}
				>
					{orderSumamry}
				</Modal>
			</Auxilary>
		)
	}

}

export default withErrorHandler(BurgerBuilder, AxiosOrdersInstance)
