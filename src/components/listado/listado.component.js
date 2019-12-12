import React from "react";
import { View, FlatList, StyleSheet, TouchableHighlight, Text} from "react-native";
import { ListItem } from 'react-native-elements'
import { Rating, Header } from 'react-native-elements';
import { withNavigation } from 'react-navigation';

const styles = StyleSheet.create({
    presentacionContainer:{
        flexDirection:'row',
        marginLeft:0
    }
})


const keyExtractor = (item, index) => index.toString()

const renderItem = ({ item }, props) => (
    <TouchableHighlight onPress={()=> props.navigation.push('Presentación')}>
        <ListItem
            title={<Text style={{fontSize:17}}>{item.titulo}</Text>}
            subtitle={
            <View style={styles.presentacionContainer}>
                <Rating onFinishRating={this.ratingCompleted} 
                        imageSize={20} readonly startingValue={item.calificacion.length > 0 ? (item.calificacion.reduce((a, b) => a + b, 0))/item.calificacion.length:0} />
            </View>}
            bottomDivider
            chevron
        />
    </TouchableHighlight>
  )
  
const Listado = props => {

    return (
        <View style={{flex:1}}>
            <Header
            backgroundColor='#0abde3'
            centerComponent={{ text: 'Presentaciones', style: { color: '#fff', fontSize:20 } }}
            />
            <FlatList
            keyExtractor={keyExtractor}
            data={props.listado}
            renderItem={(item) => renderItem(item,props)}
            />
        </View>
    )
}

export default withNavigation(Listado)