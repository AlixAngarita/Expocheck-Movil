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
            <Nav id ={props.navigation.getParam('id')}/>
        </View>
    )
}

export default withNavigation(EsyCheck)