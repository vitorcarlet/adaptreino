import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

const ForgotPasswordScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");

  const handleSendToken = () => {
    // Simulação do envio de token via SMS
    Alert.alert("Token enviado para seu número/email!");
  };

  const handleResetPassword = () => {
    // Simulação de verificação do token
    if (token === "123456") {
      Alert.alert("Token válido! Agora você pode redefinir sua senha.");
      navigation.goBack();
    
    } else {
      Alert.alert("Token inválido! Tente novamente.");
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}>
        Recuperação de Senha
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

      <TouchableOpacity
        onPress={handleSendToken}
        style={{
          backgroundColor: "#007bff",
          padding: 10,
          borderRadius: 5,
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "bold" }}>Enviar Token</Text>
      </TouchableOpacity>

      <TextInput
        placeholder="Digite o Token"
        value={token}
        onChangeText={setToken}
        style={{
          borderWidth: 1,
          padding: 10,
          marginVertical: 10,
          borderRadius: 5,
        }}
        keyboardType="number-pad"
      />

      <TouchableOpacity
        onPress={handleResetPassword}
        style={{
          backgroundColor: "#28a745",
          padding: 15,
          borderRadius: 5,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "bold" }}>Verificar Token</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ForgotPasswordScreen;
