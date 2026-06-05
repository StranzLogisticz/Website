"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Camera, RotateCcw, Check, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { t } from "@/lib/i18n";
import { toast } from "sonner";

interface Props {
  onCapture: (blob: Blob) => Promise<void> | void;
  busy?: boolean;
}

export function SelfieCapture({ onCapture, busy }: Props) {
  const { lang } = useAuth();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [blob, setBlob] = useState<Blob | null>(null);
  const [cameraReady, setCameraReady] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const s = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user", width: 480, height: 480 },
          audio: false,
        });
        if (!active) { s.getTracks().forEach((t) => t.stop()); return; }
        setStream(s);
        if (videoRef.current) {
          videoRef.current.srcObject = s;
          await videoRef.current.play().catch(() => {});
          setCameraReady(true);
        }
      } catch {
        setCameraReady(false);
      }
    })();
    return () => {
      active = false;
      stream?.getTracks().forEach((t) => t.stop());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const snap = () => {
    const v = videoRef.current;
    const c = canvasRef.current;
    if (!v || !c) return;
    const size = 480;
    c.width = size; c.height = size;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    ctx.translate(size, 0); ctx.scale(-1, 1);
    ctx.drawImage(v, 0, 0, size, size);
    c.toBlob((b) => { if (!b) return; setBlob(b); setPreview(URL.createObjectURL(b)); }, "image/jpeg", 0.8);
  };

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setBlob(f);
    setPreview(URL.createObjectURL(f));
  };

  const reset = () => { setBlob(null); if (preview) URL.revokeObjectURL(preview); setPreview(null); };

  const confirm = async () => {
    if (!blob) return;
    try { await onCapture(blob); } catch (e) { toast.error((e as Error).message); }
  };

  return (
    <Card className="overflow-hidden">
      <div className="relative aspect-square w-full bg-black">
        {preview ? (
          <img src={preview} alt="selfie" className="h-full w-full object-cover" />
        ) : cameraReady ? (
          <video ref={videoRef} playsInline muted className="h-full w-full -scale-x-100 object-cover" />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-white">
            <Camera className="h-10 w-10 opacity-60" />
            <p className="text-sm opacity-80">{t("cameraError", lang)}</p>
            <Button size="sm" variant="secondary" onClick={() => fileInputRef.current?.click()}>
              {t("takeSelfie", lang)}
            </Button>
            <input ref={fileInputRef} type="file" accept="image/*" capture="user" hidden onChange={onFile} />
          </div>
        )}
        <canvas ref={canvasRef} className="hidden" />
      </div>
      <div className="flex gap-2 p-3">
        {preview ? (
          <>
            <Button variant="outline" className="flex-1" onClick={reset} disabled={busy}>
              <RotateCcw className="mr-2 h-4 w-4" />{t("retake", lang)}
            </Button>
            <Button className="flex-1" onClick={confirm} disabled={busy || !blob}>
              {busy ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Check className="mr-2 h-4 w-4" />}
              {t("confirm", lang)}
            </Button>
          </>
        ) : (
          cameraReady && (
            <Button className="w-full" onClick={snap} disabled={busy}>
              <Camera className="mr-2 h-4 w-4" />{t("takeSelfie", lang)}
            </Button>
          )
        )}
      </div>
    </Card>
  );
}
