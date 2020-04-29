import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Agenda, LocaleConfig } from 'react-native-calendars';
import { Avatar } from "react-native-elements";
import FlipCard from 'react-native-flip-card'

LocaleConfig.locales['es'] = {
    monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Agost', 'Sept', 'Oct', 'Nov', 'Dic'],
    dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
    dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mier', 'Jue', 'Vie', 'Sab']
};

LocaleConfig.defaultLocale = 'es';

export default class AgendaScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: {}
        };
        this._isMounted = false;
    }

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
     }

    _today(){
        var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
        var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);
        return localISOTime;
    }



    render() {
        return (
            <Agenda
                items={this.state.items}
                loadItemsForMonth={this.loadItems.bind(this)}
                renderItem={this.renderItem.bind(this)}
                renderEmptyDate={this.renderEmptyDate.bind(this)}
                rowHasChanged={this.rowHasChanged.bind(this)}
                selected={this._today()}
                minDate={this.props.fechaInicio}
                maxDate={this.props.fechaFinaliza}
                hideKnob={false}
                hideExtraDays={true}
                theme={{
                    agendaDayTextColor: 'gray',
                    agendaDayNumColor: 'gray',
                    agendaTodayColor: '#00A8FF',
                    calendarBackground: 'white',
                    backgroundColor: 'white',
                    dayTextColor: '#00A8FF',
                    textSectionTitleColor: '#00A8FF',
                    monthTextColor: 'gray'
                }}
            />
        );
    }

    loadItems(day) {
        this._isMounted && setTimeout(() => {
            for (let i = -15; i < 85; i++) {
                const time = day.timestamp + i * 24 * 60 * 60 * 1000;
                const strTime = this.timeToString(time);
                if (!this.state.items[strTime]) {
                    this.state.items[strTime] = [];
                    (this.props.items).map(p => {
                        const f = new Date(p.fecha)
                        const iso = f.toISOString().split('T')[0];
                        if (iso == strTime) {
                            this.state.items[strTime].push(p);
                        }
                    })
                }
            }
            const newItems = {};
            Object.keys(this.state.items).forEach(key => { newItems[key] = this.state.items[key]; });
            this.setState({
                items: newItems
            });
        }, 1000);
    }

    mapIntegrantes(integrantes) {
        const itemIntegrante = integrantes.map((integrante) =>
        <View style={{...styles.capsula, marginTop: 5, marginBottom: 5}}
            key={integrante._id}>
            <Avatar
                rounded
                icon={{ name: 'user', type: 'font-awesome', color: '#44BD32' }}
                containerStyle={{ marginRight: 10 }}
                overlayContainerStyle={{ backgroundColor: 'white' }}
                size={21}
            />
            <Text style={{ flexDirection: "column", color: 'white', fontSize: 15, marginHorizontal: 'auto', textAlign: 'left', flexShrink: 1 }}>{integrante.nombre}</Text>
        </View>
        );
        return (
          <View>{itemIntegrante}</View>
        );
    }

    renderItem(item) {
        const fecha = new Date(item.fecha)
        const horaInicio = fecha.toLocaleTimeString().substring(0,5);
        fecha.setMinutes(fecha.getMinutes() + item.duracion);
        const horaFinal = fecha.toLocaleTimeString().substring(0,5);

        return (
            <View style={styles.item}>
                <FlipCard>
                    {/* Face Side */}
                    <View>
                        <Text style={{ color: 'white', fontSize: 15, marginLeft: 5, marginTop: 5 }}>{horaInicio} - {horaFinal}, {item.duracion} minutos</Text>
                        <Text style={styles.titulo}>{item.titulo}</Text>
                        <View style={{ flexDirection: "row", justifyContent: "center", marginBottom: 5 }}>
                            <View style={styles.capsula}>
                                <Avatar
                                    rounded
                                    icon={{ name: 'map-marker', type: 'font-awesome', color: '#44BD32' }}
                                    containerStyle={{ marginLeft: 0, marginRight: 10 }}
                                    overlayContainerStyle={{ backgroundColor: 'white' }}
                                    size={21}
                                />
                                <Text style={{ flexDirection: "column", color: 'white', fontSize: 15, marginRight: 5, textAlign: 'center', flexShrink: 1 }}>{item.ubicacion == undefined ? 'Por asignar' : item.ubicacion}</Text>
                            </View>
                        </View>
                    </View>
                    {/* Back Side */}
                    <View>
                        <Text style={{ fontSize: 18, color: 'white',  fontWeight: 'bold', marginBottom: 10, marginLeft: 10}}>Integrantes</Text>
                        {this.mapIntegrantes(item.integrantes)}
                    </View>
                </FlipCard>
            </View>
        );
    }

    renderEmptyDate() {
        return (
            <View style={styles.emptyDate}>
                <Text style={{color: 'gray'}}>Ninguna presentación agendada.</Text>
            </View>
        );
    }

    rowHasChanged(r1, r2) {
        return r1.name !== r2.name;
    }

    timeToString(time) {
        const date = new Date(time);
        return date.toISOString().split('T')[0];
    }
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#48DBFB',
        borderRadius: 20,
        color: 'white',
        flex: 1,
        padding: 10,
        marginRight: 10,
        marginTop: 17
    },
    emptyDate: {
        height: 15,
        flex: 1,
        paddingTop: 30
        
    },
    loading: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
    titulo: {
        textAlign: 'center',
        fontSize: 22,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 5,
        marginRight: 5,
        color: 'white',
        fontWeight: 'bold'
    },
    capsula: {
        alignItems: "center",
        backgroundColor: "#00A8FF",
        flexDirection: "row",
        borderRadius: 20,
        //opacity: 0.8,
        padding: 6,
        marginLeft: 10,
        marginRight: 10
    }
});