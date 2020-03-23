import React from "react";
import PresentacionComponent from './presentacion.component'
import {findJornadaById} from '../../services/jornadas.service'
import { withNavigation } from 'react-navigation';
import { AsyncStorage } from "react-native";
import moment from 'moment';
import config from '../../config/server'
import  io from 'socket.io-client'
const pr = io(config.host+'/presentation')

class Presentacion extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            presentacion:'',
            loading:true,
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
        this.onNextPresentation()
    }

    componentDidMount(){
        this.getPresentacionActual()
    }

    getPresentacionActual(){
        this.setState({presentacion:'', loading:true})
        const presentacion = this.props.navigation.getParam('presentacion')
        if(presentacion){
            this.setState({presentacion, loading:false, presentacionSeleccionada:true})
            this.setState({idJornada:this.props.navigation.getParam('id')})
            this.setState({fechaInicio:this.props.navigation.getParam('fechaInicio')})
            this.setState({fechaFinaliza:this.props.navigation.getParam('fechaFinaliza')})
            this.setEvaluacion(presentacion)
        }else{
            findJornadaById(this.props.id)
            .then(j => {
                const jornada = j.data
                this.setState({idJornada:jornada._id})
                this.setState({fechaInicio:jornada.fechaInicio})
                this.setState({fechaFinaliza:jornada.fechaFinaliza})

                if(jornada.presentaciones.length == 0)
                    this.setState({loading:false})
                    jornada.presentaciones.map(presentacion => { 
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
        
    }

    setEvaluacion(presentacion, jornada){
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
                  console.log(this.state.evaluaciones)
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

    onNextPresentation(){
        pr.on('nextPresentation',() => {
            this.getPresentacionActual()
        })
    }

    render(){
        return(
            <PresentacionComponent
            presentacion={this.state.presentacion}
            hasCode={this.hasCode}
            presentacionSeleccionada={this.state.presentacionSeleccionada}
            idJornada={this.state.idJornada}
            fechaInicio={this.state.fechaInicio}
            fechaFinaliza={this.state.fechaFinaliza}
            loading={this.state.loading}
            evaluaciones={this.state.evaluaciones}
            evaluacionPublica={this.state.evaluacionPublica}
            comentariosPublicos={this.state.comentariosPublicos}
            />)
    }
}

export default withNavigation(Presentacion)