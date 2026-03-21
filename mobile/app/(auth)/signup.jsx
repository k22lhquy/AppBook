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
  ScrollView,
} from "react-native";
import useAuthStore from "../../store/useAuthStore";

export default function Signup({ navigation }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const { register, isLoading, error, clearError } = useAuthStore();

  const isFormValid =
    username.length >= 3 &&
    email.includes("@") &&
    password.length >= 6 &&
    password === confirmPassword;

  const handleRegister = async () => {
    if (!isFormValid) return;
    const result = await register({ username, email, password });
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
      <View className="absolute w-[250px] h-[250px] rounded-full bg-[#C8A96E1A] top-[-60px] left-[-60px]" />
      <View className="absolute w-[180px] h-[180px] rounded-full bg-[#C8A96E0D] bottom-[80px] right-[-40px]" />

      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        className="px-7"
      >
        {/* Header */}
        <View className="items-center mb-8 mt-12">
          <View
            className="w-[64px] h-[64px] rounded-[18px] bg-[#C8A96E] justify-center items-center mb-4"
            style={{
              elevation: 10,
              shadowColor: "#C8A96E",
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.4,
              shadowRadius: 16,
            }}
          >
            <Text className="text-[28px]">📚</Text>
          </View>
          <Text className="text-[26px] font-bold text-[#F5F0E8] tracking-widest mb-1">
            BookShelf
          </Text>
          <Text className="text-sm text-[#666] tracking-wide">
            Tạo tài khoản mới
          </Text>
        </View>

        {/* Form */}
        <View className="gap-4 mb-8">

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

          {/* Username */}
          <View className="gap-2">
            <Text className="text-[#999] text-[13px] font-medium tracking-wide ml-1">
              Tên người dùng
            </Text>
            <View className={`flex-row items-center bg-[#1A1A1A] border rounded-[14px] px-3.5 h-[52px] gap-2.5 ${
              username.length > 0 && username.length < 3
                ? "border-[#FF444466]"
                : "border-[#2A2A2A]"
            }`}>
              <Text className="text-base">👤</Text>
              <TextInput
                className="flex-1 text-[#F5F0E8] text-[15px]"
                placeholder="ít nhất 3 ký tự"
                placeholderTextColor="#555"
                value={username}
                onChangeText={(t) => { clearError(); setUsername(t); }}
                autoCapitalize="none"
                autoComplete="username"
              />
              {username.length >= 3 && (
                <Text className="text-sm">✅</Text>
              )}
            </View>
          </View>

          {/* Email */}
          <View className="gap-2">
            <Text className="text-[#999] text-[13px] font-medium tracking-wide ml-1">
              Email
            </Text>
            <View className={`flex-row items-center bg-[#1A1A1A] border rounded-[14px] px-3.5 h-[52px] gap-2.5 ${
              email.length > 0 && !email.includes("@")
                ? "border-[#FF444466]"
                : "border-[#2A2A2A]"
            }`}>
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
              {email.includes("@") && (
                <Text className="text-sm">✅</Text>
              )}
            </View>
          </View>

          {/* Password */}
          <View className="gap-2">
            <Text className="text-[#999] text-[13px] font-medium tracking-wide ml-1">
              Mật khẩu
            </Text>
            <View className={`flex-row items-center bg-[#1A1A1A] border rounded-[14px] px-3.5 h-[52px] gap-2.5 ${
              password.length > 0 && password.length < 6
                ? "border-[#FF444466]"
                : "border-[#2A2A2A]"
            }`}>
              <Text className="text-base">🔒</Text>
              <TextInput
                className="flex-1 text-[#F5F0E8] text-[15px]"
                placeholder="ít nhất 6 ký tự"
                placeholderTextColor="#555"
                value={password}
                onChangeText={(t) => { clearError(); setPassword(t); }}
                secureTextEntry={!showPassword}
                autoComplete="new-password"
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)} className="p-1">
                <Text className="text-base">{showPassword ? "🙈" : "👁️"}</Text>
              </TouchableOpacity>
            </View>
            {/* Password strength bar */}
            {password.length > 0 && (
              <View className="flex-row gap-1 mt-1 ml-1">
                {[1, 2, 3].map((i) => (
                  <View
                    key={i}
                    className="h-[3px] flex-1 rounded-full"
                    style={{
                      backgroundColor:
                        password.length < 6
                          ? i === 1 ? "#FF6B6B" : "#2A2A2A"
                          : password.length < 10
                          ? i <= 2 ? "#C8A96E" : "#2A2A2A"
                          : "#4CAF50",
                    }}
                  />
                ))}
              </View>
            )}
          </View>

          {/* Confirm Password */}
          <View className="gap-2">
            <Text className="text-[#999] text-[13px] font-medium tracking-wide ml-1">
              Xác nhận mật khẩu
            </Text>
            <View className={`flex-row items-center bg-[#1A1A1A] border rounded-[14px] px-3.5 h-[52px] gap-2.5 ${
              confirmPassword.length > 0 && confirmPassword !== password
                ? "border-[#FF444466]"
                : "border-[#2A2A2A]"
            }`}>
              <Text className="text-base">🔑</Text>
              <TextInput
                className="flex-1 text-[#F5F0E8] text-[15px]"
                placeholder="nhập lại mật khẩu"
                placeholderTextColor="#555"
                value={confirmPassword}
                onChangeText={(t) => { clearError(); setConfirmPassword(t); }}
                secureTextEntry={!showConfirm}
                autoComplete="new-password"
              />
              <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)} className="p-1">
                <Text className="text-base">{showConfirm ? "🙈" : "👁️"}</Text>
              </TouchableOpacity>
            </View>
            {confirmPassword.length > 0 && confirmPassword !== password && (
              <Text className="text-[#FF6B6B] text-xs ml-1">Mật khẩu không khớp</Text>
            )}
          </View>

          {/* Submit */}
          <TouchableOpacity
            className={`rounded-[14px] h-[52px] justify-center items-center mt-2 ${
              !isFormValid || isLoading ? "opacity-40" : "opacity-100"
            }`}
            style={{
              backgroundColor: "#C8A96E",
              elevation: 8,
              shadowColor: "#C8A96E",
              shadowOffset: { width: 0, height: 6 },
              shadowOpacity: !isFormValid || isLoading ? 0 : 0.35,
              shadowRadius: 12,
            }}
            onPress={handleRegister}
            disabled={!isFormValid || isLoading}
            activeOpacity={0.8}
          >
            {isLoading ? (
              <ActivityIndicator color="#0F0F0F" />
            ) : (
              <Text className="text-[#0F0F0F] text-base font-bold tracking-wide">
                Đăng ký
              </Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View className="flex-row justify-center mb-10">
          <Text className="text-[#555] text-sm">Đã có tài khoản? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("signup")}>
            <Text className="text-[#C8A96E] text-sm font-semibold">Đăng nhập</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
