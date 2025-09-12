import { CameraView, CameraType } from 'expo-camera';
import { useState, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';

export default function App() {
  const [facing, setFacing] = useState<CameraType>('front');
  const ref = useRef<CameraView>(null);
  const [uri, setUri] = useState<string | null>(null);
 const router = useRouter();

  const takePicture = async () => {
  if (ref.current) {
    const photo = await ref.current.takePictureAsync();
    setUri(photo.uri);
  }
};
  return (
    <View style={styles.container}>
          <CameraView style={styles.camera} facing={facing} ref={ref} />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: "#f06292",
                paddingVertical: 12,
                paddingHorizontal: 30,
                borderRadius: 20,
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={takePicture}
            >
              <Text style={styles.text}>Registrar Rostro</Text>
            </TouchableOpacity>
          </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 20,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 64,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    width: '100%',
    paddingHorizontal: 64,
  },
  button: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  previewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderBlockStartColor: 'pink',
    alignContent: 'center',
  },
  preview: {
    width: 300,
    height: 400,
    borderRadius: 10,
    marginBottom: 20,
  },
  previewButtons: {
    flexDirection: "row",
    gap: 16,
  },
  previewButton: {
    backgroundColor: "#f06292",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 20,
    alignItems: "center",
  },
  previewButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
