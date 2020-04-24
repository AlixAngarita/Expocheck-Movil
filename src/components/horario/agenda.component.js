import React, {Component} from 'react';
import {Alert, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Agenda, LocaleConfig} from 'react-native-calendars';
import { Avatar, Icon } from "react-native-elements";

LocaleConfig.locales['es'] = {
  monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
  monthNamesShort: ['Ene.','Feb.','Mar.','Abr.','May.','Jun.','Jul..','Agost.','Sept.','Oct.','Nov.','Dic.'],
  dayNames: ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'],
  dayNamesShort: ['Dom','Lun','Mar','Mier','Jue','Vie','Sab']
};

LocaleConfig.defaultLocale = 'es';

const testIDs = {
    menu: {
      CONTAINER: 'menu',
      CALENDARS: 'calendars_btn',
      CALENDAR_LIST: 'calendar_list_btn',
      HORIZONTAL_LIST: 'horizontal_list_btn',
      AGENDA: 'agenda_btn',
      WEEK_CALENDAR: 'week_calendar_btn'
    },
    calendars: {
      CONTAINER: 'calendars',
      FIRST: 'first_calendar',
      LAST: 'last_calendar'
    },
    calendarList: {CONTAINER: 'calendarList'},
    horizontalList: {CONTAINER: 'horizontalList'},
    agenda: {
      CONTAINER: 'agenda',
      ITEM: 'item'
    },
    weekCalendar: {CONTAINER: 'weekCalendar'}
  };


export default class AgendaScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: {}
    };
  }

  render() {
      /*console.log('presentaciones agenda ->', this.props.items[0].titulo)
      console.log('fechainicio ->', this.props.fechaInicio)
      console.log('fechaFin ->', this.props.fechaFinaliza)*/
    return (
      <Agenda
        //testID={testIDs.agenda.CONTAINER}
        items={this.state.items}
        loadItemsForMonth={this.loadItems.bind(this)}
        renderItem={this.renderItem.bind(this)}
        renderEmptyDate={this.renderEmptyDate.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)}
        // Initially selected day
        selected={'2020-04-02'}
        // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
        minDate={'2020-04-02'}
        // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
        maxDate={'2020-08-15'}
        hideKnob={true}
        hideExtraDays={true}
        theme={{
            agendaDayTextColor: 'gray',
            agendaDayNumColor: 'gray',
            agendaTodayColor: '#00A8FF',
            calendarBackground: 'white',
            backgroundColor: 'white',
            dayTextColor: '#00A8FF',
            textSectionTitleColor: '#00A8FF'
        }}
      />     
    );
  }

  /*renderItem = this.props.items.map((item) =>
      <View style={styles.containerAgenda}>
        <Text style={styles.titulo}>{item.titulo}</Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }}>
          <Avatar
            rounded
            icon={{ name: 'info', type: 'font-awesome', color: 'white' }}
            overlayContainerStyle={{ backgroundColor: '#00A8FF' }}
            onPress={() => { }}
            activeOpacity={0.7}
            containerStyle={{ marginLeft: 10 }}
          />
          <View style={styles.capsula}>
            <Text style={{ color: 'white', fontSize: 16 }}>Inicio {item.horaInicio}</Text>
            <Text style={{ color: 'white', fontSize: 16 }}>{" "}{item.ubicacion}</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ marginRight: 10, color: "grey" }}>{item.nombreDia}</Text>
            <Avatar title={(item.dia).toString()}
              overlayContainerStyle={{ backgroundColor: '#48DBFB' }}
              containerStyle={{ marginRight: 10 }}
              rounded />
          </View>
        </View>
      </View>
      );*/

  /*loadItems(day) {
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(time);
        if (!this.state.items[strTime]) {
          this.state.items[strTime] = [];
          const numItems = Math.floor(Math.random() * 3 + 1);
          for (let j = 0; j < numItems; j++) {
            this.state.items[strTime].push({
              name: 'Item for ' + strTime + ' #' + j,
              height: Math.max(50, Math.floor(Math.random() * 150))
            });
          }
        }
      }
      const newItems = {};
      Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
      this.setState({
        items: newItems
      });
    }, 1000);
  }*/

  /*loadItems(day) {
    //const newItems = (this.props.items).map(presentacion => newItems[presentacion.fecha] = presentacion);
    const newItems = Object.assign(...(this.props.items).map(presentacion => 
        ({ [presentacion.fecha]: presentacion })));
    this.setState({
        items: newItems
      });
  }*/

  loadItems(day) {
    setTimeout(() => {
      /*const newItems = Object.assign(...(this.props.items).map(presentacion => 
            ({ [presentacion.fecha]: presentacion })));*/
       /*for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(time);
        if (!this.state.items[strTime]) {
          this.state.items[strTime] = [];
          console.log(strTime)

          
        }
      }*/
      /*const time = day.timestamp + i * 24 * 60 * 60 * 1000;
      const strTime = this.timeToString(time);
      this.state.items[strTime] = [];

      (this.props.items).map(p => {
        const f = new Date(p.fecha)
        const iso = f.getFullYear() + '-' +
        ('0'+ (f.getMonth()+1)).slice(-2) + '-' +
        ('0'+ f.getDate()).slice(-2);
        console.log(p.titulo, iso)
        if(iso == strTime)
        {
            this.state.items[iso].push(p)
        }
        //this.state.items[iso].push(p)
        })*/
        //console.log(newItems)

        for (let i = -15; i < 85; i++) {
            const time = day.timestamp + i * 24 * 60 * 60 * 1000;
            const strTime = this.timeToString(time);
            if (!this.state.items[strTime]) {
              this.state.items[strTime] = [];
              //const numItems = Math.floor(Math.random() * 3 + 1);
              //for (let j = 0; j < numItems; j++) {
                (this.props.items).map(p => {
                    const f = new Date(p.fecha)
                    const iso = f.getFullYear() + '-' +
                    ('0'+ (f.getMonth()+1)).slice(-2) + '-' +
                    ('0'+ f.getDate()).slice(-2);
                    //console.log(iso, strTime)
                    if(iso == strTime)
                    {
                        this.state.items[strTime].push(p); 
                    }     
                })
            }
          }

        const newItems = {};
        Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
        this.setState({
            items: newItems
        });
    }, 1000);
  }


  renderItem(item) {
    /*return (
      <TouchableOpacity
        testID={testIDs.agenda.ITEM}
        style={[styles.item, {height: item.height}]} 
        onPress={() => Alert.alert(item.name)}
      >
        <Text>{item.titulo}{item.name}</Text>
      </TouchableOpacity>
    );*/
    const fecha = new Date(item.fecha)
    const horaInicio = fecha.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'})
    fecha.setMinutes(fecha.getMinutes() + item.duracion);
    const horaFinal = fecha.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit', second:'0-digit'})
    
    return( 
        <View style={styles.item}>
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
                    <Text style={{ flexDirection: "column", color: 'white', fontSize: 15, marginRight: 5, textAlign: 'center', flexShrink: 1 }}>{item.ubicacion == undefined? 'Por asignar': item.ubicacion}</Text>
                </View>
            </View>
      </View>
    );
  }

  /*icon={{ name: 'map-marker', type: 'font-awesome', color: '#44BD32' }}
                    containerStyle={{ marginLeft: 0, marginRight: 10 }}
                    overlayContainerStyle={{ backgroundColor: 'white' }}
                    size={21}*/

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}>
        <Text>Ninguna presentación agendada.</Text>
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
    borderRadius:20,
    color: 'white',
    flex: 1,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex:1,
    paddingTop: 30
  },
  containerAgenda: {
    flex: 1,
    margin: 10,
    flexDirection: "column",
    minHeight: 80,
    height: "90%",
    backgroundColor: "white",
    paddingRight: 5,
    borderRadius: 20,
    paddingLeft: 10,
    paddingTop: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5
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
    marginRight:5,
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