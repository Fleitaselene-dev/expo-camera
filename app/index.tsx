import { useRouter } from "expo-router";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";

export default function LoginScreen() {
  const router = useRouter();
  const [usuario, setUsuario] = useState("");
  const [contrasenia, setContrasenia] = useState("");

  return (
    <View style={{  flex: 1,backgroundColor: "#ffe4ec", justifyContent: "center",alignItems: "center",padding: 20,}}>
      <Text style={{ fontSize: 28, marginBottom: 30, color: "#d63384", fontWeight: "bold", textAlign: 'center' }}>
     Iniciar Sesión </Text>
      <TextInput placeholder="Usuario" placeholderTextColor="#b76fa7" value={usuario} onChangeText={setUsuario} style={{width: 300,backgroundColor: "#fff", borderColor: "#f5c2e7", borderWidth: 1, borderRadius: 10,  padding: 12,  marginBottom: 15, fontSize: 16, color: "#d63384", }}/>
      <TextInput placeholder="Contraseña" placeholderTextColor="#b76fa7" secureTextEntry  value={contrasenia} onChangeText={setContrasenia} style={{ width: 300, backgroundColor: "#fff", borderColor: "#f5c2e7", borderWidth: 1, borderRadius: 10,  padding: 12,  marginBottom: 25, fontSize: 16,  color: "#d63384",
        }}
      />
     <View style={{ flexDirection: "row", justifyContent: "center"}}>
      <TouchableOpacity onPress={() => router.push("/cameraLogin")} style={{backgroundColor: "#f06292",paddingVertical: 12, paddingHorizontal: 16, width:150, borderRadius: 20,height:50,
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 12 }}> Ingresar con Rostro</Text>
      </TouchableOpacity>
         <TouchableOpacity onPress={() => router.push("/cameraRegister")} style={{backgroundColor: "#fff" ,paddingVertical: 12, paddingHorizontal: 16, borderRadius: 20,width:150, height:50,
        }}
      >
        <Text style={{ color: "#f06292", fontWeight: "bold", fontSize: 12 }}>Registrar Rostro</Text>
      </TouchableOpacity>
    </View>
    </View>
  );
}