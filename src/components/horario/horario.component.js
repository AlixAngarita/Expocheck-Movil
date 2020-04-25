import React from "react";
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator
} from "react-native";
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
  }
});

const Horario = props => {
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

export default Horario;
