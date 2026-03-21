import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Pressable,
} from "react-native";
import useAuthStore from "../../store/useAuthStore";
import { useRouter } from "expo-router";

export default function LoginScreen({ navigation }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { login, isLoading, error, clearError } = useAuthStore();

  const handleLogin = async () => {
    if (!email || !password) return;
    const result = await login({ email, password });
    if (result.success) {
      navigation.replace("Home");
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-[#0F0F0F]"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <StatusBar barStyle="light-content" backgroundColor="#0F0F0F" />

      {/* Background decoration */}
      <View className="absolute w-[300px] h-[300px] rounded-full bg-[#C8A96E22] top-[-80px] right-[-80px]" />
      <View className="absolute w-[200px] h-[200px] rounded-full bg-[#C8A96E11] bottom-[100px] left-[-60px]" />

      <View className="flex-1 justify-center px-7">

        {/* Header */}
        <View className="items-center mb-10">
          <View
            className="w-[72px] h-[72px] rounded-[20px] bg-[#C8A96E] justify-center items-center mb-4"
            style={{
              elevation: 10,
              shadowColor: "#C8A96E",
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.4,
              shadowRadius: 16,
            }}
          >
            <Text className="text-[32px]">📚</Text>
          </View>
          <Text className="text-[28px] font-bold text-[#F5F0E8] tracking-widest mb-1">
            BookShelf
          </Text>
          <Text className="text-sm text-[#666] tracking-wide">
            Đăng nhập để tiếp tục
          </Text>
        </View>

        {/* Form */}
        <View className="gap-4">

          {/* Error */}
          {error && (
            <Pressable
              className="flex-row justify-between items-center bg-[#FF444422] border border-[#FF444455] rounded-xl px-3.5 py-2.5"
              onPress={clearError}
            >
              <Text className="text-[#FF6B6B] text-[13px] flex-1">⚠️ {error}</Text>
              <Text className="text-[#FF6B6B] text-xs ml-2">✕</Text>
            </Pressable>
          )}

          {/* Email */}
          <View className="gap-2">
            <Text className="text-[#999] text-[13px] font-medium tracking-wide ml-1">
              Email
            </Text>
            <View className="flex-row items-center bg-[#1A1A1A] border border-[#2A2A2A] rounded-[14px] px-3.5 h-[52px] gap-2.5">
              <Text className="text-base">✉️</Text>
              <TextInput
                className="flex-1 text-[#F5F0E8] text-[15px]"
                placeholder="you@example.com"
                placeholderTextColor="#555"
                value={email}
                onChangeText={(t) => { clearError(); setEmail(t); }}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
              />
            </View>
          </View>

          {/* Password */}
          <View className="gap-2">
            <Text className="text-[#999] text-[13px] font-medium tracking-wide ml-1">
              Mật khẩu
            </Text>
            <View className="flex-row items-center bg-[#1A1A1A] border border-[#2A2A2A] rounded-[14px] px-3.5 h-[52px] gap-2.5">
              <Text className="text-base">🔒</Text>
              <TextInput
                className="flex-1 text-[#F5F0E8] text-[15px]"
                placeholder="••••••••"
                placeholderTextColor="#555"
                value={password}
                onChangeText={(t) => { clearError(); setPassword(t); }}
                secureTextEntry={!showPassword}
                autoComplete="password"
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                className="p-1"
              >
                <Text className="text-base">{showPassword ? "🙈" : "👁️"}</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Submit */}
          <TouchableOpacity
            className={`rounded-[14px] h-[52px] justify-center items-center mt-2 ${!email || !password || isLoading ? "opacity-40" : "opacity-100"
              }`}
            style={{
              backgroundColor: "#C8A96E",
              elevation: 8,
              shadowColor: "#C8A96E",
              shadowOffset: { width: 0, height: 6 },
              shadowOpacity: !email || !password || isLoading ? 0 : 0.35,
              shadowRadius: 12,
            }}
            onPress={handleLogin}
            disabled={!email || !password || isLoading}
            activeOpacity={0.8}
          >
            {isLoading ? (
              <ActivityIndicator color="#0F0F0F" />
            ) : (
              <Text className="text-[#0F0F0F] text-base font-bold tracking-wide">
                Đăng nhập
              </Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View className="flex-row justify-center mt-9">
          <Text className="text-[#555] text-sm">Chưa có tài khoản? </Text>
          <TouchableOpacity onPress={() => router.push("/signup")}>
            <Text className="text-[#C8A96E] text-sm font-semibold">Đăng ký ngay</Text>
          </TouchableOpacity>
        </View>

      </View>
    </KeyboardAvoidingView>
  );
}
