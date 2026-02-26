import api from "@/configs/axios";
import { authClient } from "@/lib/auth-client";
import { handleApiError } from "@/lib/errorHandler";
import { Loader2Icon } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Home = () => {
  const { data: session } = authClient.useSession();
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!session?.user) {
        return toast.error("Please signin to create a project");
      } else if (!input.trim()) {
        return toast.error("Please enter a message");
      }
      setLoading(true);

      const { data } = await api.post("/api/user/project", {
        initial_prompt: input,
      });

      setLoading(false);
      navigate(`/projects/${data.projectId}`);
    } catch (error: unknown) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="flex flex-col items-center text-white text-sm pb-20 px-4 font-poppins">
      <a
        href="/pricing"
        className="flex items-center gap-2 border border-slate-700 rounded-full p-1 pr-3 text-sm mt-20"
      >
        <span className="bg-indigo-600 text-xs px-3 py-1 rounded-full">
          New
        </span>
        <p className="flex items-center gap-2">
          <span>Try our 30-day free trial — no credit card needed</span>
          <svg
            className="mt-px"
            width="6"
            height="9"
            viewBox="0 0 6 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m1 1 4 3.5L1 8"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </p>
      </a>

      <h1 className="text-center text-[40px] leading-[48px] md:text-6xl md:leading-[70px] mt-4 font-semibold max-w-3xl">
        Turn thoughts into websites instantly, with AI.
      </h1>

      <p className="text-center text-base max-w-md mt-2">
        Create, customize and publish website faster than ever with our AI site
        Builder.
      </p>

      <form
        onSubmit={onSubmitHandler}
        className="bg-white/10 max-w-2xl w-full rounded-xl p-4 mt-10 border border-indigo-600/70 focus-within:ring-2 ring-indigo-500 transition-all"
      >
        <textarea
          onChange={(e) => setInput(e.target.value)}
          className="bg-transparent outline-none text-gray-300 resize-none w-full"
          rows={4}
          placeholder="Describe your presentation in details"
          required
        />
        <button className="ml-auto flex items-center gap-2 bg-gradient-to-r from-[#CB52D4] to-indigo-600 rounded-md px-4 py-2">
          {!loading ? (
            "Create with AI"
          ) : (
            <>
              Creating{" "}
              <Loader2Icon className="animate-spin size-4 text-white" />
            </>
          )}
        </button>
      </form>

      <div className="flex flex-nowrap items-center justify-center gap-15 md:gap-14 mx-auto w-full max-w-5xl px-14 mt-25">
        <img
          className="h-10 w-auto opacity-60 hover:opacity-100 transition-opacity shrink-0 brightness-0 invert"
          src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
          alt="Google"
        />
        <img
          className="h-10 w-auto opacity-60 hover:opacity-100 transition-opacity shrink-0 brightness-0 invert"
          src="https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg"
          alt="Microsoft"
        />
        <img
          className="h-10 w-auto opacity-60 hover:opacity-100 transition-opacity shrink-0 brightness-0 invert"
          src="https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png"
          alt="Notion"
        />
        <img
          className="h-10 w-auto opacity-60 hover:opacity-100 transition-opacity shrink-0 brightness-0 invert"
          src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg"
          alt="Slack"
        />
        <img
          className="h-10 w-auto opacity-60 hover:opacity-100 transition-opacity shrink-0 brightness-0 invert"
          src="https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg"
          alt="Figma"
        />
      </div>
    </section>
  );
};

export default Home;
