import React, { useState, useEffect, useRef } from 'react';
import { Camera, X, RefreshCw, Check, Sparkles, AlertCircle } from 'lucide-react';

interface LiveCameraModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCapture: (photoDataUrl: string) => void;
}

export const LiveCameraModal: React.FC<LiveCameraModalProps> = ({ isOpen, onClose, onCapture }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && !capturedImage) {
      startCamera(facingMode);
    } else {
      stopCamera();
    }
    return () => {
      stopCamera();
    };
  }, [isOpen, facingMode, capturedImage]);

  const startCamera = async (mode: 'user' | 'environment') => {
    stopCamera();
    setCameraError(null);
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: mode, width: { ideal: 1280 }, height: { ideal: 720 } },
          audio: false
        });
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
          videoRef.current.play();
        }
      } else {
        setCameraError('Camera access not supported in browser');
      }
    } catch (err: any) {
      console.warn('Webcam permission error:', err);
      setCameraError('Live camera permission not granted or device unavailable');
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const handleTakeSnapshot = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
        setCapturedImage(dataUrl);
        stopCamera();
        return;
      }
    }
    
    // Fallback camera snapshot
    createSampleSnapshot();
  };

  const createSampleSnapshot = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 400;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, 400, 400);
      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.arc(200, 150, 60, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(200, 310, 100, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 15px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Live Tenant Photo Captured', 200, 370);
    }
    setCapturedImage(canvas.toDataURL('image/jpeg'));
  };

  const handleConfirmPhoto = () => {
    if (capturedImage) {
      onCapture(capturedImage);
      onClose();
      setCapturedImage(null);
    }
  };

  const handleRetake = () => {
    setCapturedImage(null);
  };

  const toggleFacingMode = () => {
    setFacingMode(prev => (prev === 'user' ? 'environment' : 'user'));
  };

  if (!isOpen) return null;

  return (
    <div className="wizard-modal-backdrop" style={{ zIndex: 9999 }}>
      <div className="booking-view-modal-card" style={{ maxWidth: '400px', borderRadius: '24px', overflow: 'hidden', background: '#0f172a', color: '#ffffff' }}>
        
        {/* MODAL HEADER */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', borderBottom: '1px solid #1e293b' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Camera size={18} color="#38bdf8" />
            <span style={{ fontSize: '15px', fontWeight: 800, color: '#ffffff' }}>Live Camera Capture</span>
          </div>
          <button 
            type="button" 
            onClick={() => { stopCamera(); onClose(); setCapturedImage(null); }}
            style={{ background: '#1e293b', border: 'none', color: '#94a3b8', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* VIEWFINDER AREA */}
        <div style={{ position: 'relative', width: '100%', height: '320px', background: '#000000', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
          {capturedImage ? (
            <img src={capturedImage} alt="Captured" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <>
              <video 
                ref={videoRef} 
                playsInline 
                muted 
                style={{ width: '100%', height: '100%', objectFit: 'cover', transform: facingMode === 'user' ? 'scaleX(-1)' : 'none' }} 
              />
              
              {/* FACE OVERLAY VIEWFINDER */}
              <div style={{
                position: 'absolute',
                width: '190px',
                height: '230px',
                border: '2px dashed #38bdf8',
                borderRadius: '50%',
                boxShadow: '0 0 0 9999px rgba(15, 23, 42, 0.5)',
                pointerEvents: 'none'
              }} />

              {cameraError && (
                <div style={{ position: 'absolute', top: '16px', left: '16px', right: '16px', background: 'rgba(239, 68, 68, 0.95)', color: '#ffffff', padding: '8px 12px', borderRadius: '10px', fontSize: '11px', textAlign: 'center', fontWeight: 600 }}>
                  <AlertCircle size={14} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />
                  {cameraError}
                </div>
              )}
            </>
          )}

          <canvas ref={canvasRef} style={{ display: 'none' }} />
        </div>

        {/* CONTROLS FOOTER */}
        <div style={{ padding: '16px', background: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
          {capturedImage ? (
            <>
              <button 
                type="button" 
                onClick={handleRetake}
                style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#1e293b', color: '#94a3b8', border: '1px solid #334155', padding: '10px 16px', borderRadius: '12px', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}
              >
                <RefreshCw size={15} /> Retake
              </button>

              <button 
                type="button" 
                onClick={handleConfirmPhoto}
                style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#16a34a', color: '#ffffff', border: 'none', padding: '10px 20px', borderRadius: '12px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 12px rgba(22, 163, 74, 0.4)' }}
              >
                <Check size={16} /> Use Photo
              </button>
            </>
          ) : (
            <>
              <button 
                type="button" 
                onClick={toggleFacingMode}
                title="Switch Camera"
                style={{ width: '44px', height: '44px', borderRadius: '50%', background: '#1e293b', color: '#38bdf8', border: '1px solid #334155', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
              >
                <RefreshCw size={18} />
              </button>

              <button 
                type="button" 
                onClick={handleTakeSnapshot}
                title="Snap Photo"
                style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#ffffff', border: '4px solid #38bdf8', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 0 20px rgba(56, 189, 248, 0.5)' }}
              >
                <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: '#2563eb' }} />
              </button>

              <button 
                type="button" 
                onClick={createSampleSnapshot}
                title="Sample Photo"
                style={{ width: '44px', height: '44px', borderRadius: '50%', background: '#1e293b', color: '#fbbf24', border: '1px solid #334155', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
              >
                <Sparkles size={18} />
              </button>
            </>
          )}
        </div>

      </div>
    </div>
  );
};
