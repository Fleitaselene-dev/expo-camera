import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router"; 

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View 
      style={{ 
        flex: 1, 
        justifyContent: "center", 
        alignItems: "center", 
        padding: 20, 
        backgroundColor: "lightpink" 
      }}
    >
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
        Panel de Administración
      </Text>

      <View>
        <TouchableOpacity 
          onPress={() => router.push("/gestionProductos")} 
          style={{
            backgroundColor: "#fff",
            paddingVertical: 12, 
            paddingHorizontal: 16, 
            borderRadius: 20,
            width: 180, 
            alignItems: "center"
          }}
        >
          <Text style={{ color: "#f06292", fontWeight: "bold", fontSize: 14 }}>
            Gestión de productos
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

