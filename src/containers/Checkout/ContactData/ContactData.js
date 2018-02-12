import React, {Component} from 'react'
import Button from "../../../components/UI/Button/Button";
import classes from './ContactData.css'
import AxiosOrdersInstance from '../../../axois-orders'
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";

class ContactData extends Component {

	state = {
		orderForm: {

			name: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Your Name'
				},
				value: ''
			},
			street: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Your Street'
				},
				value: ''
			},
			zipCode: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Your Zip-Code'
				},
				value: ''
			},
			country: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Your Country'
				},
				value: ''
			},
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'Your E-mail'
				},
				value: ''
			},
			deliveryMethod: {
				elementType: 'select',
				elementConfig: {
					options: [
						{
							value: 'fastest',
							displayValue: 'Fastest'
						},
						{
							value: 'cheapest',
							displayValue: 'Cheapest'
						}
					]
				},
				value: ''
			}
		},
		name: '',
		email: '',
		address: {
			street: '',
			postalCode: ''
		},
		loading: false

	}

	orderHandler = (event) => {
		event.preventDefault();
		console.log(this.props.ingredients)
		this.setState({loading: true});
		const Order = {
			ingredients: this.props.ingredients,
			price: this.props.price,
			customer: {
				name: 'Fahad',
				address: {
					street: 'African Street',
					zipCode: '12131',
					country: 'Africa'
				},
				email: 'fmohajir@gmail.com'
			},
			deliveryMethod: 'fastest'
		}
		AxiosOrdersInstance.post('/orders.json/', Order)
			.then(response => {
				console.log(response)
				this.setState({
					loading: false
				})
				this.props.history.push('/')
			})
			.catch(error => {
				console.log(error)
				this.setState({
					loading: false
				})
			})
	}

	render() {
		let as = 'x'
		const formElementArray = [];
		for (let key in this.state.orderForm) {
			formElementArray.push({
				id: key,
				config: this.state.orderForm[key]
			})
		}
		let form = (
			<form>
				{formElementArray.map(formElement => (
					<Input
						key={formElement.id}
						elementType={formElement.config.elementType}
						elementConfig={formElement.config.elementConfig}
						value={formElement.config.value}
					/>
				))}
				{/*<Input inputtype='input' type='email' name='email' placeholder="Your E-mail"/>
				<Input inputtype='input' type='text' name='street' placeholder="Your Street"/>
				<Input inputtype='input' type='text' name='postal' placeholder="Your Postal Code"/>*/}
				<Button
					buttonType="Success"
					clicked={this.orderHandler}
				>Order</Button>
			</form>
		);
		if (this.state.loading) {
			form = <Spinner/>
		}
		return (
			<div className={classes.ContactData}>
				<h4>Please, Enter your Contact Details</h4>

				{form}
			</div>
		)

	}

}

export default ContactData