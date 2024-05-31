import {
  Camera,
  getCameraDevice,
  useCameraDevices,
  useCameraFormat,
  useCameraPermission,
} from 'react-native-vision-camera';
import {useEffect, useRef, useState} from 'react';

import {useAppState} from '@react-native-community/hooks';

export const useCamera = () => {
  const {hasPermission, requestPermission} = useCameraPermission();
  const [cameraPosition, setCameraPosition] = useState('back');
  const devices = useCameraDevices();
  const cameraBack = getCameraDevice(devices, 'back');
  const cameraFront = getCameraDevice(devices, 'front');
  const device = cameraPosition === 'back' ? cameraBack : cameraFront;
  const [fpsRanges, setFpsRanges] = useState<number>(240);
  const [photoHdr, setPhotoHdr] = useState<boolean>(false);
  const format = useCameraFormat(device, [
    {
      fps: fpsRanges,
      photoHdr,
    },
  ]);
  const camera = useRef<Camera>(null);
  const [flash, setFlash] = useState<'off' | 'on' | 'auto' | undefined>('off');
  const [enableShutterSound, setEnableShutterSound] = useState<boolean>(false);
  const [urlImages, setUrlImages] = useState<string[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  const appState = useAppState();
  const isActive = appState === 'active';

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission, requestPermission]);

  const flipFlash = () => {
    setFlash(flash === 'off' ? 'on' : 'off');
  };

  const flipShutterSound = () => {
    setEnableShutterSound(!enableShutterSound);
  };

  const flipCamera = () => {
    setCameraPosition(cameraPosition === 'back' ? 'front' : 'back');
  };

  const flipFPS = () => {
    setFpsRanges(fpsRanges === 60 ? 240 : fpsRanges === 240 ? 30 : 60);
  };

  const flipHDR = () => {
    setPhotoHdr(!photoHdr);
  };

  const flipModal = () => {
    setModalVisible(!modalVisible);
  };

  const takePhoto = async () => {
    const photo = await camera.current?.takePhoto({
      flash: flash,
      enableShutterSound: enableShutterSound,
    });
    if (photo?.path) {
      setUrlImages(urlImage => [photo.path, ...urlImage]);
    }
  };

  return {
    camera,
    device,
    enableShutterSound,
    isActive,
    flash,
    fpsRanges,
    format,
    hasPermission,
    modalVisible,
    photoHdr,
    urlImages,
    flipCamera,
    flipHDR,
    flipFlash,
    flipFPS,
    flipShutterSound,
    flipModal,
    takePhoto,
  };
};
