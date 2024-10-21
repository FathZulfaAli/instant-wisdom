"use client";
import { QuoteTypes } from "@/types/quotesType";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const [quote, setQuote] = useState<QuoteTypes | null>(null);
  const [provider, setProvider] = useState<string>("");
  const [linkProvider, setLinkProvider] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchQuote = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/quotes`, {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const rawData = await response.json();
      const quotesData = rawData.data;
      setQuote(quotesData);
      setProvider(rawData.provider);
      setLinkProvider(rawData.linkProvider);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
      toast.error("Error when providing wisdom. Please try again.");
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <main className="flex flex-col min-h-screen px-12 items-center justify-center bg-[#232323]">
      <nav className="absolute top-6 right-6">
        {/* Button to fetch new quotes */}
        {isLoading ? (
          <button
            onClick={fetchQuote}
            disabled
            className="backdrop-blur-sm bg-white/30 font-bold text-white py-2 px-4 rounded disabled:bg-white/15"
          >
            Loading...
          </button>
        ) : (
          <button
            onClick={fetchQuote}
            className="backdrop-blur-sm bg-white/30 text-white font-bold py-2 px-4 rounded"
          >
            Get New Quote
          </button>
        )}
      </nav>
      {isError ? (
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          closeOnClick
          draggable
          theme="light"
        />
      ) : (
        <></>
      )}

      <div className=" flex text-center justify-center items-center">
        {isLoading ? (
          <div className="flex flex-col justify-center items-center">
            <div className="flex flex-row gap-x-2">
              <div className="animate-pulse opacity-10 bg-slate-300 w-28 h-2 rounded-full" />
              <div className="animate-pulse opacity-10 bg-slate-300 w-14 h-2 rounded-full" />
              <div className="animate-pulse opacity-10 bg-slate-100 w-7 h-2 rounded-full" />
              <div className="animate-pulse opacity-10 bg-slate-300 w-16 h-2 rounded-full" />
              <div className="animate-pulse opacity-10 bg-slate-200 w-5 h-2 rounded-full" />
              <div className="animate-pulse opacity-10 bg-slate-100 w-14 h-2 rounded-full" />
            </div>
            <div className="flex flex-row gap-x-2 mt-2">
              <div className="animate-pulse opacity-10 bg-slate-300 w-5 h-2 rounded-full" />
              <div className="animate-pulse opacity-10 bg-slate-100 w-16 h-2 rounded-full" />
              <div className="animate-pulse opacity-10 bg-slate-200 w-7 h-2 rounded-full" />
              <div className="animate-pulse opacity-10 bg-slate-100 w-28 h-2 rounded-full" />
              <div className="animate-pulse opacity-10 bg-slate-200 w-28 h-2 rounded-full" />
              <div className="animate-pulse opacity-10 bg-slate-400 w-14 h-2 rounded-full" />
            </div>
            <div className="animate-pulse mt-3 opacity-10 bg-slate-100 w-20 h-2 rounded-full" />
            <div className="flex flex-row gap-x-2 mt-1">
              <div className="animate-pulse opacity-10 bg-slate-300 w-14 h-2 rounded-full" />
              <div className="animate-pulse opacity-10 bg-slate-100 w-14 h-2 rounded-full" />
            </div>
          </div>
        ) : (
          <div>
            <p className="text-white font-bold text-xl">{quote?.quote}</p>
            <p className="text-gray-200 mt-2">- {quote?.author}</p>
            <p className="text-gray-300 mt-1">{quote?.anime}</p>
          </div>
        )}
      </div>
      <footer className="absolute w-full flex flex-row justify-between bottom-0 left-0 p-4">
        <div>
          {isLoading ? (
            <p className="text-gray-200">Loading...</p>
          ) : (
            <p className="text-gray-200 text-sm">
              Quotes provided by{" "}
              <a href={linkProvider} target="_blank">
                {provider}
              </a>
            </p>
          )}
        </div>
        <div>
          <p className="text-gray-200 text-sm">
            Created by{" "}
            <a
              href="https://www.instagram.com/fathandmayang/?hl=en"
              target="_blank"
            >
              FM Production
            </a>
          </p>
        </div>
      </footer>
    </main>
  );
}
