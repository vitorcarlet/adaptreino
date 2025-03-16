"use client";
import { useState, useEffect } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import {
  Button,
  DataTable,
  Modal,
  Portal,
  TextInput,
  Text,
  HelperText,
  Appbar,
  Surface,
  Provider as PaperProvider,
  Dialog,
  Paragraph,
  Menu,
} from "react-native-paper";
import { mockAthletes } from "./mocks";
import { AthletesModal } from "./AthletesModal";
import { Athlete } from "@/src/types/types";
import { Image } from "expo-image";

const AthletesCrud = () => {
  const [athletes, setAthletes] = useState<Athlete[]>(mockAthletes);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingAthlete, setEditingAthlete] = useState<Athlete | null>(null);
  const [formValues, setFormValues] = useState<Partial<Athlete>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
  const [athleteToDelete, setAthleteToDelete] = useState<string | null>(null);
  const [saveButtonLoading, setSaveButtonLoading] = useState(false);

  const handleAdd = () => {
    setEditingAthlete(null);
    setFormValues({});
    setErrors({});
    setIsModalVisible(true);
  };

  const handleEdit = (athlete: Athlete) => {
    //{data, success} = await fetch(`/api/athletes/${athlete.id}`);
    setEditingAthlete(athlete);
    setFormValues({ ...athlete });
    setErrors({});
    setIsModalVisible(true);
  };

  const handleDelete = (id: string) => {
    setAthleteToDelete(id);
    setDeleteConfirmVisible(true);
  };

  const confirmDelete = () => {
    if (athleteToDelete) {
      setAthletes(athletes.filter((athlete) => athlete.id !== athleteToDelete));
    }
    setDeleteConfirmVisible(false);
  };

  const handleFormChange = (field: string, value: any) => {
    setFormValues({ ...formValues, [field]: value });

    // Clear error when field is updated
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formValues.name) newErrors.name = "Name is required";
    if (!formValues.age) newErrors.age = "Age is required";
    if (!formValues.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formValues.phone) newErrors.phone = "Phone is required";
    if (!formValues.status) newErrors.status = "Status is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return;

    if (editingAthlete) {
      // Update existing athlete

      setAthletes(
        athletes.map((athlete) =>
          athlete.id === editingAthlete.id
            ? ({ ...athlete, ...formValues } as Athlete)
            : athlete
        )
      );
    } else {
      // Add new athlete
      const newAthlete = {
        id: Date.now().toString(),
        ...formValues,
      } as Athlete;
      setAthletes([...athletes, newAthlete]);
    }

    setIsModalVisible(false);
  };

  return (
    <PaperProvider>
      <Surface style={{ flex: 1, padding: 16 }}>
        <Appbar.Header>
          <Appbar.Content title="Athletes" />
          <Appbar.Action icon="plus" onPress={handleAdd} />
        </Appbar.Header>

        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Photo</DataTable.Title>
            <DataTable.Title>Name</DataTable.Title>
            <DataTable.Title numeric>Age</DataTable.Title>
            <DataTable.Title>Email</DataTable.Title>
            <DataTable.Title>Phone</DataTable.Title>
            <DataTable.Title>Status</DataTable.Title>
            <DataTable.Title>Actions</DataTable.Title>
          </DataTable.Header>

          <ScrollView>
            {athletes.map((athlete) => (
              <DataTable.Row key={athlete.id}>
                <DataTable.Cell
                  style={{
                    flex: 1,
                    width: "10%",
                    padding: 2,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Image
                    style={styles.image}
                    source={require("@assets/images/athlete.webp")}
                    placeholder="test"
                    contentFit="contain"
                    transition={1000}
                  />
                </DataTable.Cell>
                <DataTable.Cell>{athlete.name}</DataTable.Cell>
                <DataTable.Cell numeric>{athlete.age}</DataTable.Cell>
                <DataTable.Cell>{athlete.email}</DataTable.Cell>
                <DataTable.Cell>{athlete.phone}</DataTable.Cell>
                <DataTable.Cell>
                  <Text
                    style={{
                      color: athlete.status === "active" ? "green" : "red",
                    }}
                  >
                    {athlete.status.charAt(0).toUpperCase() +
                      athlete.status.slice(1)}
                  </Text>
                </DataTable.Cell>
                <DataTable.Cell>
                  <Button
                    loading={saveButtonLoading}
                    mode="text"
                    onPress={() => handleEdit(athlete)}
                  >
                    Edit
                  </Button>
                  <Button
                    mode="text"
                    textColor="red"
                    onPress={() => handleDelete(athlete.id)}
                  >
                    Delete
                  </Button>
                </DataTable.Cell>
              </DataTable.Row>
            ))}
          </ScrollView>
        </DataTable>

        <Portal>
          <AthletesModal
            isModalVisible={isModalVisible}
            setIsModalVisible={setIsModalVisible}
            editingAthlete={editingAthlete}
            formValues={formValues}
            errors={errors}
            handleFormChange={handleFormChange}
            handleSave={handleSave}
            deleteConfirmVisible={deleteConfirmVisible}
            setDeleteConfirmVisible={setDeleteConfirmVisible}
            confirmDelete={confirmDelete}
          />
        </Portal>
      </Surface>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    //flex: 1,
    padding: 2,
    width: "50%",
    maxWidth: 45,
    height: "100%",
    borderRadius: 100,
    backgroundColor: "#0553",
  },
});

export default AthletesCrud;
