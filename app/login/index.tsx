import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Link } from "expo-router";

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Simulação de login
    if (email === "user@example.com" && password === "password123") {
      Alert.alert("Login bem-sucedido!");
    } else {
      Alert.alert("Credenciais inválidas!");
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", textAlign: "center" }}>
        Login
      </Text>

      <TextInput
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        style={{
          borderWidth: 1,
          padding: 10,
          marginVertical: 10,
          borderRadius: 5,
        }}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{
          borderWidth: 1,
          padding: 10,
          marginVertical: 10,
          borderRadius: 5,
        }}
      />

      <TouchableOpacity
        onPress={handleLogin}
        style={{
          backgroundColor: "#007bff",
          padding: 15,
          borderRadius: 5,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "bold" }}>Entrar</Text>
      </TouchableOpacity>

      <Link href="/forgot_password">
        <TouchableOpacity
          // onPress={() => navigation.navigate("ForgotPasswordScreen")}
          style={{ marginTop: 15, alignSelf: "center" }}
        >
          <Text style={{ color: "#007bff" }}>Esqueceu a senha?</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

export default LoginScreen;
