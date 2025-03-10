import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const DrawerMenu = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Menu</Text>

      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.menuText}>🏠 Dashboard</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => alert("CRUD de Atletas")}
      >
        <Text style={styles.menuText}>🏃‍♂️ Atletas</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => alert("CRUD de Treinos")}
      >
        <Text style={styles.menuText}>📅 Treinos</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => alert("Modelos de Treino")}
      >
        <Text style={styles.menuText}>📝 Modelos de Treino</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => alert("Relatórios")}
      >
        <Text style={styles.menuText}>📊 Relatórios</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => alert("Configurações")}
      >
        <Text style={styles.menuText}>⚙️ Configurações</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEE",
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  menuItem: {
    padding: 15,
    backgroundColor: "#DDD",
    borderRadius: 8,
    marginBottom: 10,
  },
  menuText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default DrawerMenu;
