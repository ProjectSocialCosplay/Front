import React from 'react'
import {NavigationContainer} from "@react-navigation/native"
import {createStackNavigator} from '@react-navigation/stack'
import {AuthRoutes, AppRoutes} from "./src/utils/Navigation";
import SplashScreen from "./src/views/SplashScreen";
import {LogBox, StatusBar} from "react-native";
LogBox.ignoreAllLogs(true)
const Stack = createStackNavigator()

class App extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            isLogged: false
        }
    }

    render() {
        return (
            <>
                <StatusBar hidden={false} barStyle={'dark-content'}/>
                <NavigationContainer>
                    <Stack.Navigator initialRouteName="SplashScreen">
                        <Stack.Screen
                            name="SplashScreen"
                            component={SplashScreen}
                            options={{headerShown: false}}
                        />
                        <Stack.Screen
                            name="AuthRoutes"
                            component={AuthRoutes}
                            options={{headerShown: false}}
                        />
                        <Stack.Screen
                            name="AppRoutes"
                            component={AppRoutes}
                            options={{headerShown: false}}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            </>
        )
    }
}

export default App
