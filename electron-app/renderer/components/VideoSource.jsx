import { useState, useEffect, useRef, forwardRef } from 'react';

const VideoSource = forwardRef((props, fwdref) => {
  const [deviceList, setDeviceList] = useState([]);
  const [videoFile, setVideoFile] = useState(null);

  const mediaDevices = useRef(null);
  const webcamRef = useRef();
  const videoFileRef = useRef();

  useEffect(() => {
    if (videoFileRef.current) {
      (async () => {
        await videoFileRef.current.play().catch(err => console.error(err));
      })();
    }
  }, [videoFile]);

  useEffect(() => {
    const handleDeviceChange = async () => {
      mediaDevices.current = await navigator.mediaDevices.enumerateDevices();
    };

    const handleMesssage = (e, payload) => {
      if (webcamRef.current && webcamRef.current.srcObject) {
        webcamRef.current.srcObject.getTracks().forEach((track) => {
          track.stop();
        });
      }

      setVideoFile(payload);
    };

    navigator.mediaDevices.addEventListener('devicechange', handleDeviceChange);
    window.electron.message.on(handleMesssage);

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
          video: { deviceId: vsrc.deviceId, width: 500, height: 500 },
        };
        let stream = null;

        try {
          stream = await navigator.mediaDevices.getUserMedia(constraints);
          webcamRef.current.srcObject = stream;
        } catch (err) {
          console.error('video source: initialize error');
        }
      }
    })();

    fwdref.current = [videoFileRef.current, webcamRef.current];

    return () => {
      navigator.mediaDevices.removeEventListener('devicechange', handleDeviceChange);
      fwdref.current = null;
    };
  }, []);

  return (
    <div style={{ width: '250px' }}>
      <video
        style={{ objectFit: 'contain', width: '100%', display: (videoFile ? 'block' : 'none') }}
        ref={videoFileRef}
        src={videoFile}
        autoPlay muted loop ></video>
      <video
        style={{ objectFit: 'contain', width: '100%',  display: (videoFile ? 'none' : 'block') }}
        ref={webcamRef}
        autoPlay playsInline></video>
    </div>
  );
});

export default VideoSource;
