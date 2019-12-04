import React from "react";
import CalfificarComponent from './calificar.component'
import * as Permissions from 'expo-permissions';


export default class extends React.Component{
    constructor(props){
        super(props)
        
        this.state = {
            hasCameraPermission: null,
            scaned: true,
            ok:false
        }
    }

    async componentDidMount() {
        this.getPermissionsAsync();
    }

    async componentWillMount(){
        this.setState({ scanned: false});
    }
    
    getPermissionsAsync = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
        console.log(this.state.hasCameraPermission)
    };


    handleBarCodeScanned = ({ type, data }) => {
        this.setState({ scanned: true, ok:true });
    };

    render(){
        return (<CalfificarComponent
            handleBarCodeScanned={this.handleBarCodeScanned}
            scaned={this.state.scaned}
            ok={this.state.ok}/>)
    }
}