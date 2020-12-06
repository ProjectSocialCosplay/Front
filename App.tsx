import React from 'react'
import {NavigationContainer} from "@react-navigation/native"
import {createStackNavigator} from '@react-navigation/stack'
import {AuthRoutes, AppRoutes} from "./src/views/Navigation";
import SplashScreen from "./src/views/SplashScreen";
import {StatusBar} from "react-native";

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
