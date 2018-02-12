import React, {Component} from 'react'
import Order from "../../components/Order/Order";
import AxiosOrdersInstance from '../../axois-orders'
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

class Orders extends Component {

	state = {
		orders: [],
		loading: true
	}

	componentDidMount() {
		AxiosOrdersInstance.get('/orders.json')
			.then(res => {
				console.log(res.data)
				const fetchedOrders = [];
				for (let key in res.data) {
					fetchedOrders.push(
						{
							...res.data[key],
							id: key
						}
					)
				}
				this.setState({loading: false, orders: fetchedOrders})
				console.log(this.state.orders[0])
			})
			.catch(err => {
				this.setState({loading: false})
			})
	}

	render() {

		return (
			<div>
				{this.state.orders.map(order => (
						<Order
							key={order.id}
							ingredients={order.ingredients}
						    price={order.price}
						/>
				))}

			</div>
		)

	}

}

export default withErrorHandler(Orders, AxiosOrdersInstance)