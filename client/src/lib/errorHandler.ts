import { toast } from "sonner";
import { AxiosError } from "axios";

interface ApiErrorResponse {
  message: string;
}

export const handleApiError = (error: unknown): void => {
  if (error instanceof AxiosError) {
    const message =
      (error.response?.data as ApiErrorResponse)?.message ?? error.message;
    toast.error(message);
  } else if (error instanceof Error) {
    toast.error(error.message);
  } else {
    toast.error("An unexpected error occurred");
  }
};
