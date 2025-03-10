import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";

const HomeScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Dashboard</Text>

      <ScrollView style={styles.content}>
        <View style={styles.placeholderBox}>
          <Text style={styles.placeholderText}>📅 Treinos Recentes</Text>
        </View>

        <View style={styles.placeholderBox}>
          <Text style={styles.placeholderText}>🏃‍♂️ Lista de Atletas</Text>
        </View>

        <View style={styles.placeholderBox}>
          <Text style={styles.placeholderText}>
            📊 Gráficos de Estatísticas
          </Text>
        </View>

        <View style={styles.placeholderBox}>
          <Text style={styles.placeholderText}>🔔 Notificações</Text>
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => alert("Novo treino!")}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  content: {
    flex: 1,
  },
  placeholderBox: {
    backgroundColor: "#DDD",
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: "center",
  },
  placeholderText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#007bff",
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  fabText: {
    fontSize: 30,
    color: "#FFF",
    fontWeight: "bold",
  },
});

export default HomeScreen;
