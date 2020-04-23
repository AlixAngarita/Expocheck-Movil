import React from "react";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  Picker,
  ActivityIndicator
} from "react-native";
import { Avatar, Icon} from "react-native-elements";
import moment from "moment";

const styles = StyleSheet.create({
  containerAgenda: {
    flex: 1,
    margin: 10,
    flexDirection: "column",
    minHeight: 100,
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
    textAlign:'center', 
    fontSize:20, 
    marginTop:5,
    marginBottom: 10
  },
  capsula:{
    backgroundColor: "#44BD32",
    color: "white",
    borderRadius:20,
    //opacity: 0.8,
    paddingLeft: 10,
    paddingRight: 10
  }
});

const keyExtractor = (item, index) => index.toString();

const renderItem = ({ item }) => 
(
  <View style={styles.containerAgenda}>
    <Text style={styles.titulo}>{item.titulo}</Text>
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Avatar
          rounded
          icon={{name: 'info', type: 'font-awesome', color:'white'}}
          overlayContainerStyle={{backgroundColor: '#00A8FF'}}
          onPress={() => {}}
          activeOpacity={0.7}
          containerStyle={{ marginLeft: 10}}
          />
      <View style={styles.capsula}>
        <Text style={{color: 'white', fontSize: 20 }}>{item.horaInicio}<Text style={{fontSize:10}}>{' ('+item.duracion+' min)'}</Text></Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={{ marginRight: 10, color: "grey" }}>{item.nombreDia}</Text>
        <Avatar title={(item.dia).toString()} 
          overlayContainerStyle={{backgroundColor: '#48DBFB'}}
          containerStyle={{ marginRight: 10}}
          rounded />
      </View>
    </View>
  </View>
);

const Horario = props => {
  return (
    <View style={{ flex: 1 }}>
      {props.horario.length > 0 && !props.loading ? (
        <React.Fragment>
          <View style={{ flexDirection: "column"}}>
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
            renderItem={renderItem}
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
          <Text style={{ color: "grey", fontSize:17}}>Sin agenda.</Text>
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

export default Horario;
