import React from "react";
import CalfificarComponent from './calificar.component'
import * as Permissions from 'expo-permissions';
import { withNavigation } from 'react-navigation';
import { AsyncStorage } from "react-native";
import Socket from '../../services/sockect'


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
            presentacion:'',
            calificada:'',
            califications:[]
        }

        this.scanear = this.scanear.bind(this)
        this.getCodesQr = this.getCodesQr.bind(this)
        this.hasCodeQr = this.hasCodeQr.bind(this)
        this.getCalificationsFromStorage = this.getCalificationsFromStorage.bind(this)
        this.getPresentacion = this.getPresentacion.bind(this)
        this.calificar = this.calificar.bind(this)
        this.addComment = this.addComment.bind(this)
    }

    

     componentDidMount() {
        this.getPresentacion()
        this.getCalificationsFromStorage()
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

    async  getCalificationsFromStorage(){
        try {
         AsyncStorage.getItem('califications')
         .then(califications => {
             califications = JSON.parse(califications)

             if(califications != null){
                this.setState({califications})
                califications.map(c =>{
                    if(c.titulo == this.state.presentacion.titulo){
                        this.setState({calificada:c.rating})
                    }
                })
                
             }else{
                console.log('Calficiaciones bacias')
             }
            
         })

         
            
        } catch (error) {
            console.log(error)
      }
    }

    getPresentacion(){
        const presentacion = this.props.navigation.getParam('presentacion')
        this.setState({presentacion})
    }

    async calificar(rating){
        await AsyncStorage.removeItem('califications')
        const califications = this.state.califications
        califications.push({titulo:this.state.presentacion.titulo, rating})
        AsyncStorage.setItem('califications', JSON.stringify(califications))
        .then( ok => {
                this.setState({calificada:rating})
                Socket.calification(rating, this.state.presentacion.titulo, this.props.navigation.getParam('idJornada'))
        })
    }

    async validCode(code){
        try {
           
            if(this.state.presentacion.qr!=code ){
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
        this.setState({ok:false, scaned:true, valid:true})
    }

    addComment(comment){
        Socket.addCommet(comment,  this.state.presentacion.titulo, this.props.navigation.getParam('idJornada'))
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
            calificada={this.state.calificada}
            calificar={this.calificar}
            addComment={this.addComment}
            />)
    }
}

export default  withNavigation(Calificacion)