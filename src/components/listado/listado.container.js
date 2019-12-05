import React from "react";
import ListadoComponent from './listado.component'

class Listado extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            jornadas:[ {
                name: 'Amy Farha  ',
                calification:4
              },
              {
                name: 'Amy Farha',
                calification:5
              },
              {
                name: 'Amy Farha',
                calification:5
              },
              {
                name: 'Amy Farha',
                calification:5
              },
              {
                name: 'Amy Farha',
                calification:5
              }]
        }
    }

    render(){
        return(<ListadoComponent listado={this.state.jornadas}/>)
    }
}

export default Listado