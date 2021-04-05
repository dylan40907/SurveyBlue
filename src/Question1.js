import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { globalStyles, globalVariables } from '../styles/global.js'
import FlatButton from '../shared/button'
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App({ navigation }) {
    
    const storeData = async (value, key) => {
        try {
          await AsyncStorage.setItem(key, value)
        } catch (error) {
          console.log(error)
        }
        console.log('Data Saved')
    }
      
    const getData = async (key) => {
        try {
            return await AsyncStorage.getItem(key)
        } catch(error) {
            console.log(error)
        }
        console.log('Data Retrieved')
    } 

    const [errorStyle, setErrorStyle] = useState({fontWeight: 'bold', marginTop: 10, color: 'red', display: 'none'})

    const pressHandler = async () => {
        if (await getData('month') != 'Select a Month' && globalVariables.day != 'Select a Day' && globalVariables.year != 'Select a Year') {
            navigation.navigate('Question2')
            console.log(await getData('month'))
            // console.log(globalVariables.month, globalVariables.day, globalVariables.year)
            setErrorStyle({fontWeight: 'bold', marginTop: 10, color: 'red', display: 'none'})
        } else {
            setErrorStyle({fontWeight: 'bold', marginTop: 10, color: 'red', display: 'flex'})
        }
    }

    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.titleText}>Date of Birth</Text>
            <Text style={styles.label}>Month</Text>
            <DropDownPicker
                items={[
                    {label: 'January', value: '1'},
                    {label: 'February', value: '2'},
                    {label: 'March', value: '3'},
                    {label: 'April', value: '4'},
                    {label: 'May', value: '5'},
                    {label: 'June', value: '6'},
                    {label: 'July', value: '7'},
                    {label: 'August', value: '8'},
                    {label: 'September', value: '9'},
                    {label: 'October', value: '10'},
                    {label: 'November', value: '11'},
                    {label: 'December', value: '12'},
                ]}
                placeholder={globalVariables.month}
                containerStyle={{height: 40}}
                itemStyle={{
                    justifyContent: 'flex-start'
                }}
                onChangeItem={item => storeData(item.label, 'month')}
                dropDownStyle={{backgroundColor: '#fff', borderColor: 'rgb(197, 206, 214)', borderWidth: 2}}
                zIndex={5000}
                style={{
                    borderColor: 'rgb(197, 206, 214)',
                    borderWidth: 2,
                }}
            />
            <Text style={styles.label}>Day</Text>
            <DropDownPicker
                items={[
                    {label: '1', value: '1'},
                    {label: '2', value: '2'},
                    {label: '3', value: '3'},
                    {label: '4', value: '4'},
                    {label: '5', value: '5'},
                    {label: '6', value: '6'},
                    {label: '7', value: '7'},
                    {label: '8', value: '8'},
                    {label: '9', value: '9'},
                    {label: '10', value: '10'},
                    {label: '11', value: '11'},
                    {label: '12', value: '12'},
                    {label: '13', value: '13'},
                    {label: '14', value: '14'},
                    {label: '15', value: '15'},
                    {label: '16', value: '16'},
                    {label: '17', value: '17'},
                    {label: '18', value: '18'},
                    {label: '19', value: '19'},
                    {label: '20', value: '20'},
                    {label: '21', value: '21'},
                    {label: '22', value: '22'},
                    {label: '23', value: '23'},
                    {label: '24', value: '24'},
                    {label: '25', value: '25'},
                    {label: '26', value: '26'},
                    {label: '27', value: '27'},
                    {label: '28', value: '28'},
                    {label: '29', value: '29'},
                    {label: '30', value: '30'},
                    {label: '31', value: '31'},
                ]}
                placeholder={globalVariables.day}
                containerStyle={{height: 40}}
                itemStyle={{
                    justifyContent: 'flex-start'
                }}
                onChangeItem={item => globalVariables.day=item.label}
                dropDownStyle={{backgroundColor: '#fff', borderColor: 'rgb(197, 206, 214)', borderWidth: 2}}
                zIndex={4000}
                style={{
                    borderColor: 'rgb(197, 206, 214)',
                    borderWidth: 2,
                }}
            />
            <Text style={styles.label}>Year</Text>
            <DropDownPicker
                items={[
                    {label: '2021', value: '2021'},
                    {label: '2020', value: '2020'},
                    {label: '2019', value: '2019'},
                    {label: '2018', value: '4'},
                    {label: '2017', value: '5'},
                    {label: '2016', value: '6'},
                    {label: '2015', value: '7'},
                    {label: '2014', value: '8'},
                    {label: '2013', value: '9'},
                    {label: '2012', value: '10'},
                    {label: '2011', value: '11'},
                    {label: '2010', value: '12'},
                    {label: '2009', value: '13'},
                    {label: '2008', value: '14'},
                    {label: '2007', value: '15'},
                    {label: '2006', value: '16'},
                    {label: '2005', value: '17'},
                    {label: '2004', value: '18'},
                    {label: '2003', value: '19'},
                    {label: '2002', value: '20'},
                    {label: '2001', value: '21'},
                    {label: '1999', value: '22'},
                    {label: '1998', value: '23'},
                    {label: '1997', value: '24'},
                    {label: '1996', value: '25'},
                    {label: '1995', value: '26'},
                    {label: '1994', value: '27'},
                    {label: '1993', value: '28'},
                    {label: '1992', value: '29'},
                    {label: '1991', value: '30'},
                    {label: '1990', value: '31'},
                    {label: '1989', value: '31'},
                    {label: '1988', value: '31'},
                    {label: '1987', value: '31'},
                    {label: '1986', value: '31'},
                    {label: '1985', value: '31'},
                    {label: '1984', value: '31'},
                    {label: '1983', value: '31'},
                    {label: '1982', value: '31'},
                    {label: '1981', value: '31'},
                    {label: '1980', value: '31'},
                    {label: '1979', value: '31'},
                    {label: '1978', value: '31'},
                    {label: '1977', value: '31'},
                    {label: '1976', value: '31'},
                    {label: '1975', value: '31'},
                    {label: '1974', value: '31'},
                    {label: '1973', value: '31'},
                    {label: '1972', value: '31'},
                    {label: '1971', value: '31'},
                    {label: '1970', value: '31'},
                    {label: '1969', value: '31'},
                    {label: '1968', value: '31'},
                    {label: '1967', value: '31'},
                    {label: '1966', value: '31'},
                    {label: '1965', value: '31'},
                    {label: '1964', value: '31'},
                    {label: '1963', value: '31'},
                    {label: '1962', value: '31'},
                    {label: '1961', value: '31'},
                    {label: '1960', value: '31'},
                    {label: '1959', value: '31'},
                    {label: '1958', value: '31'},
                    {label: '1957', value: '31'},
                    {label: '1956', value: '31'},
                    {label: '1955', value: '31'},
                    {label: '1954', value: '31'},
                    {label: '1953', value: '31'},
                    {label: '1952', value: '31'},
                    {label: '1951', value: '31'},
                    {label: '1950', value: '31'},
                    {label: '1949', value: '31'},
                    {label: '1948', value: '31'},
                    {label: '1947', value: '31'},
                    {label: '1946', value: '31'},
                    {label: '1945', value: '31'},
                    {label: '1944', value: '31'},
                    {label: '1943', value: '31'},
                    {label: '1942', value: '31'},
                    {label: '1941', value: '31'},
                    {label: '1940', value: '31'},
                    {label: '1939', value: '31'},
                    {label: '1938', value: '31'},
                    {label: '1937', value: '31'},
                    {label: '1936', value: '31'},
                    {label: '1935', value: '31'},
                    {label: '1934', value: '31'},
                    {label: '1933', value: '31'},
                    {label: '1932', value: '31'},
                    {label: '1931', value: '31'},
                    {label: '1930', value: '31'},
                    {label: '1929', value: '31'},
                    {label: '1928', value: '31'},
                    {label: '1927', value: '31'},
                    {label: '1926', value: '31'},
                    {label: '1925', value: '31'},
                    {label: '1924', value: '31'},
                    {label: '1923', value: '31'},
                    {label: '1922', value: '31'},
                    {label: '1921', value: '31'},
                    {label: '1920', value: '31'},
                    {label: '1919', value: '31'},
                    {label: '1918', value: '31'},
                    {label: '1917', value: '31'},
                    {label: '1916', value: '31'},
                    {label: '1915', value: '31'},
                    {label: '1914', value: '31'},
                    {label: '1913', value: '31'},
                    {label: '1912', value: '31'},
                    {label: '1911', value: '31'},
                    {label: '1910', value: '31'},
                    {label: '1909', value: '31'},
                    {label: '1908', value: '31'},
                    {label: '1907', value: '31'},
                    {label: '1906', value: '31'},
                    {label: '1905', value: '31'},
                    {label: '1904', value: '31'},
                    {label: '1903', value: '31'},
                    {label: '1902', value: '31'},
                    {label: '1901', value: '31'},
                    {label: '1900', value: '31'},
                ]}
                placeholder={globalVariables.year}
                containerStyle={{height: 40}}
                itemStyle={{
                    justifyContent: 'flex-start'
                }}
                onChangeItem={item => globalVariables.year=item.label}
                dropDownStyle={{backgroundColor: '#fff', borderColor: 'rgb(197, 206, 214)', borderWidth: 2}}
                zIndex={3000}
                style={{
                    borderColor: 'rgb(197, 206, 214)',
                    borderWidth: 2,
                }}
            />
            <Text style={errorStyle}>Please answer all fields</Text>
            <View style={styles.button}>
                <FlatButton text="Continue" icon="arrow-right" onPress={pressHandler} />
            </View>
            <StatusBar style="auto" />
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
      marginTop: 60,
    },
    label: {
        fontWeight: 'bold',
        marginTop: 10,
    },
    error: {
        fontWeight: 'bold',
        marginTop: 10,
        color: 'red',
        display: 'none'
    }
  });