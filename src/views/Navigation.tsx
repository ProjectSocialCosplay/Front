import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {Feather} from '@expo/vector-icons'
import Homepage from "./Homepage"
import Login from "./users/Login"
import Register from "./users/Register"
import ForgotPassword from "./users/ForgotPassword"
import Profile from "./users/Profile"

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

const Tab = createBottomTabNavigator()

export const AppRoutes = () => {
    return (
        <Tab.Navigator
            screenOptions={({route}) => ({
                tabBarIcon: ({color, size}) => {
                    let iconName

                    if (route.name === 'Home') {
                        iconName = 'home'
                    } else if (route.name === 'Profile') {
                        iconName = 'user'
                    }

                    return <Feather name={iconName} size={size} color={color}/>
                },
            })}
            tabBarOptions={{
                activeTintColor: 'tomato',
                inactiveTintColor: 'gray',
            }}
        >
            <Tab.Screen name="Home" component={Homepage}/>
            <Tab.Screen name="Profile" component={Profile}/>
        </Tab.Navigator>
    )
}
