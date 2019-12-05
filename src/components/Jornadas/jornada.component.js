import React from 'react'
import {FlatList, TouchableHighlight, View, Alert, StyleSheet, ActivityIndicator} from 'react-native'
import { ListItem, Divider} from 'react-native-elements'
import { withNavigation } from 'react-navigation';

const keyExtractor = (item, index) => index.toString()


const styles = StyleSheet.create({
    titulo:{
       color:'grey',
       textAlign:'center'
    },
    loading:{
        flex:1,
        flexDirection:'column', 
        alignItems:'center', 
        justifyContent:'center'
    }
})
const Jornada = props => {
    return (
        <View style={{flex:1}}>
            {
                props.jornadas.length >0 ?
                <FlatList
                showsVerticalScrollIndicator={false}
                keyExtractor={keyExtractor}
                data={props.jornadas}
                renderItem = {({item}) => 
                <TouchableHighlight  onPress={() => props.navigation.navigate('EasyCheck')}>
                    <ListItem
                        title={item.titulo}
                        subtitle={item.fecha}
                        leftAvatar={{title:item.numero}}
                        chevron
                    />
                </TouchableHighlight >}
                ItemSeparatorComponent={() => <Divider navigation={props.navigation}/>}
                /> :
                <View style={styles.loading}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
                
            }
        </View>
    )
}

export default withNavigation(Jornada)