/** biome-ignore-all lint/suspicious/noConsole: testing */
import { useRef, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, Pause, Radio } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { SoundWave } from "../components/ui/SoundWave";

const isRecordingSupported =
  !!navigator.mediaDevices &&
  typeof navigator.mediaDevices.getUserMedia === "function" &&
  typeof window.MediaRecorder === "function";

type RoomParams = {
  roomId: string;
};

export function RecordRoomAudio() {
  const params = useParams<RoomParams>();

  const [isRecording, setIsRecording] = useState(false);
  const recorder = useRef<MediaRecorder | null>(null);
  const intervalRef = useRef<NodeJS.Timeout>(null);

  function stopRecording() {
    setIsRecording(false);

    if (recorder.current && recorder.current.state !== "inactive") {
      recorder.current.stop();
    }

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }

  async function uploadAudio(audio: Blob) {
    try {
      const formData = new FormData();

      formData.append("file", audio, "audio.webm");

      const response = await fetch(
        `http://localhost:3333/rooms/${params.roomId}/audio`,
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();

      recorder.current?.stop();

      console.log("Data uploaded", result);
      toast("Upload concluído", {
        description: "Gravação enviada com sucesso",
      });
    } catch (error) {
      toast("Ocorreu um erro", {
        description: "Não foi possível concluir o envio da gravação",
      });
      console.log("Error while uploading recording", error);
    }
  }

  function createRecorder(audio: MediaStream) {
    recorder.current = new MediaRecorder(audio, {
      mimeType: "audio/webm",
      audioBitsPerSecond: 64_000,
    });

    recorder.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        uploadAudio(event.data);
      }
    };

    recorder.current.onstart = () => {
      console.log("Gravação iniciada!");
    };

    recorder.current.onstop = () => {
      console.log("Gravação encerrada/pausada");
    };

    recorder.current.start();
  }

  async function startRecording() {
    if (!isRecordingSupported) {
      alert("O seu navegador não suporta gravação");
      return;
    }

    setIsRecording(true);

    const audio = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        sampleRate: 44_100,
      },
    });

    createRecorder(audio);

    intervalRef.current = setInterval(() => {
      recorder.current?.stop();

      createRecorder(audio);
    }, 5000);
  }

  if (!params.roomId) {
    return <Navigate replace to="/" />;
  }

  return (
    <div className="min-h-screen bg-zinc-950">
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="mb-4 flex items-center justify-start">
          <Link to={`/room/${params.roomId}`}>
            <Button variant="outline">
              <ArrowLeft className="mr-2 size-4" />
              Voltar para sala
            </Button>
          </Link>
        </div>
        <div className="flex h-screen flex-col items-center gap-3">
          <h1 className="mb-2 font-bold text-3xl text-foreground">
            Gravar áudio
          </h1>
          <p className="text-muted-foreground">
            Grave o áudio de referência para esta sala
          </p>
          <Card>
            <CardContent className="min-w-xl">
              <CardHeader className="justify-center">
                <CardTitle className="font-medium text-neutral-500">
                  {isRecording ? (
                    <span>Gravando... </span>
                  ) : (
                    <span>Pausado</span>
                  )}
                </CardTitle>
              </CardHeader>
              <div className="w-full p-2">
                <SoundWave barCount={15} active={isRecording} />

                <div className="flex w-full flex-row items-center justify-end">
                  {isRecording ? (
                    <Button onClick={stopRecording}>
                      <Pause className="size-4" /> Pausar gravação
                    </Button>
                  ) : (
                    <Button onClick={startRecording}>
                      <Radio className="size-4" /> Gravar áudio
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
