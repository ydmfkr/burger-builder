/**
 * Created by mohd on 14/01/2018.
 */
import axois from 'axios'

const AxiosOrdersInstance = axois.create({
    baseURL: 'https://react-my-burger-f9a2d.firebaseio.com/'
})

export default AxiosOrdersInstance