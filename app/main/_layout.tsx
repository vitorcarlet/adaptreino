import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer>
        <Drawer.Screen
          name="home"
          options={{
            drawerLabel: "Home",
            title: "overview",
          }}
        />
        {/* <Drawer.Screen
          name="user/[id]" 
          options={{
            drawerLabel: "User",
            title: "overview",
          }}
        /> */}
        <Drawer.Screen
          name="trainings"
          options={{
            drawerLabel: "Trainings",
            title: "overview",
          }}
        />
        <Drawer.Screen
          name="training-models"
          options={{
            drawerLabel: "Training Models",
            title: "overview",
          }}
        />
        <Drawer.Screen
          name="reports"
          options={{
            drawerLabel: "Reports",
            title: "overview",
          }}
        />
        <Drawer.Screen
          name="settings"
          options={{
            drawerLabel: "Settings",
            title: "overview",
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
