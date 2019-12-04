import React, {Component} from "react";
import HomeComponent from './home.component'


class Home extends Component {

    constructor(props){
        super(props)
    }

    static navigationOptions  ={
        headerShown:false
    }
    
    render(){
        return <HomeComponent/>
    }

}

export default Home