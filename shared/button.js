import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

export default function FlatButton({ text, icon, onPress }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.button}>
                <FontAwesome5 name={icon} size={18} color="white" style={styles.icon} />
                <Text style={styles.buttonText}>{ text }</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 6,
        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: 'rgb(50, 138, 214)',
        flexDirection: 'row',
        width: 120,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        color: 'white',
        fontFamily: 'din-regular',
        fontSize: 20,
        textAlign: 'center',
        marginRight: 6
    },
    icon: {
        marginRight: 6,
    }
})