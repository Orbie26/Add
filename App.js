import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, CheckBox } from 'react-native';
import Svg, {Circle, Line, Polygon, Rect} from 'react-native-svg'

export default function App() {

  const [x, setX] = useState();
  const [y, setY] = useState();
  const [error, setError] = useState('');
  const [result, setResult] = useState('');
  const [sum, setSum] = useState();

  function pointsCalc(n) {
    var s = ""
    const angle = 2 * Math.PI / n;
    for (var i = 0; i < n; i++){
      s = s.concat(100 + 100 * Math.sin(i * angle));
      s = s.concat(',')
      s = s.concat(100 + 100 * Math.cos(i * angle));
      s = s.concat(' ');
    }
    return s;
  }

  function validateValues() {
    setError('');
    setResult('');
    setSum('');
    if (!x || !y){
      setError('Please ensure an input is provided for both input fields')
    }
    else if (isNaN(x) || isNaN(y)){
      setError('Please ensure the input is a number')
    }
    else if ( x<0 || x>10 || y<0 || y>10 ) {
      setError('Please ensure the input is a number between 0 and 10')
    }
    else {
      setSum(pointsCalc(+x + +y));
      setResult(`${x} + ${y} = ${+x + +y}`);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}> Please input two numbers between 0 and 10: </Text>
      <View style={styles.row}>
      <TextInput 
                    style={styles.search}
                    placeholder="X"
                    onChangeText={(value) => {
                        setX(value)
                        }
                    }
                    value={x}
                />
      <Text style={styles.text2}> + </Text>
      <TextInput 
              style={styles.search}
              placeholder="Y"
              onChangeText={(value) => {
                  setY(value)
                  }
              }
              value={y}
          />
      </View>
      <TouchableOpacity
                style={styles.btn}
                onPress={() => {validateValues()}}
                >
                    <Text style={styles.text3}>Calculate</Text>
      </TouchableOpacity>
      <Text style={styles.errorT}> {error} </Text>
      <Svg height="200" width="200">
            <Polygon
              points={sum}
              fill="blue"
            />
      </Svg>
      <Text style={styles.result}> {result} </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',
    marginTop: 100
  },
  errorT: {
    fontSize: 16,
    color: 'red',
    fontWeight: '700',
    padding: 10,
    marginBottom: 0,
  },
  text3: {
    fontSize: 20,
    color: 'white',
    fontWeight: '400'
  },
  result: {
    fontSize: 25,
    fontWeight: '700',
    marginTop: 25
  },
  search: {
    fontSize: 18,
    marginHorizontal: 10,
    fontWeight: '600',
    textAlign: 'center',
    borderWidth: 1,
    height: 75,
    width: 75,
    borderRadius: 10
  },
  text: {
    padding: 20,
    fontSize: 18,
    fontWeight: '700'
  },
  text2: {
    fontSize: 40,
    fontWeight: '500',
    alignSelf: 'center'
  },  
  row: {
    flexDirection: 'row'
  },
  btn: {
    marginTop: 20,
    backgroundColor: '#4CAF50',
    width: 300,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
}
});
