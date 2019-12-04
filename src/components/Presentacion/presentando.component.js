import React, { useState } from "react";
import ActionButton from 'react-native-action-button';
import { withNavigation } from 'react-navigation';
import {
  View,
  StyleSheet,
  FlatList
} from "react-native";
import { Rating, AirbnbRating, withBadge, Icon, Input, Overlay, ListItem, Text, Card} from "react-native-elements";


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  containerCardIcons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
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
  const [isVisible, setisVisible] = useState(false);

  return (
    <View style={styles.container}>
      
      <Card
        title={props.presentacion.titulo}
        image={{
          uri:
            "https://www.inovex.de/blog/wp-content/uploads/2018/03/react-native.png"
        }}
      >
        <View style={styles.containerCardIcons}>
          <Rating
                imageSize={25}
                type="custom"
                readonly
                startingValue={props.presentacion.calificacion}
              />
        </View>
      </Card>

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
