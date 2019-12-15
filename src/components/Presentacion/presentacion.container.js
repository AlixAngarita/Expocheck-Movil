import React from "react";
import PresentacionComponent from './presentacion.component'
import FirebaseService from '../../services/firebaseService'
import { withNavigation } from 'react-navigation';
import { AsyncStorage } from "react-native";


class Presentacion extends React.Component {

    constructor(props){
        super(props)
        
        this.state = {
            presentacion:'',
            loading:true,
            presentacionSeleccionada:false
        }
        this.hasCode = this.hasCode.bind(this)
    }

    componentDidMount(){
        this.getPresentacionActual()
    }

    getPresentacionActual(){
        const presentacion = this.props.navigation.getParam('presentacion')
        if(presentacion){
            this.setState({presentacion, loading:false, presentacionSeleccionada:true})
        }else{
            FirebaseService.getDocById('jornadas', this.props.id)
            .then(jornada => {
            })
        }
    }

    hasCode(){
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem('qrs')
            .then(qrs => {
                qrs = JSON.parse(qrs)
                if(qrs.length > 0){
                    const code = this.state.presentacion.qr
                    if (qrs.includes(code) == true){
                        resolve(code)
                    }else{
                        resolve('')
                    }
                }else{
                    resolve('')
                }
            })
            .catch(err =>{
                resolve('')
            })
        })
    }

    render(){
        return(
            <PresentacionComponent
            presentacion={this.state.presentacion}
            hasCode={this.hasCode}
            presentacionSeleccionada={this.state.presentacionSeleccionada}
            />)
    }
}

export default withNavigation(Presentacion)