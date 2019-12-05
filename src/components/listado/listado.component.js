import React from "react";
import { View, FlatList, StyleSheet, TouchableHighlight} from "react-native";
import { ListItem } from 'react-native-elements'
import { Rating, Avatar } from 'react-native-elements';
import { withNavigation } from 'react-navigation';

const styles = StyleSheet.create({
    presentacionContainer:{
        flexDirection:'row',
        marginLeft:0
    }
})


const keyExtractor = (item, index) => index.toString()

const renderItem = ({ item }, props) => (
    <TouchableHighlight onPress={()=> console.log('Press')}>
        <ListItem
        title={item.name}
        subtitle={
        <View style={styles.presentacionContainer}>
            <Rating onFinishRating={this.ratingCompleted} 
                    imageSize={10} readonly startingValue={item.calification} />
        </View>}
        bottomDivider
        />
    </TouchableHighlight>
  )
  
const Listado = props => {

    return (
        <View style={{flex:1}}>
            <FlatList
            keyExtractor={keyExtractor}
            data={props.listado}
            renderItem={(item) => renderItem(item,props)}
            />
        </View>
    )
}

export default withNavigation(Listado)