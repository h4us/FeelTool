import { useState, useEffect, useRef, forwardRef } from 'react';

import { useControls, button } from 'leva';

const VideoSource = forwardRef((props, fwdref) => {
  const [deviceList, setDeviceList] = useState([]);
  const [videoFile, setVideoFile] = useState(null);
  const [videoIsReady, setVideoIsReady] = useState(0);
  const [cameraIsReady, setCameraIsReady] = useState(0);
  const [fitStyle, setFitStyle] = useState({ width: '100%', height: 'auto' });

  const mediaDevices = useRef(null);
  const webcamRef = useRef();
  const videoFileRef = useRef();

  // --
  const toLiveCamera = useControls({
    'Use live camera': button(() => setVideoFile(null)),
    'Load video file': button(() => window.electron.message.send('load'))
  });
  // --

  // ..
  const handleResize = () => {
    const vsrc = videoFileRef.current.src ? videoFileRef.current : webcamRef.current;
    const videoAspectRatio = vsrc.videoWidth / vsrc.videoHeight;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const windowAspectRatio = windowWidth / windowHeight;

    if (videoAspectRatio > windowAspectRatio) {
      setFitStyle({ width: '100%', height: 'auto' });
    } else {
      setFitStyle({ width: 'auto', height: '100%' });
    }
  };
  // --

  useEffect(() => {
    if (videoFileRef.current && mediaDevices.current) {
      (async () => {
        if (videoFile) {
          await videoFileRef.current.play().catch(err => console.error(err));

          handleResize();
          setCameraIsReady(0);
        } else {
          let vsrc = null;
          for (const device of mediaDevices.current) {
            switch (device.kind) {
              case "videoinput":
                vsrc = device;
                break;
            }
          }

          if (vsrc) {
            const constraints = {
              video: { deviceId: vsrc.deviceId },
            };
            let stream = null;

            try {
              stream = await navigator.mediaDevices.getUserMedia(constraints);
              webcamRef.current.srcObject = stream;
            } catch (err) {
              console.error('video source: initialize error');
            }
          }

          handleResize();
          setVideoIsReady(0);
        }
      })();
    }
  }, [videoFile]);

  useEffect(() => {
    const handleDeviceChange = async () => {
      mediaDevices.current = await navigator.mediaDevices.enumerateDevices();
    };

    const handleMesssage = (e, payload) => {
      console.log(e, payload);

      if (typeof payload == 'string' && payload) {
        if (webcamRef.current && webcamRef.current.srcObject) {
          webcamRef.current.srcObject.getTracks().forEach((track) => {
            track.stop();
          });
        }

        setVideoFile(payload);
      }
    };

    const handleVideoLoaded = _ => setVideoIsReady(1);
    const handleCameraLoaded = _ => setCameraIsReady(1);

    navigator.mediaDevices.addEventListener('devicechange', handleDeviceChange);
    window.electron.message.on(handleMesssage);

    webcamRef.current.addEventListener('loadeddata', handleCameraLoaded);
    videoFileRef.current.addEventListener('loadeddata', handleVideoLoaded);

    window.addEventListener('resize', handleResize);

    (async () => {
      if (!mediaDevices.current) {
        await handleDeviceChange();
      }

      let vsrc = null;
      for (const device of mediaDevices.current) {
        switch (device.kind) {
          // case "audioinput":
          //   break;
          // case "audiooutput":
          //   break;
          case "videoinput":
            vsrc = device;
            break;
        }
      }

      if (vsrc) {
        const constraints = {
          video: {
            deviceId: vsrc.deviceId,
            // width: 500, height: 500
          },
        };
        let stream = null;

        try {
          stream = await navigator.mediaDevices.getUserMedia(constraints);
          webcamRef.current.srcObject = stream;
        } catch (err) {
          console.error('video source: initialize error');
        }

        handleResize();
      }
    })();

    fwdref.current = [videoFileRef.current, webcamRef.current];

    return () => {
      navigator.mediaDevices.removeEventListener('devicechange', handleDeviceChange);
      window.electron.message.off(handleMesssage);
      videoFileRef.current.removeEventListener('loadeddata', handleVideoLoaded);
      webcamRef.current.removeEventListener('loadeddata', handleCameraLoaded);
      window.removeEventListener('resize', handleResize);

      fwdref.current = null;
    };
  }, []);

  return (
    <>
      <video
        style={{ objectFit: 'contain', display: (videoFile ? 'block' : 'none'), ...fitStyle }}
        ref={videoFileRef}
        src={videoFile}
        data-loaded={videoIsReady}
        autoPlay muted loop ></video>
      <video
        style={{ objectFit: 'contain', display: (videoFile ? 'none' : 'block'), ...fitStyle }}
        ref={webcamRef}
        data-loaded={cameraIsReady}
        autoPlay playsInline></video>
    </>
  );
});

export default VideoSource;
