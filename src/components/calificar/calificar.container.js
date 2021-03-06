import React, { useContext } from "react";
import CalfificarComponent from './calificar.component'
import * as Permissions from 'expo-permissions';
import { withNavigation } from 'react-navigation';
import { AsyncStorage } from "react-native";
import Socket from '../../services/sockect'
import {findById} from '../../services/presentacion.service'
import {connect} from 'react-redux'
import config from '../../config/server'
import  io from 'socket.io-client'
import {qrstate} from '../../redux/actions/qr.action'
const generalEvent = io(config.host+'/generalEvent')

class Calificacion extends React.Component{
    constructor(props){
        super(props)
        
        this.state = {
            comentariosPublicos:false,
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
        this.realtimeEvent = this.realtimeEvent.bind(this)
        this.setComentariosPublicos = this.setComentariosPublicos.bind(this)
        this.realtimeEvent()
    }

    

     componentDidMount() {
        this.getPresentacion()
        this.hasCodeQr()
        this.getPermissionsAsync();
        this.getUser()
       
    }

    realtimeEvent(){
        generalEvent.on('reloadPresentation',(data) => {
            if(this.state.presentacion.titulo == data.titulo){
                this.setPresentacion()
                this.setComentariosPublicos(this.state.presentacion)
            }
        })

        generalEvent.on('updatePrivacidad', (data) => {
            if(this.state.presentacion != ''){
                const integrantes = this.state.presentacion.integrantes.map(i => i.nombre)
                if(integrantes.includes(data.userid)){
                    this.setPresentacion()
                    
                }
            }
        })
    }

    async componentWillUnmount(){
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
            console.error(error)
      }
    }


    getPresentacion(){
        const presentacion = this.props.navigation.getParam('presentacion')
        this.setState({presentacion})
        this.setComentariosPublicos(presentacion)
    }

    setComentariosPublicos(presentacion){
         let comentariosPublicos = 0
         presentacion.integrantes.map(int => {
         if(int.autor != undefined){
             if(int.autor.comentariosPublicos){
                comentariosPublicos+=1
             }
            }
         })

                  
         if (comentariosPublicos > (presentacion.integrantes.length/2) || comentariosPublicos == presentacion.integrantes.length){
            this.setState({comentariosPublicos:true})
        }else{
            this.setState({comentariosPublicos:false})
        }
    }

    setPresentacion(){
        findById(this.props.navigation.getParam('idJornada'), this.state.presentacion._id)
        .then(res => {
            this.setState({presentacion:res.data})
            this.setComentariosPublicos(res.data)
        })
    }

    getUser(){
        const user = this.props.user
        this.setState({user})
    }

    async validCode(code){
        try {
           
            if(this.state.presentacion.codigoQR!=code ){
                this.setState({valid:false})
            }else{
                await AsyncStorage.removeItem('qrs')
                const currentCodes = this.state.qrs
                currentCodes.push(code)
                await AsyncStorage.setItem('qrs', JSON.stringify(currentCodes))
                this.setState({valid:true})
                if(this.props.navigation.getParam('back')){
                    this.props.qrstate({titulo:this.state.presentacion.titulo, valid:true})
                    this.props.navigation.goBack()
                }
            }
            

        } catch (error) {
             console.error('Error al setear qrs ', error)
        }
    }

    hasCodeQr(){
        const hascode = this.props.navigation.getParam('hascode')
        hascode.then(code => {
            if(code!=''){
                this.setState({hasQrCode:true, ok:true, valid:true, scaned:false, code})
                if(this.props.navigation.getParam('back')){
                    this.props.qrstate({titulo:this.state.presentacion.titulo,  valid:true})
                    this.props.navigation.goBack()
                }
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
            comentariosPublicos={this.state.comentariosPublicos}
            status={this.state.hasCameraPermission}
            />)
    }
}

function mapStateToProps(state) {
    const { auth } = state
    return { user: auth.user }
}

export default  connect(mapStateToProps,{qrstate})(withNavigation(Calificacion))