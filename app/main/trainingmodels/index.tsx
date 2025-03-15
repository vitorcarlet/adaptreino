import { Sports } from "@/src/types/types";
import { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { router } from "expo-router";
import {
  PaperProvider,
  Surface,
  Appbar,
  DataTable,
  List,
  IconButton,
} from "react-native-paper";

interface TrainingModel {
  id: string;
  name: string;
  sport: Sports;
  description: string;
  status: "active" | "inactive";
}

const mockTrainingModels: TrainingModel[] = [
  {
    id: "1",
    name: "Model 1",
    sport: {
      id: "1",
      name: "Soccer",
    },
    description: "This is the first training model",
    status: "active",
  },
  {
    id: "2",
    name: "Model 2",
    sport: {
      id: "1",
      name: "Soccer",
    },
    description: "This is the second training model",
    status: "active",
  },
  {
    id: "3",
    name: "Model 3",
    sport: {
      id: "2",
      name: "Basketball",
    },
    description: "This is the third training model",
    status: "inactive",
  },
];

const TrainingModelsPage = () => {
  const [trainingModels, setTrainingModels] =
    useState<TrainingModel[]>(mockTrainingModels);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingTrainingModel, setEditingTrainingModel] =
    useState<TrainingModel | null>(null);
  const [formValues, setFormValues] = useState<Partial<TrainingModel>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
  const [trainingModelToDelete, setTrainingModelToDelete] = useState<
    string | null
  >(null);

  const handleAdd = () => {
    setEditingTrainingModel(null);
    setFormValues({});
    setErrors({});
    setIsModalVisible(true);
  };

  const handleEdit = (trainingModel: TrainingModel) => {
    setEditingTrainingModel(trainingModel);
    setFormValues({ ...trainingModel });
    setErrors({});
    setIsModalVisible(true);
  };

  const handleDelete = (id: string) => {
    setTrainingModelToDelete(id);
    setDeleteConfirmVisible(true);
  };

  const handleDeleteConfirm = () => {
    if (trainingModelToDelete) {
      setTrainingModels((prev) =>
        prev.filter((t) => t.id !== trainingModelToDelete)
      );
      setDeleteConfirmVisible(false);
      setTrainingModelToDelete(null);
    }
  };

  const handleClickModel = (id: string) => {
    // In the handleClickModel function:
    router.push({
      pathname: "/main/trainingmodels/[id]",
      params: { id },
    });
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formValues.name) {
      errors.name = "Name is required";
    }
    if (!formValues.sport) {
      errors.sport = "Sport is required";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return;

    if (editingTrainingModel) {
      const updatedTrainingModels = trainingModels.map((t) =>
        t.id === editingTrainingModel.id
          ? { ...editingTrainingModel, ...formValues }
          : t
      );
      setTrainingModels(updatedTrainingModels);
    } else {
      const newTrainingModel: TrainingModel = {
        id: String(trainingModels.length + 1),
        name: formValues.name || "",
        sport: formValues.sport as Sports,
        description: formValues.description || "",
        status: "active",
      };
      setTrainingModels([...trainingModels, newTrainingModel]);

      setIsModalVisible(false);
    }
  };

  return (
    <PaperProvider>
      <Surface style={{ flex: 1, padding: 16 }}>
        <Appbar.Header>
          <Appbar.Content title="Modelos de Treinamento" />
          <Appbar.Action icon="plus" onPress={handleAdd} />
        </Appbar.Header>
      </Surface>

      <ScrollView>
        <List.Section title="Modelos de Treinamento">
          {trainingModels.map((trainingModel) => (
            <List.Item
              key={trainingModel.id}
              title={trainingModel.name}
              description={trainingModel.description}
              onPress={() => handleClickModel(trainingModel.id)}
              right={(props) => (
                <IconButton
                  {...props}
                  icon="delete"
                  onPress={() => handleDelete(trainingModel.id)}
                />
              )}
            />
          ))}
        </List.Section>
      </ScrollView>
    </PaperProvider>
  );
};

export default TrainingModelsPage;
