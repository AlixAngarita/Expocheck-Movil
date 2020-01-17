import React from "react";
import {  Header } from 'react-native-elements';
import ActionButton from 'react-native-action-button';
import { withNavigation } from 'react-navigation';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  ActivityIndicator,
  Alert
} from "react-native";
import { Rating,Icon} from "react-native-elements";
import moment from 'moment';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  titleContainer: {
    flex:1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    backgroundColor: "white",
    elevation: 5,
    margin:20
  },

  commentsContainer: {
    flex: 1
  },
  comment:{
    color:'grey'
  },
  comentStyle:{
    marginHorizontal:20,
    marginVertical:5, 
    borderRadius:20,
    padding:10,
    backgroundColor:'#f1f2f6'
  },
  loading:{
    flex:1,
    flexDirection:'column', 
    alignItems:'center', 
    justifyContent:'center'
}
});


const keyExtractor = (item, index) => index.toString();

const renderItem = ({ item }) => (
    
      <View style={styles.comentStyle}>
        <Text style={styles.comment}>
          {item}
        </Text>
      </View>
);

const Presentacion = props => {

  return (
    <View style={styles.container}>
      <Header
            backgroundColor='#0abde3'
            centerComponent={{ text: props.presentacionSeleccionada ? 'Presentación':'Exponiendo', style: { color: '#fff', fontSize:20 } }}
            />
      
      {props.presentacion != '' && !props.loading ?
        <React.Fragment>
            <View style={styles.titleContainer}>
                <Text style={{fontSize:20, textAlign:'center',marginBottom:20}}>{props.presentacion.titulo}</Text>
                <Rating
                      imageSize={25}
                      type="custom"
                      readonly
                      fractions={1}
                      startingValue={props.presentacion.calificacion.length > 0 ? (props.presentacion.calificacion.reduce((a, b) => a + b, 0))/props.presentacion.calificacion.length:0}
                    />
                  <Text style={{fontSize:10, color:'grey'}}>{'('+props.presentacion.calificacion.length+' votaciones )'}</Text>
            </View>

            <View style={styles.commentsContainer}>
              {props.presentacion.comentarios.length > 0 ?
                <FlatList
                keyExtractor={keyExtractor}
                data={props.presentacion.comentarios}
                renderItem={renderItem}
              /> :
              <View style={{ display:'flex',flex:1, flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                <Text style={{color:'grey'}}>Sin comentarios.</Text>
              </View>
              }
              <ActionButton
                offsetY={5}
                offsetX={20}
                renderIcon = {(active) => <Icon name="done" color="white"/>}
                buttonColor="rgba(10, 189, 227,1.0)"
                onPress={() => {
                    moment(moment().format('YYYY-MM-DD')).isBetween( moment(props.fechaInicio), moment(props.fechaFinaliza),  null, '[]') ?
                    props.navigation.navigate('Calificar', {presentacion:props.presentacion, hascode: props.hasCode(), idJornada:props.idJornada}) :
                    Alert.alert('Fuera de fecha', 'Solo puede ver la presentación.')
                  } 
                }
              />
            </View>
        </React.Fragment>:null
      }

      {!props.loading && props.presentacion == '' ?
        <View style={{ display:'flex',flex:1, flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
          <Text style={{color:'grey', fontSize:17}}>No  hay una presentacion agendada.</Text>
        </View>:null
      } 

      {props.loading && props.presentacion == '' && 
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      }

    </View>
  );
};

export default withNavigation(Presentacion);
