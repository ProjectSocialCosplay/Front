import React, {useState} from "react";
import {Image, StyleSheet, Text, View, FlatList, SafeAreaView} from "react-native";
import {Avatar, Card, Title, Paragraph} from 'react-native-paper';
import {styles, stylesEvent} from "../../assets/Styles"
import CardEvent from "./Card";

export default function EventScreen(){
    return (
        <SafeAreaView style={stylesEvent.container}>
            <Text style={stylesEvent.eventTitle}>Évènements</Text>
            <View style={stylesEvent.card}>
                <CardEvent />
            </View>
        </SafeAreaView>
    )
}
