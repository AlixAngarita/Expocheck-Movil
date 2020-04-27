import React from "react";
import PresentacionComponent from './presentacion.component'
import {findJornadaById} from '../../services/jornadas.service'
import { withNavigation } from 'react-navigation';
import { AsyncStorage } from "react-native";
import config from '../../config/server'
import  io from 'socket.io-client'
const generalEvent = io(config.host+'/generalEvent')
const jornadaEvents = io(config.host+'/jornadaEvents')
import {findById} from '../../services/presentacion.service'
import {connect} from 'react-redux'
import Socket from '../../services/sockect'
import {qrstate} from '../../redux/actions/qr.action'

class Presentacion extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            jornada:'',
            user:null,
            presentacion:'',
            loading:true,
            loadingVideo:false,
            presentacionSeleccionada:false,
            idJornada:0,
            fechaInicio:'',
            fechaFinaliza:'',
            evaluaciones:[],
            evaluacionPublica:false,
            comentariosPublicos:false
        }

        this.hasCode = this.hasCode.bind(this)
        this.setEvaluacion = this.setEvaluacion.bind(this)
        this.calificar = this.calificar.bind(this)
        this.setPresentacion = this.setPresentacion.bind(this)
        this.getUser = this.getUser.bind(this)
        this.realtimeEvent = this.realtimeEvent.bind(this)
        this.hasCodeQr = this.hasCodeQr.bind(this)
        this.reloadJornada = this.reloadJornada.bind(this)
        this.realtimeEvent()
    }



    componentDidMount(){
        this.getPresentacionActual()
        this.getUser()
        
    }

    async reloadJornada(){
        this.setState({presentacion:'', loading:true})
        const presentacion = this.props.navigation.getParam('presentacion')
        await this.setState({idJornada:this.props.idJornada})

        findJornadaById(this.state.idJornada)
        .then(res => {
            const jornada = res.data
            this.setState({jornada})
            this.setState({presentacion, loading:false, presentacionSeleccionada:true})
            this.setState({fechaInicio:jornada.fechaInicio})
            this.setState({fechaFinaliza:jornada.fechaFinaliza})
            this.setEvaluacion(presentacion, this.state.jornada)
            this.hasCodeQr()
        })
    }

    async getPresentacionActual(){
        this.setState({presentacion:'', loading:true})
        const presentacion = this.props.navigation.getParam('presentacion')
        await this.setState({idJornada:this.props.idJornada})
        if(presentacion){
            const jornada = this.props.navigation.getParam('jornada')
            this.setState({jornada})
            this.setState({presentacion, loading:false, presentacionSeleccionada:true})
            this.setState({fechaInicio:jornada.fechaInicio})
            this.setState({fechaFinaliza:jornada.fechaFinaliza})
            this.setEvaluacion(presentacion, this.state.jornada)
            this.hasCodeQr()
        }
        
    }

     setEvaluacion(presentacion, jornada) {
        let evaluacionPublica = 0
                  let comentariosPublicos = 0
                  presentacion.integrantes.map(int => {
                    if(int.autor != undefined){
                      if(int.autor.evaluacionPublica){
                        evaluacionPublica+=1
                      }
                      if(int.autor.comentariosPublicos){
                        comentariosPublicos+=1
                      }
                    }
                  })

                  if (evaluacionPublica > (presentacion.integrantes.length/2) || evaluacionPublica==presentacion.integrantes.length){
                     this.setState({evaluacionPublica:true})
                  }
                  if (comentariosPublicos > (presentacion.integrantes.length/2) || comentariosPublicos==presentacion.integrantes.length){
                     this.setState({comentariosPublicos:true})
                  }

                 
                  let evaluaciones = []
                  jornada.metricas.map(metrica => {
                    let valores_calificacion_metrica_actual = []
                    presentacion.evaluaciones.map(evaluacion => {
                      if(evaluacion.nombre == metrica.nombre){
                        valores_calificacion_metrica_actual.push(evaluacion.valor)
                      }
                    })
                    evaluaciones.push({metrica:metrica.nombre, votaciones:valores_calificacion_metrica_actual.length, 
                      calificaciones:valores_calificacion_metrica_actual})
                    
                  })
                  this.setState({evaluaciones})
    }

    hasCode(){
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem('qrs')
            .then(qrs => {
                qrs = JSON.parse(qrs)
                if(qrs.length > 0){
                    const code = this.state.presentacion.codigoQR
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

    realtimeEvent(){
        
        generalEvent.on('updatePrivacidad', (data) => {
            if(this.state.presentacion != ''){
                const integrantes = this.state.presentacion.integrantes.map(i => i.nombre)
                if(integrantes.includes(data.userid)){
                    findById(this.state.idJornada, this.state.presentacion._id)
                    .then( res => {
                        const presentacion = res.data
                        const jornada= this.state.jornada
                        this.setState({presentacion, loadingVideo:true, evaluacionPublica:false, comentariosPublicos:false})
                        this.setEvaluacion(presentacion, jornada)
                        this.setState({loadingVideo:false})
                    })
                }
            }
        })

        generalEvent.on('reloadPresentation',(data) => {
            if(this.state.presentacion.titulo == data.titulo){
                findById(this.state.idJornada, this.state.presentacion._id)
                .then(res => {
                    this.setState({presentacion:res.data})
                    this.setEvaluacion(res.data, this.state.jornada)
                    this.hasCodeQr()
                })
            }
        })
        
        jornadaEvents.on('jornadaEvents',(data) => {
            if(this.state.jornada.titulo == data.titulo){
                this.reloadJornada()
            }
        })
        
    
    }

    setPresentacion(){
        findById(this.state.idJornada, this.state.presentacion._id)
        .then(res => {
            this.setState({presentacion:res.data})
            this.setEvaluacion(res.data, this.state.jornada)
            this.hasCodeQr()
            
        })
    }

    getUser(){
        const user = this.props.user
        this.setState({user})
    }
    
    async calificar(metrica, valor){
        const evaluaciones = this.state.presentacion.evaluaciones
        const evaluacion = {nombre:metrica, valor, autor:this.state.user.correo}

        let update = false
        evaluaciones.map(ev => {
            if(ev.nombre == evaluacion.nombre && ev.autor == evaluacion.autor){
                update = true
                Socket.updateEvaluacion(evaluacion.valor, this.state.presentacion,
                    this.state.idJornada, ev._id)
                .then(res => this.setPresentacion())
                .catch(err => console.error(err))
            }
                
        })

        if(!update){
            Socket.addEvaluacion(evaluacion, this.state.presentacion, this.state.idJornada)
            .then(res => this.setPresentacion())
            .catch(err => console.error(err))
        }
        
    }

    hasCodeQr(){
        this.hasCode()
        .then(code => {
            if(code!=''){
                this.props.qrstate({titulo:this.state.presentacion.titulo,  valid:true})
            }
            
        })
    }

    render(){
        return(
            <PresentacionComponent
            presentacion={this.state.presentacion}
            jornada={this.state.jornada }
            hasCode={this.hasCode}
            presentacionSeleccionada={this.state.presentacionSeleccionada}
            idJornada={this.state.idJornada}
            loading={this.state.loading}
            evaluaciones={this.state.evaluaciones}
            evaluacionPublica={this.state.evaluacionPublica}
            comentariosPublicos={this.state.comentariosPublicos}
            calificar={this.calificar}
            autor={this.props.user != undefined ? this.props.user.correo: 'No asignado'}
            setPresentacion = {this.setPresentacion}
            loadingVideo={this.state.loadingVideo}
            />)
    }
}

function mapStateToProps(state) {
    const { auth, connect, idJornada } = state
    return { user: auth.user, connect, idJornada}
}


export default connect(mapStateToProps, {qrstate})(withNavigation(Presentacion))