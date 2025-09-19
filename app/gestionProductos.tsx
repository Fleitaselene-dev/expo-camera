import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, FlatList, Modal, StyleSheet, TextInput } from 'react-native';
import { CameraView, Camera } from 'expo-camera';

export default function GestionProductos() {
    const [productos, setProductos] = useState([
        { id: '1', codigo: '123456', nombre: 'Producto 1', precio: 10 }
    ]);

    const [mostrarScanner, setMostrarScanner] = useState(false);
    const [permisos, setPermisos] = useState(null);

    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [codigo, setCodigo] = useState('');
    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState('');
    const [productoEditar, setProductoEditar] = useState(null);

    const abrirScanner = async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setPermisos(status === 'granted');
        if (status === 'granted') {
            setMostrarScanner(true);
        }
    };

    // Cuando escanea un código
    const codigoEscaneado = ({ data }) => {
        if (!mostrarScanner) return;
        setMostrarScanner(false);

        const nuevoProducto = {
            id: Date.now().toString(),
            codigo: data,
            nombre: `Producto ${data}`,
            precio: 25
        };

        setProductos(prev => [...prev, nuevoProducto]);
        Alert.alert('¡Éxito!', 'Producto agregado');
    };

    // Abrir formulario para nuevo producto
    const abrirFormulario = (producto = null) => {
        if (producto) {
            setProductoEditar(producto);
            setCodigo(producto.codigo);
            setNombre(producto.nombre);
            setPrecio(producto.precio.toString());
        } else {
            setProductoEditar(null);
            setCodigo('');
            setNombre('');
            setPrecio('');
        }
        setMostrarFormulario(true);
    };
    const guardarProducto = () => {
        if (!codigo || !nombre || !precio) {
            Alert.alert('Error', 'Todos los campos son obligatorios');
            return;
        }

        if (productoEditar) {
            setProductos(prev =>
                prev.map(p =>
                    p.id === productoEditar.id
                        ? { ...p, nombre, precio: parseFloat(precio) }
                        : p
                )
            );
            Alert.alert('Actualizado', 'Producto editado correctamente');
        } else {
          
            const existe = productos.find(p => p.codigo === codigo);
            if (existe) {
                Alert.alert('Ya existe', 'Este código ya está registrado');
                return;
            }

            const nuevoProducto = {
                id: Date.now().toString(),
                codigo,
                nombre,
                precio: parseFloat(precio)
            };
            setProductos(prev => [...prev, nuevoProducto]);
            Alert.alert('¡Éxito!', 'Producto agregado');
        }

        setMostrarFormulario(false);
    };

    const eliminar = (id) => {
        Alert.alert('Confirmar', '¿Eliminar producto?', [
            { text: 'No' },
            { text: 'Sí', onPress: () => setProductos(prev => prev.filter(p => p.id !== id)) }
        ]);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Gestión de Productos</Text>

          
            <TouchableOpacity style={styles.botonEscanear} onPress={abrirScanner}>
                <Text style={styles.textoBoton}>Escanear Código de Producto</Text>
            </TouchableOpacity>
            {/* Lista */}
            <Text style={styles.subtitulo}>Productos: {productos.length}</Text>
            <FlatList
                data={productos}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View style={styles.producto}>
                        <View>
                            <Text style={styles.nombre}>{item.nombre}</Text>
                            <Text>Código: {item.codigo}</Text>
                            <Text>Precio: ${item.precio}</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity
                                style={styles.botonEditar}
                                onPress={() => abrirFormulario(item)}
                            >
                                <Text style={styles.textoAccion}>Editar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.botonEliminar}
                                onPress={() => eliminar(item.id)}
                            >
                                <Text style={styles.textoAccion}>Eliminar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />

            {/* Scanner Modal */}
            <Modal visible={mostrarScanner} animationType="slide">
                <View style={styles.scanner}>
                    {permisos ? (
                        <CameraView
                            style={styles.camara}
                            facing="back"
                            onBarcodeScanned={codigoEscaneado}
                            barcodeScannerSettings={{
                                barcodeTypes: ['qr', 'ean13', 'ean8', 'code128'],
                            }}
                        >
                            <View style={styles.overlay}>
                                <Text style={styles.textoScanner}>
                                    Apunta al código de barras o Qr
                                </Text>
                            </View>
                        </CameraView>
                    ) : (
                        <Text style={styles.sinPermisos}>Sin permisos de cámara</Text>
                    )}

                    <TouchableOpacity
                        style={styles.botonCerrar}
                        onPress={() => setMostrarScanner(false)}
                    >
                        <Text style={styles.textoBoton}>Cerrar</Text>
                    </TouchableOpacity>
                </View>
            </Modal>

         
            <Modal visible={mostrarFormulario} animationType="slide" transparent>
                <View style={styles.modalOverlay}>
                    <View style={styles.formulario}>
                        <Text style={styles.tituloFormulario}>
                            {productoEditar == 'Editar Producto' }
                        </Text>

                        <Text style={styles.label}>Código:</Text>
                        <TextInput
                            style={styles.input}
                            value={codigo}
                            onChangeText={setCodigo}
                            placeholder="Código del producto"
                            editable={!productoEditar} 
                        />

                        <Text style={styles.label}>Nombre:</Text>
                        <TextInput
                            style={styles.input}
                            value={nombre}
                            onChangeText={setNombre}
                            placeholder="Nombre del producto"
                        />

                        <Text style={styles.label}>Precio:</Text>
                        <TextInput
                            style={styles.input}
                            value={precio}
                            onChangeText={setPrecio}
                            placeholder="0.00"
                            keyboardType="numeric"
                        />

                        <View style={styles.botonesFormulario}>
                            <TouchableOpacity
                                style={styles.botonCancelar}
                                onPress={() => setMostrarFormulario(false)}
                            >
                                <Text style={styles.textoCancelar}>Cancelar</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.botonGuardar}
                                onPress={guardarProducto}
                            >
                                <Text style={styles.textoGuardar}>
                                    {productoEditar ? 'Actualizar' : 'Guardar'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: 'pink' },
    titulo: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
    subtitulo: { fontSize: 16, fontWeight: 'bold', marginVertical: 10 },
    botonEscanear: { backgroundColor: 'white', padding: 15, borderRadius: 8, alignItems: 'center', marginBottom: 10 },
    textoBoton: { color: 'black', fontSize: 16, fontWeight: 'bold' },
    producto: { backgroundColor: '#f5f5f5', padding: 15, marginVertical: 5, borderRadius: 8, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    nombre: { fontSize: 16, fontWeight: 'bold' },
    botonEditar: { padding: 5, marginRight: 10 },
    botonEliminar: { padding: 5 },
    textoAccion: { fontSize: 18, color:'#ffff', fontWeight: 'semibold', backgroundColor: 'pink', padding: 5, borderRadius: 5 },
    scanner: { flex: 1, backgroundColor: '#000' },
    camara: { flex: 1 },
    overlay: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    textoScanner: { color: '#fff', fontSize: 18, textAlign: 'center', backgroundColor: 'rgba(0,0,0,0.5)', padding: 10, borderRadius: 8 },
    botonCerrar: { backgroundColor: '#f44336', padding: 15, alignItems: 'center' },
    sinPermisos: { color: '#fff', fontSize: 18, textAlign: 'center', margin: 50 },
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
    formulario: { backgroundColor: '#fff', padding: 20, borderRadius: 10, width: '80%' },
    tituloFormulario: { fontSize: 20, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
    label: { fontSize: 14, fontWeight: 'bold' },
    input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginBottom: 15 },
    botonesFormulario: { flexDirection: 'row', justifyContent: 'space-between' },
    botonCancelar: { backgroundColor: '#ccc', padding: 10, borderRadius: 8 },
    botonGuardar: { backgroundColor: 'pink', padding: 10, borderRadius: 8 },
    textoCancelar: { color: '#000', fontWeight: 'bold' },
    textoGuardar: { color: '#fff', fontWeight: 'bold' },
});
