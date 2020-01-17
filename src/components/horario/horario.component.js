import React from "react";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  Picker,
  ActivityIndicator
} from "react-native";
import { Avatar, Header } from "react-native-elements";
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
  }
});

const keyExtractor = (item, index) => index.toString();

const renderItem = ({ item }) => (
  <View style={styles.containerAgenda}>
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      <View>
        <Text style={{ color: "grey", fontSize: 20 }}>{item.hora}<Text style={{fontSize:10}}>{' ('+item.tiempo+' min)'}</Text></Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={{ marginRight: 10, color: "grey" }}>{item.nombreDia}</Text>
        <Avatar title={item.dia} rounded />
      </View>
    </View>
    <Text>{item.titulo}</Text>
  </View>
);

const Horario = props => {
  return (
    <View style={{ flex: 1 }}>
      <Header
        backgroundColor="#0abde3"
        centerComponent={{
          text: "Agenda " + (props.fechaInicio != null ? moment(props.fechaInicio).format("MMM Y"): ''),
          style: { color: "#fff", fontSize: 20 }
        }}
      />

      {props.horario.length > 0 && !props.loading ? (
        <React.Fragment>
          <View style={{ flexDirection: "column", alignItems: "center" }}>
            <Picker
              style={{
                width: 200,
                borderColor: "#0abde3",
                borderWidth: 5,
                borderStyle: "solid"
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
