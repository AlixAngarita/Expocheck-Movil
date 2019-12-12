import React from "react";
import ListadoComponent from './listado.component'

class Listado extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            presentaciones:[ ]
        }
    }

    componentDidMount(){
      this.setState({presentaciones:this.props.presentaciones})
    }

    render(){
        return(<ListadoComponent listado={this.state.presentaciones}/>)
    }
}

export default Listado