import React from 'react';
import { withNavigation } from 'react-navigation';
import { View, StyleSheet} from 'react-native';
import Nav from '../Nav/nav.component'

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    content:{
    }
})
const EsyCheck  = props =>{
    return(
        <View style={styles.container}>
            <Nav jornada ={props.jornada}/>
        </View>
    )
}

export default withNavigation(EsyCheck)