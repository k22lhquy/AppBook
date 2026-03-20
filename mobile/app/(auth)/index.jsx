import { View, Text } from 'react-native'
import React from 'react'

const Login = () => {
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [showPassword, setShowPassword] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)

  return (
    <View>
      <Text>Login Screen</Text>
    </View>
  )
}

export default Login