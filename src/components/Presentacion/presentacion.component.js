import React from "react";
import {  Header } from 'react-native-elements';
import ActionButton from 'react-native-action-button';
import { withNavigation } from 'react-navigation';
import {
  View,
  StyleSheet,
  FlatList,
  Text
} from "react-native";
import { Rating,Icon} from "react-native-elements";


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
  }
});

const list = [
  {
    name: 'Amy Farha',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: 'Amy Farhadddddddddddddddddddddddddddddddddddddddddddddddddd          dddddddddddddddddddddddddddddddddddddddddd ddddddddddddddddddddddddddddd dddddddddddddddddddddddddd'
  },
  {
    name: 'Chris Jackson',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman'
  },
  {
    name: 'Chris Jackson',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman'
  },

  {
    name: 'Chris Jackson',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman'
  },

  {
    name: 'Chris Jackson',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman'
  }
]
const keyExtractor = (item, index) => index.toString();

const renderItem = ({ item }) => (
    
      <View style={styles.comentStyle}>
        <Text style={styles.comment}>
          {item.subtitle}
        </Text>
      </View>
);

const Presentacion = props => {

  return (
    <View style={styles.container}>
      <Header
            backgroundColor='#0abde3'
            centerComponent={{ text: 'Exponiendo', style: { color: '#fff', fontSize:20 } }}
            />
      
      <View style={styles.titleContainer}>
          <Text style={{fontSize:20}}>{props.presentacion.titulo}</Text>
          <Rating
                imageSize={25}
                type="custom"
                readonly
                startingValue={props.presentacion.calificacion}
              />
      </View>

      <View style={styles.commentsContainer}>
        <FlatList
          keyExtractor={keyExtractor}
          data={list}
          renderItem={renderItem}
        />
        <ActionButton
          offsetY={5}
          offsetX={20}
          renderIcon = {(active) => <Icon name="done" color="white"/>}
          buttonColor="rgba(10, 189, 227,1.0)"
          onPress={() => props.navigation.navigate('Calificar')}
        />
      </View>

    </View>
  );
};

export default withNavigation(Presentacion);
