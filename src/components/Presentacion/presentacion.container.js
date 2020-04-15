import React from "react";
import PresentacionComponent from './presentacion.component'
import {findJornadaById} from '../../services/jornadas.service'
import { withNavigation } from 'react-navigation';
import { AsyncStorage } from "react-native";
import moment from 'moment';
import config from '../../config/server'
import  io from 'socket.io-client'
const pr = io(config.host+'/presentation')
const generalEvent = io(config.host+'/generalEvent')
import {findById} from '../../services/presentacion.service'
import {connect} from 'react-redux'
import Socket from '../../services/sockect'
import {store} from '../../redux/store'

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
        this.getPresentacionWithConecction = this.getPresentacionWithConecction.bind(this)
        this.getPresentacionWithoutConecction = this.getPresentacionWithoutConecction.bind(this)
        this.realtimeEvent = this.realtimeEvent.bind(this)
        this.realtimeEvent()
    }

    // setLoading(){
    //     this.timer = setTimeout(() => {
    //         this.setState({loadingVideo:false})
    //       }, 100);
    // }

    getPresentacionWithConecction(){
        findJornadaById(this.props.id)
        .then(j => {
            const jornada = j.data
            this.setState({jornada})
            this.setState({idJornada:jornada._id})
            this.setState({fechaInicio:jornada.fechaInicio})
            this.setState({fechaFinaliza:jornada.fechaFinaliza})

            if(jornada.presentaciones.length == 0)
                this.setState({loading:false})
                jornada.presentaciones.map(async presentacion => { 
                const format = 'hh:mm a'
                // hay una presentacion disponible para hoy?
                const now = moment().format('YYYY-MM-DD')
                if(moment(now, 'YYYY-MM-DD hh:mm a').format('D')==presentacion.dia){
                  const horaInicio = moment(presentacion.fecha,'MM-DD-YYYY hh:mm a').format(format)
                  const horatermina = moment(presentacion.fecha, 'MM-DD-YYYY hh:mm a').add(presentacion.duracion,'m').format(format)
                  // hay una presentacion para la hora actual ?
                  if(moment(moment().format(format),format).isBetween(moment(horaInicio,format), moment(horatermina,format),  null, '[)')){
                    this.setState({presentacion, loading:false})
                    this.setState({idJornada:jornada._id})
                    this.setState({fechaInicio:jornada.fechaInicio})
                    this.setState({fechaFinaliza:jornada.fechaFinaliza})
                    this.setEvaluacion(presentacion, jornada)
                  }else{
                    this.setState({loading:false})
                }
                }else{
                    this.setState({loading:false})
                }
            })
            
        })
    }

    getPresentacionWithoutConecction(){
        store.getState().jornadas.map(jornada => {
            if(jornada._id == this.state.idJornada){
                if(jornada.presentaciones.length > 0){
                        this.setState({loading:false})
                        jornada.presentaciones.map(async presentacion => { 
                        const format = 'hh:mm a'
                        // hay una presentacion disponible para hoy?
                        const now = moment().format('YYYY-MM-DD')
                        if(moment(now, 'YYYY-MM-DD hh:mm a').format('D')==presentacion.dia){
                        const horaInicio = moment(presentacion.fecha,'MM-DD-YYYY hh:mm a').format(format)
                        const horatermina = moment(presentacion.fecha, 'MM-DD-YYYY hh:mm a').add(presentacion.duracion,'m').format(format)
                        // hay una presentacion para la hora actual ?
                        if(moment(moment().format(format),format).isBetween(moment(horaInicio,format), moment(horatermina,format),  null, '[)')){
                            this.setState({presentacion, loading:false})
                            this.setState({idJornada:jornada._id})
                            this.setState({fechaInicio:jornada.fechaInicio})
                            this.setState({fechaFinaliza:jornada.fechaFinaliza})
                            this.setEvaluacion(presentacion, jornada)
                        }else{
                            this.setState({loading:false})
                        }
                        }else{
                            this.setState({loading:false})
                        }
                    })
                }
            }
        })
    }

    componentDidMount(){
        this.getPresentacionActual()
        this.getUser()
        
    }
    // componentWillMount(){
    //      clearTimeout(this.timer);
    // }

    async getPresentacionActual(){
        this.setState({presentacion:'', loading:true})
        const presentacion = this.props.navigation.getParam('presentacion')
        await this.setState({idJornada:this.props.idJornada})
        if(presentacion){
            const jornada = null
            this.setState({jornada})
            this.setState({presentacion, loading:false, presentacionSeleccionada:true})
            this.setState({fechaInicio:this.props.navigation.getParam('fechaInicio')})
            this.setState({fechaFinaliza:this.props.navigation.getParam('fechaFinaliza')})
            this.setEvaluacion(presentacion, this.state.jornada)
        }else{
            if(this.props.connect)
                this.getPresentacionWithConecction()
            else
                this.getPresentacionWithoutConecction()
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

                  console.log("Para la presentación -> ", presentacion.titulo +" la evaluación es ", this.state.evaluacionPublica)
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
        pr.on('nextPresentation', (data) => {
            findById(this.state.idJornada, data.id)
            .then( res => {
                const presentacion = res.data
                const jornada= this.state.jornada
                this.setState({presentacion, loadingVideo:true, evaluacionPublica:false, comentariosPublicos:false})
                this.setEvaluacion(presentacion, jornada)
                this.setState({loadingVideo:false})
            })
        })

        generalEvent.on('reloadPresentation',() => {
            findById(this.state.idJornada, this.state.presentacion._id)
            .then(res => {
                this.setState({presentacion:res.data})
                this.setEvaluacion(res.data, this.state.jornada)
            })
        })
    }

    setPresentacion(){
        findById(this.state.idJornada, this.state.presentacion._id)
        .then(res => {
            this.setState({presentacion:res.data})
            this.setEvaluacion(res.data, this.state.jornada)
            
        })
    }

    getUser(){
        const user = this.props.user
        this.setState({user})
    }
    
    async calificar(metrica, valor){
        console.log('Evaluacion -> ', metrica, valor)
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

    render(){
        return(
            <PresentacionComponent
            presentacion={this.state.presentacion}
            jornada={this.state.jornada}
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


export default connect(mapStateToProps)(withNavigation(Presentacion))