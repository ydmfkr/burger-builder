import React, {Component}from 'react'
import Auxilary from "../Auxilary/Auxilary";
import Modal from "../../components/UI/Modal/Modal";
const withErrorHandler = (WrappedCompenents, axios) => {
    return class  extends Component {

        state = {
            error: null
        }

        componentWillMount() {
            this.requestInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null})
                return req
            })
            this.responseInterceptor = axios.interceptors.response.use(res => res, error => {
                    this.setState({error: error})
                }
            )


        }

        errorConfirmedHandler = () => {
            this.setState({error: null})
        }

        componentWillUnmount() {
            console.log("UNMOUNT", this.requestInterceptor, this.responseInterceptor)
            axios.interceptors.request.eject(this.requestInterceptor);
            axios.interceptors.response.eject(this.responseInterceptor);
        }

        render() {
            return (

                <Auxilary>
                    <Modal
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}
                    >
                        Something Didnt Work.. {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedCompenents {...this.props}/>
                </Auxilary>
            )
        }

    }
}

export default withErrorHandler