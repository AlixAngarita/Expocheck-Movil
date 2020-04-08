import React, { useContext } from "react";
import CalfificarComponent from './calificar.component'
import * as Permissions from 'expo-permissions';
import { withNavigation } from 'react-navigation';
import { AsyncStorage } from "react-native";
import Socket from '../../services/sockect'
import {findById} from '../../services/presentacion.service'
import {connect} from 'react-redux'


class Calificacion extends React.Component{
    constructor(props){
        super(props)
        
        this.state = {
            user:null,
            hasCameraPermission: null,
            scaned: true,
            ok:false,
            code:'',
            valid:true,
            qrs:[],
            hasQrCode:false,
            presentacion:'',
            califications:[]
        }

        this.scanear = this.scanear.bind(this)
        this.getCodesQr = this.getCodesQr.bind(this)
        this.hasCodeQr = this.hasCodeQr.bind(this)
        this.getPresentacion = this.getPresentacion.bind(this)
        this.addComment = this.addComment.bind(this)
        this.setPresentacion = this.setPresentacion.bind(this)
        this.getUser = this.getUser.bind(this)
        this.addQuestion = this.addQuestion.bind(this)
    }

    

     componentDidMount() {
        this.getPresentacion()
        this.hasCodeQr()
        this.getPermissionsAsync();
        this.getUser()
       
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

    

    getPresentacion(){
        const presentacion = this.props.navigation.getParam('presentacion')
        this.setState({presentacion})
    }

    setPresentacion(){
        findById(this.props.navigation.getParam('idJornada'), this.state.presentacion._id)
        .then(res => this.setState({presentacion:res.data}))
    }

    getUser(){
        const user = this.props.user
        this.setState({user})
        console.log("El user es ->", user)
    }

    async validCode(code){
        try {
           
            if(this.state.presentacion.codigoQR!=code ){
                this.setState({valid:false})
            }else{
                await AsyncStorage.removeItem('qrs')
                const currentCodes = this.state.qrs
                console.log(currentCodes)
                currentCodes.push(code)
                await AsyncStorage.setItem('qrs', JSON.stringify(currentCodes))
                if(this.props.navigation.getParam('back')){
                    this.props.navigation.goBack()
                }
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
        const comentario = {contenido:comment, autor:this.state.user.correo}
        Socket.addCommet(comentario, this.state.presentacion, this.props.navigation.getParam('idJornada'))
        .then(res => this.setPresentacion())
    }

    addQuestion(question){
        const pregunta = {contenido:question, autor:this.state.user.correo}
        Socket.addQuestion(pregunta, this.state.presentacion, this.props.navigation.getParam('idJornada'))
        .then(res => this.setPresentacion())
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
            addComment={this.addComment}
            granted={this.state.hasCameraPermission == 'granted' || 'undetermined'}
            pedirPermiso={this.getPermissionsAsync}
            presentacion={this.state.presentacion}
            comment={this.props.navigation.getParam('comment')}
            addQuestion={this.addQuestion}
            />)
    }
}

function mapStateToProps(state) {
    const { auth } = state
    return { user: auth.user }
}

export default  connect(mapStateToProps)(withNavigation(Calificacion))