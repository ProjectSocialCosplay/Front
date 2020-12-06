import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import Homepage from "./Homepage"
import Login from "./users/Login"
import Register from "./users/Register"
import ForgotPassword from "./users/ForgotPassword";

const Stack = createStackNavigator()

export const AuthRoutes = () => {
    return (
        <Stack.Navigator initialRouteName="Sign in">
            <Stack.Screen
                name="Sign in"
                component={Login}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="Sign up"
                component={Register}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="Forgot your password"
                component={ForgotPassword}
                options={{headerShown: false}}
            />
        </Stack.Navigator>
    )
}

export const AppRoutes = () => {
    return (
        <Stack.Navigator initialRouteName="Homepage">
            <Stack.Screen
                name="Homepage"
                component={Homepage}
                options={{headerShown: false}}
            />
        </Stack.Navigator>
    )
}
