import React from 'react'
import {View, Text, SafeAreaView, ScrollView} from 'react-native'
import {styles, stylesTerms} from '../../assets/Styles'
import {BackButton} from "../../components/BackButton";

const TermsScreen = ({navigation}: { navigation: any }) => {
    const inputs: any = {}

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <BackButton/>
                <View style={{...styles.container, marginTop: 16, alignItems: 'center'}}>
                    <Text style={{fontSize: 24}}>Terms of service</Text>
                    <View style={{...stylesTerms.container}}>
                        <Text style={{...stylesTerms.titleTerms}}>Welcome on Cosplay !</Text>
                        <Text style={{...stylesTerms.textTerms}}>Cosplay develops technologies and services that allow
                            people to connect and build communities.
                        </Text>
                        <Text style={{...stylesTerms.textTerms}}>We do not sell your personal data to advertisers and do
                            not share directly identifiable
                            information (such as your name, email address, or any other contact information) with
                            advertisers unless you have expressly authorized it. </Text>
                        <Text style={{...stylesTerms.titleTerms}}>Data use policy</Text>
                        <Text style={{...stylesTerms.textTerms}}>This policy describes the information we process for the operation of Cosplay</Text>
                        <Text style={{...stylesTerms.textTerms}}>To provide the Cosplay Products, we need to process information about you. The types of information we collect depend on how you use our Products.</Text>
                        <Text style={{...stylesTerms.textTerms}}>We collect the content, communications and other information you provide when you use our Products, including when you create an account, when you create or share content. messages. This may include information present in or about the content you provide (for example, metadata), such as the date a file was created.</Text>
                        <Text style={{...stylesTerms.titleTerms}}>Cookie Policy</Text>
                        <Text style={{...stylesTerms.textTerms}}>Cookies are small pieces of text that are used to store information on web browsers. In particular, cookies are used to store and receive identifiers and other information on devices such as computers or phones. Other technologies, including data we store on your web browser or device, identifiers associated with your device, and other software, are used for similar purposes. In this policy, we refer to all of these technologies by the term “cookies”.
                            We use cookies if you have a Cosplay account.</Text>
                        <Text style={{...stylesTerms.textTerms}}></Text>
                        <Text style={{...stylesTerms.textTerms}}></Text>
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default TermsScreen
