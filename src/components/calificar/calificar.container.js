import React from "react";
import CalfificarComponent from './calificar.component'
import * as Permissions from 'expo-permissions';
import { withNavigation } from 'react-navigation';
import { AsyncStorage } from "react-native";

class Calificacion extends React.Component{
    constructor(props){
        super(props)
        
        this.state = {
            hasCameraPermission: null,
            scaned: true,
            ok:false,
            code:'',
            valid:true,
            qrs:[],
            hasQrCode:false,
            presentacion:''
        }

        this.scanear = this.scanear.bind(this)
        this.getCodesQr = this.getCodesQr.bind(this)
        this.hasCodeQr = this.hasCodeQr.bind(this)
    }

    

     componentDidMount() {
        this.hasCodeQr()
        this.getPermissionsAsync();
       
    }

    async componentWillMount(){
        this.setState({ scanned: false});
    }
    
    getPermissionsAsync = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    };


    handleBarCodeScanned = ({ type, data }) => {
        this.setState({ scanned: false, ok:true, code:data });
        this.validCode(data)
    };

    async  getCodesQr(){
        try {
         AsyncStorage.getItem('qrs')
         .then(qrs => {
             if(qrs == null){
                this.setState({qrs:[]})
             }else{
                this.setState({qrs:JSON.parse(qrs)})
             }
            
         })
            
        } catch (error) {
            console.log(error)
      }
    }

    async validCode(code){
        try {
            const presentacion = this.props.navigation.getParam('presentacion')
            this.setState({presentacion})
            if(presentacion.qr!=code ){
                this.setState({valid:false})
            }else{
                await AsyncStorage.removeItem('qrs')
                const currentCodes = this.state.qrs
                console.log(currentCodes)
                currentCodes.push(code)
                await AsyncStorage.setItem('qrs', JSON.stringify(currentCodes))
            }
            

        } catch (error) {
             console.log('Error al setear qrs ', error)
        }
    }

    hasCodeQr(){
        const hascode = this.props.navigation.getParam('hascode')
        hascode.then(code => {
            if(code!=''){
                this.setState({hasQrCode:true, ok:true, valid:true, scaned:false, code})
            }else{
                this.getCodesQr()
            }
            
        })
    }

    scanear(){
        this.setState({ok:false, scaned:true})
    }

    

    render(){
        return (<CalfificarComponent
            handleBarCodeScanned={this.handleBarCodeScanned}
            scaned={this.state.scaned}
            ok={this.state.ok}
            code={this.state.code}
            valid={this.state.valid}
            scanear={this.scanear}
            hasQrCode={this.hasQrCode}
            />)
    }
}

export default  withNavigation(Calificacion)