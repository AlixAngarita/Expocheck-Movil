import React from "react";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  Picker,
  ActivityIndicator
} from "react-native";
import { Avatar, Icon } from "react-native-elements";
import FlipCard from 'react-native-flip-card'
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import AgendaComponent from './agenda.component.js'

const styles = StyleSheet.create({
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
    fontSize: 20,
    marginTop: 5,
    marginBottom: 10,
    marginLeft: 5,
    marginRight:5,
    color: '#636161'
  },
  capsula: {
    alignItems: "center",
    backgroundColor: "#A5A8A5",
    flexDirection: "row",
    borderRadius: 20,
    //opacity: 0.8,
    paddingLeft: 10,
    paddingRight: 10,
  }
});

const keyExtractor = (item, index) => index.toString();

const renderItem = ({ item }) =>
  (
    <FlipCard>
      {/* Face Side */}
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
      {/* Back Side */}
      <View style={{
        borderRadius: 20,
        backgroundColor: '#48DBFB',
        flex: 1, flexDirection: 'column',
        flexWrap: 'nowrap',
        padding: 10
      }}>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
          <Icon type='font-awesome' size={20}
            name='arrow-circle-left' color='#48DBFB' />
          <Text style={{ fontSize: 18, marginLeft: 10 }}>Descripción</Text>
        </View>
        <Text
          style={{ color: 'grey' }}>{item.integrantes[0].nombre}</Text>
      </View>
    </FlipCard>
  );

  //<Text style={{ fontSize: 10 }}>{' (' + item.duracion + ' min)'}</Text>

const Horario = props => {
  //console.log('Horario->', props) //no se envian las fechas
  return (
    <View style={{ flex: 1 }}>
      {props.horario.length > 0 && !props.loading ? (
        <React.Fragment>
          <AgendaComponent 
          items={props.horario} 
          fechaInicio={props.fechaInicio}
          fechaFinaliza={props.fechaFinaliza}
          />
        </React.Fragment>
      ) : null}

      {!props.loading && props.horario.length == 0 ? (
        <View
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Text style={{ color: "grey", fontSize: 17 }}>Sin agenda.</Text>
        </View>
      ) : null}

      {props.loading && props.horario.length == 0 && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
    </View>
  );
};

/*
<View style={{ flexDirection: "column" }}>
            <Picker
              style={{
                width: 180,
                marginLeft: 10
              }}
              onValueChange={(itemValue, itemIndex) => props.filtrar(itemValue)}
              selectedValue={props.diaSeleccionado}
            >
              <Picker.Item label={"Toda la semana"} value="all" />
              {props.dias.map(dia => (
                <Picker.Item key={dia} label={dia} value={dia} />
              ))}
            </Picker>
          </View>
<FlatList
            keyExtractor={keyExtractor}
            data={props.horario}
            renderItem={AgendaComponent}
          />
*/

export default Horario;
