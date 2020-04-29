import React, { useState, useEffect } from 'react';
import {View,Text,StyleSheet, TouchableOpacity, Alert, TouchableHighlight} from 'react-native'
import {Picker} from '@react-native-community/picker'
import axios from 'axios'
const {Item}=Picker
const Formulario = ({moneda,setMoneda,cripto,setCripto,setConsultar}) => {
    
    const [coins,setCoins]=useState([])
    useEffect(()=>{
        const consultarApi=async ()=>{
            const url="https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD"
            const r=await axios.get(url);
            // console.log(r.data.Data);
            setCoins(r.data.Data);
        }
        consultarApi();
    },[])
    const cotizarPrecio=()=>{
        if(moneda.trim()===""||cripto.trim()==="")
        return Alert.alert(
            'Error',
            'Ambos Campos Obligatorios',
            [
                {text:'OK'}
            ]
        )
        // console.log('cotizando');
        setConsultar(true);
    }
    return ( 
        <View>
            <Text style={styles.label}>Moneda</Text>
            <Picker 
            itemStyle={{height:120}}
            selectedValue={moneda}
            onValueChange={e=>setMoneda(e)} >
                <Item label="--Seleccione--" value="" />
                <Item label="Dolar EEUU" value="USD" />
                <Item label="Peso Mexico" value="MXN" />
                <Item label="Euro" value="EUR" />
                <Item label="Libra Esterlina" value="GBP" />
            </Picker>

            <Text style={styles.label}>Criptomoneda</Text>
            <Picker
                selectedValue={cripto}
                onValueChange={e=>setCripto(e)}
                itemStyle={{height:120}}
            >
                <Item label="--Seleccione--" value="" />
                {coins.map(({CoinInfo})=>{
                    // console.log(CoinInfo)
                   return  <Item  key={CoinInfo.Id} label={CoinInfo.FullName} value={CoinInfo.Name}  />
                })}
            </Picker>
            <TouchableOpacity style={styles.btnCotizar}  onPress={()=>cotizarPrecio("Aqui")}>
                <Text style={styles.textoCotizar}  >Cotizar</Text>
            </TouchableOpacity>

        </View>
     );
}
const styles=StyleSheet.create({
    label:{
        fontFamily:'Lato-Black',
        textTransform:'uppercase',
        fontSize:22,
        marginVertical:20
    },
    btnCotizar:{
        backgroundColor:"#5e49e2",
        padding:10,
        marginTop:20
    },
    textoCotizar:{
        color:'#fff',
        fontSize:18,
        fontFamily:'Lato-Black',
        textTransform:'uppercase',
        textAlign:'center'
    }
})
 
export default Formulario;