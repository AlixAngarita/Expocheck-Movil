import React from "react";
import { View, FlatList, StyleSheet,  Text, ActivityIndicator} from "react-native";
import { ListItem } from 'react-native-elements'
import { Rating, Header } from 'react-native-elements';
import { withNavigation } from 'react-navigation';

const styles = StyleSheet.create({
    presentacionContainer:{
        flexDirection:'row',
        marginLeft:0
    },
    loading:{
        flex:1,
        flexDirection:'column', 
        alignItems:'center', 
        justifyContent:'center'
    }
})


const keyExtractor = (item, index) => index.toString()

const renderItem = ({ item }, props) => (
        <ListItem
            onPress={()=> props.navigation.push('Presentación',{presentacion:item, id:props.id, fechaInicio:props.fechaInicio, fechaFinaliza:props.fechaFinaliza})}
            title={<Text style={{fontSize:17}}>{item.titulo}</Text>}
            subtitle={
            <View style={styles.presentacionContainer}>
                <Rating onFinishRating={this.ratingCompleted} 
                        imageSize={20} readonly startingValue={item.calificacion.length > 0 ? (item.calificacion.reduce((a, b) => a + b, 0))/item.calificacion.length:0} />
            </View>}
            bottomDivider
            chevron
        />
  )
  
const Listado = props => {

    return (
        <View style={{flex:1}}>
            <Header
            backgroundColor='#0abde3'
            centerComponent={{ text: 'Presentaciones', style: { color: '#fff', fontSize:20 } }}
            />
            {
                props.listado.length > 0 && !props.loading? 
                (<FlatList
                    keyExtractor={keyExtractor}
                    data={props.listado}
                    renderItem={(item) => renderItem(item,props)}
                />) :null
            }
            {
                props.loading && props.listado.length == 0 &&
                <View style={styles.loading}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            }
            { !props.loading && props.listado.length == 0  ?
                <View style={{ display:'flex',flex:1, flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                         <Text style={{color:'grey', fontSize:17}}>No se encontraron presentaciones.</Text>
                </View>:null
            }
        </View>
    )
}

export default withNavigation(Listado)