import React from 'react'
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from './SideDrawer.css'
import Backdrop from "../../UI/Backdrop/Backdrop";
import Auxilary from "../../../hoc/Auxilary/Auxilary";

const SideDrawer = (props) => {

    let attachedClasses = [classes.SideDrawer ,classes.Close]
    if(props.sideDrawerState){
        attachedClasses = [classes.SideDrawer, classes.Open]
    }


    return (
        <Auxilary>
            <Backdrop show={props.sideDrawerState} clicked={props.closed}/>
            <div className={attachedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems/>
                </nav>

            </div>
        </Auxilary>
    )
}

export default SideDrawer
