import React from 'react';
import { StyleSheet, Text, Platform } from 'react-native'

const Header = () => {
    return ( 
        <Text style={styles.encabezado}  >Criptomonedas</Text>
     );
}

const styles=StyleSheet.create({
    encabezado:{
        paddingTop:Platform.OS==="ios"?50:10,
        fontFamily:'Lato-Black',
        backgroundColor:"#5e49e2",
        paddingBottom:10,
        textAlign:'center',
        textTransform:'uppercase',
        fontSize:20,
        color:'#fff',
        marginBottom:30
    }
})

export default Header;