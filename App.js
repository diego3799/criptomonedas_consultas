/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  ActivityIndicator
} from 'react-native';
import Header from './components/Header';
import Formulario from './components/Formulario';
import axios from 'axios';
import Cotizacion from './components/Cotizacion';



const App=() => {
  const [moneda,setMoneda]=useState('');
  const [cripto,setCripto]=useState('');
  const [consultar,setConsultar]=useState(false);
  const [resultado,setResultado]=useState({})
  const [cargando,setCargando]=useState(false)
  // console.log(consultar)
  useEffect(()=>{
    
    if(consultar){
      const url=`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cripto}&tsyms=${moneda}`;
      const consultarAPI=async()=>{
        setCargando(true)
        const r=await axios.get(url);
        setTimeout(()=>{
          setResultado(r.data.DISPLAY[cripto][moneda]);
          setConsultar(false);
          setCargando(false)
        },3000);
        
      }
      consultarAPI()
    }
  },[consultar]);
  return (
    <>
      <Header/>
      <Image
      style={styles.imagen}
        source={require('./assets/img/cryptomonedas.png')}
      />
      <View style={styles.contenido} >
        <Formulario setConsultar={setConsultar} moneda={moneda} setMoneda={setMoneda} cripto={cripto} setCripto={setCripto} />
      </View>
      {cargando?
      <ActivityIndicator size="large" color="#5e49e2"/>
      :<Cotizacion resultado={resultado} />
      }
    </>
  );
};

const styles = StyleSheet.create({
  imagen:{
    width:'100%',
    height:150,
    marginHorizontal:'2.5%'

  },
  contenido:{
    marginHorizontal:'2.5%'
  }
});

export default App;
