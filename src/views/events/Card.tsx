import React, {useCallback, useState} from "react";
import {Image, SafeAreaView, Text, View, ScrollView, TouchableOpacity} from "react-native";
import {Button, Card} from 'react-native-paper';
import {styles, stylesEvent} from "../../assets/Styles";

export default function CardEvent() {
    return (
        <SafeAreaView style={stylesEvent.card}>
            <ScrollView>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        alert('Mettre la redirection ?')
                    }}
                >
                    <Card style={{marginBottom: 15}}>
                        <View style={{borderRadius: 5, overflow: "hidden"}}>
                            <View>
                                <Image
                                    source={{uri: 'https://images.japan-experience.com/guide-japon/15015/s380x280/cosumit1.jpg'}}
                                    style={{
                                        height: 200,
                                        width: 400
                                    }}
                                />
                            </View>
                        </View>
                        <View style={stylesEvent.cardContent}>
                            <Text style={stylesEvent.cardTitle}>Titre de l'évènement</Text>
                            <Text style={stylesEvent.cardDate}>Mardi 3 mai 2021 A 18H30</Text>
                            <Text style={stylesEvent.cardDescription}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sit amet nibh interdum, hendrerit enim et, pretium est. Donec congue tincidunt risus, egestas consequat orci sollicitudin vitae. Sed sit amet.</Text>
                            <View style={{flexDirection: 'row'}}>
                                <Button style={stylesEvent.cardButton}
                                        mode="contained"
                                        color={'#273c75'}
                                        dark={true}
                                        icon={"plus"}
                                        contentStyle={styles.buttonContent}
                                        onPress={() => {
                                            alert('TODO: Add event')
                                        }}
                                >J'y participe</Button>
                                <Button style={stylesEvent.cardButton}
                                        mode="contained"
                                        color={'#273c75'}
                                        dark={true}
                                        icon={"share"}
                                        contentStyle={styles.buttonContent}
                                        onPress={() => {
                                            alert('TODO: Add share')
                                        }}
                                >Partager</Button>
                            </View>
                            <Text style={stylesEvent.cardFriends}> 10 amis y participent</Text>
                        </View>
                    </Card>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    )
}

