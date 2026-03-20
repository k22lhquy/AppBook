import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'

const SafeScreen = ({ children }) => {
    return (
        <SafeAreaProvider>
            {children}
        </SafeAreaProvider>
    )
}

export default SafeScreen