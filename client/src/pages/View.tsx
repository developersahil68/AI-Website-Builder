import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Loader2Icon } from "lucide-react";
import ProjectPreview from "../components/ProjectPreview";
import type { Project } from "../types";
import api from "@/configs/axios";
import { handleApiError } from "@/lib/errorHandler";

const View = () => {
  const { projectId } = useParams();

  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCode = async () => {
      try {
        const { data } = await api.get(`/api/project/published/${projectId}`);
        setCode(data.code);
        setLoading(false);
        setLoading(false);
      } catch (error: unknown) {
        handleApiError(error);
      }
    };

    fetchCode();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2Icon className="size-7 animate-spin text-indigo-200" />
      </div>
    );
  }
  return (
    <div className="h-screen">
      {code && (
        <ProjectPreview
          project={{ current_code: code } as Project}
          isGenerating={false}
          showEditorPanel={false}
        />
      )}
    </div>
  );
};

export default View;
