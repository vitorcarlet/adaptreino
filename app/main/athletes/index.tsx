"use client";

import { useState, useEffect } from "react";
import { View, ScrollView } from "react-native";
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

// Athlete interface
interface Athlete {
  id: string;
  name: string;
  age: number;
  email: string;
  phone: string;
  status: "active" | "inactive";
}

// Mock data
const mockAthletes: Athlete[] = [
  {
    id: "1",
    name: "John Doe",
    age: 28,
    email: "john@example.com",
    phone: "(123) 456-7890",
    status: "active",
  },
  {
    id: "2",
    name: "Jane Smith",
    age: 24,
    email: "jane@example.com",
    phone: "(987) 654-3210",
    status: "active",
  },
  {
    id: "3",
    name: "Mike Johnson",
    age: 32,
    email: "mike@example.com",
    phone: "(555) 123-4567",
    status: "inactive",
  },
];

const AthletesPage = () => {
  const [athletes, setAthletes] = useState<Athlete[]>(mockAthletes);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingAthlete, setEditingAthlete] = useState<Athlete | null>(null);
  const [formValues, setFormValues] = useState<Partial<Athlete>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
  const [athleteToDelete, setAthleteToDelete] = useState<string | null>(null);

  const handleAdd = () => {
    setEditingAthlete(null);
    setFormValues({});
    setErrors({});
    setIsModalVisible(true);
  };

  const handleEdit = (athlete: Athlete) => {
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
                  <Button mode="text" onPress={() => handleEdit(athlete)}>
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
          <Modal
            visible={isModalVisible}
            onDismiss={() => setIsModalVisible(false)}
            contentContainerStyle={{
              backgroundColor: "white",
              padding: 20,
              margin: 20,
            }}
          >
            <Text variant="headlineMedium">
              {editingAthlete ? "Edit Athlete" : "Add Athlete"}
            </Text>

            <TextInput
              label="Name"
              value={formValues.name || ""}
              onChangeText={(text) => handleFormChange("name", text)}
              error={!!errors.name}
              style={{ marginTop: 10 }}
            />
            {errors.name && <HelperText type="error">{errors.name}</HelperText>}

            <TextInput
              label="Age"
              value={formValues.age?.toString() || ""}
              onChangeText={(text) =>
                handleFormChange("age", parseInt(text) || "")
              }
              keyboardType="numeric"
              error={!!errors.age}
              style={{ marginTop: 10 }}
            />
            {errors.age && <HelperText type="error">{errors.age}</HelperText>}

            <TextInput
              label="Email"
              value={formValues.email || ""}
              onChangeText={(text) => handleFormChange("email", text)}
              error={!!errors.email}
              style={{ marginTop: 10 }}
            />
            {errors.email && (
              <HelperText type="error">{errors.email}</HelperText>
            )}

            <TextInput
              label="Phone"
              value={formValues.phone || ""}
              onChangeText={(text) => handleFormChange("phone", text)}
              error={!!errors.phone}
              style={{ marginTop: 10 }}
            />
            {errors.phone && (
              <HelperText type="error">{errors.phone}</HelperText>
            )}

            <Menu.Item
              title={
                formValues.status?.charAt(0).toUpperCase() +
                  (formValues.status?.slice(1) || "") || "Select Status"
              }
              onPress={() => {
                /* Show dropdown menu for status */
              }}
              style={{ marginTop: 10 }}
            />
            {errors.status && (
              <HelperText type="error">{errors.status}</HelperText>
            )}

            <View
              style={{
                flexDirection: "row",
                marginTop: 20,
                justifyContent: "flex-end",
              }}
            >
              <Button
                onPress={() => setIsModalVisible(false)}
                style={{ marginRight: 10 }}
              >
                Cancel
              </Button>
              <Button mode="contained" onPress={handleSave}>
                Save
              </Button>
            </View>
          </Modal>

          <Dialog
            visible={deleteConfirmVisible}
            onDismiss={() => setDeleteConfirmVisible(false)}
          >
            <Dialog.Title>Delete Athlete</Dialog.Title>
            <Dialog.Content>
              <Paragraph>
                Are you sure you want to delete this athlete?
              </Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => setDeleteConfirmVisible(false)}>
                Cancel
              </Button>
              <Button onPress={confirmDelete}>Delete</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </Surface>
    </PaperProvider>
  );
};

export default AthletesPage;
