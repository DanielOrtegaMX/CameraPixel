import {
  ActivityIndicator,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {Camera} from 'react-native-vision-camera';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react';
import {useCamera} from './hooks/useCamera';

const App = () => {
  const {
    camera,
    device,
    enableShutterSound,
    isActive,
    flash,
    format,
    fpsRanges,
    hasPermission,
    modalVisible,
    photoHdr,
    urlImages,
    flipCamera,
    flipFlash,
    flipFPS,
    flipHDR,
    flipShutterSound,
    flipModal,
    takePhoto,
  } = useCamera();

  return (
    <View style={styles.container}>
      {!hasPermission && <ActivityIndicator />}
      {device && (
        <>
          <Camera
            ref={camera}
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={isActive}
            format={format}
            photo
            preview
          />
          <View style={styles.options}>
            <Ionicons
              onPress={flipCamera}
              name="camera-reverse-outline"
              size={30}
            />
            <Ionicons
              onPress={flipFlash}
              name={flash === 'off' ? 'flash-off-outline' : 'flash-outline'}
              size={30}
            />
            <Ionicons
              onPress={flipShutterSound}
              name={
                enableShutterSound
                  ? 'volume-high-outline'
                  : 'volume-mute-outline'
              }
              size={30}
            />
            <TouchableOpacity onPress={flipHDR} style={styles.optionItem}>
              <Text style={styles.textOptionItem}>
                {photoHdr ? 'HDR' : 'NO HDR'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={flipFPS} style={styles.optionItem}>
              <Text style={styles.textOptionItem}>{fpsRanges} FPS</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.preview}
            onPress={() => (urlImages?.length ? flipModal() : {})}>
            {urlImages?.length > 2 && (
              <Image
                style={{...styles.image, ...styles.image2}}
                source={{uri: urlImages[2]}}
              />
            )}
            {urlImages?.length > 1 && (
              <Image
                style={{...styles.image, ...styles.image1}}
                source={{uri: urlImages[1]}}
              />
            )}
            {urlImages?.length > 0 && (
              <Image style={styles.image} source={{uri: urlImages[0]}} />
            )}
            <View style={styles.total}>
              <Text>{urlImages.length}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={takePhoto} />
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}>
            <TouchableOpacity onPress={flipModal} style={styles.modalContainer}>
              {urlImages?.length > 0 && (
                <Image style={styles.imageModal} source={{uri: urlImages[0]}} />
              )}
            </TouchableOpacity>
          </Modal>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  options: {
    position: 'absolute',
    top: 80,
    right: 30,
    padding: 10,
    opacity: 0.9,
    backgroundColor: 'white',
    rowGap: 30,
  },
  optionItem: {
    width: 30,
    height: 30,
  },
  textOptionItem: {
    fontSize: 10,
    textAlign: 'center',
  },
  preview: {
    position: 'absolute',
    bottom: 70,
    left: 40,
    width: 80,
    height: 80,
    backgroundColor: 'black',
    borderColor: 'white',
    borderWidth: 1,
  },
  total: {
    position: 'absolute',
    bottom: -10,
    backgroundColor: 'white',
    borderRadius: 50,
    width: 30,
    height: 30,
    left: -10,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 4,
  },
  image: {
    width: 80,
    height: 80,
    borderColor: 'white',
    borderWidth: 1,
    zIndex: 3,
    position: 'absolute',
    top: -0,
  },
  image1: {
    position: 'absolute',
    zIndex: 2,
    top: -10,
    left: 10,
    transform: [{rotate: '10deg'}],
    opacity: 0.4,
  },
  image2: {
    position: 'absolute',
    zIndex: 1,
    top: -20,
    left: 30,
    transform: [{rotate: '30deg'}],
    opacity: 0.4,
  },

  button: {
    position: 'absolute',
    bottom: 60,
    width: 100,
    height: 100,
    backgroundColor: 'white',
    borderRadius: 50,
    borderColor: 'gray',
    borderWidth: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageModal: {
    width: 400,
    height: 400,
    borderWidth: 1,
    borderColor: 'white',
  },
});
export default App;
