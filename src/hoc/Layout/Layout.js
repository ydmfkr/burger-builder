import React, {Component} from 'react'
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import Auxilary from "../Auxilary/Auxilary";
import classes from './Layout.css'

class Layout extends Component {
    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return {sideDrawerState: !prevState.sideDrawerState}
        })
    }

    constructor(props) {
        super(props)
    }

    state = {
        sideDrawerState: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({sideDrawerState: false})
    }

    render() {
        return (
            <Auxilary>
                <div>
                    <Toolbar clicked={this.sideDrawerToggleHandler}/>
                    <SideDrawer sideDrawerState={this.state.sideDrawerState} closed={this.sideDrawerClosedHandler}/>
                    Toolbar,Side Drawer, Backdrop
                </div>

                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Auxilary>
        )
    }

}

export default Layout