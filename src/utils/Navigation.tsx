import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {Feather} from '@expo/vector-icons'
import HomeScreen from "../views/HomeScreen"
import LoginScreen from "../views/users/LoginScreen"
import RegisterScreen from "../views/users/RegisterScreen"
import ForgotPasswordScreen from "../views/users/ForgotPasswordScreen"
import ProfileScreen from "../views/users/ProfileScreen"
import ProfileUpdateScreen from "../views/users/ProfileUpdateScreen"
import PostScreen from "../views/PostScreen"

const Stack = createStackNavigator()

export const AuthRoutes = () => {
    return (
        <Stack.Navigator initialRouteName="Sign in">
            <Stack.Screen
                name="Sign in"
                component={LoginScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="Sign up"
                component={RegisterScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="Forgot your password"
                component={ForgotPasswordScreen}
                options={{headerShown: false}}
            />
        </Stack.Navigator>
    )
}

const Tab = createBottomTabNavigator()

const HomeRoutes = () => {
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="Profile"
                component={ProfileScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="Post"
                component={PostScreen}
                options={{headerShown: false}}
            />
        </Stack.Navigator>
    )
}

const ProfileRoutes = () => {
    return (
        <Stack.Navigator initialRouteName="Profile">
            <Stack.Screen
                name="Profile"
                component={ProfileScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="Update profile"
                component={ProfileUpdateScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="Post"
                component={PostScreen}
                options={{headerShown: false}}
            />
        </Stack.Navigator>
    )
}


export const AppRoutes = () => {
    return (
        <Tab.Navigator
            screenOptions={({route}) => ({
                tabBarIcon: ({color, size}) => {
                    let iconName = ''

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
            <Tab.Screen name="Home" component={HomeRoutes}/>
            <Tab.Screen name="Profile" component={ProfileRoutes}/>
        </Tab.Navigator>
    )
}
