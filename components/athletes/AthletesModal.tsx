import React, { useState } from "react";
import { View } from "react-native";
import {
  Button,
  Modal,
  TextInput,
  Text,
  HelperText,
  Dialog,
  Paragraph,
  Menu,
  List,
} from "react-native-paper";
import ListAccordion from "react-native-paper/lib/typescript/components/List/ListAccordion";

interface AthletesModalProps {
  isModalVisible: boolean;
  setIsModalVisible: (value: boolean) => void;
  editingAthlete: Athlete | null;
  formValues: Partial<Athlete>;
  errors: Record<string, string>;
  handleFormChange: (field: string, value: any) => void;
  handleSave: () => void;
  deleteConfirmVisible: boolean;
  setDeleteConfirmVisible: (value: boolean) => void;
  confirmDelete: () => void;
}

export const AthletesModal = ({
  isModalVisible,
  setIsModalVisible,
  editingAthlete,
  formValues,
  errors,
  handleFormChange,
  handleSave,
  deleteConfirmVisible,
  setDeleteConfirmVisible,
  confirmDelete,
}: AthletesModalProps) => {
  const [statusExpanded, setStatusExpanded] = useState(false);

  return (
    <>
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
          onChangeText={(text) => handleFormChange("age", parseInt(text) || "")}
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
        {errors.email && <HelperText type="error">{errors.email}</HelperText>}

        <TextInput
          label="Phone"
          value={formValues.phone || ""}
          onChangeText={(text) => handleFormChange("phone", text)}
          error={!!errors.phone}
          style={{ marginTop: 10 }}
        />
        {errors.phone && <HelperText type="error">{errors.phone}</HelperText>}

        {/* <Menu.Item
          title={
            formValues.status?.charAt(0).toUpperCase() +
              (formValues.status?.slice(1) || "") || "Select Status"
          }
          onPress={() => {
            Show dropdown menu for status 
          }}
          style={{ marginTop: 10 }}
        /> 
        */}

        <List.Section style={{ marginTop: 10 }}>
          <List.Accordion
            title="Select Status"
            expanded={statusExpanded}
            onPress={() => setStatusExpanded(!statusExpanded)}
          >
            <List.Item
              title="Active"
              onPress={() => handleFormChange("status", "active")}
              left={(props) => (
                <List.Icon
                  {...props}
                  icon={formValues.status === "active" ? "check" : "cancel"}
                />
              )}
            />
            <List.Item
              title="Inactive"
              onPress={() => handleFormChange("status", "inactive")}
              left={(props) => (
                <List.Icon
                  {...props}
                  icon={formValues.status === "inactive" ? "check" : "cancel"}
                />
              )}
            />
          </List.Accordion>
        </List.Section>
        {errors.status && <HelperText type="error">{errors.status}</HelperText>}

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
          <Paragraph>Are you sure you want to delete this athlete?</Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => setDeleteConfirmVisible(false)}>Cancel</Button>
          <Button onPress={confirmDelete}>Delete</Button>
        </Dialog.Actions>
      </Dialog>
    </>
  );
};
