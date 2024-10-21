"use client";
import { QuoteTypes } from "@/types/quotesType";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

export default function Home() {
  const [quote, setQuote] = useState<QuoteTypes | null>(null);
  const [provider, setProvider] = useState<string>("");
  const [linkProvider, setLinkProvider] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);

  const timestamp = new Date().getTime();

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await fetch(`/api/quotes?timestamp=${timestamp}`, {
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
      } catch (error) {
        setIsError(true);
      }
    };

    fetchQuote();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="flex min-h-screen px-12 items-center justify-center bg-[#232323]">
      {isError ? (
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          closeOnClick
          draggable
          pauseOnHover
          theme="light"
        />
      ) : (
        <></>
      )}

      <div className="text-center">
        {quote ? (
          <div>
            <p className="text-white font-bold text-xl">{quote.quote}</p>
            <p className="text-gray-400 mt-2">- {quote.author}</p>
            <p className="text-gray-500 mt-1">{quote.anime}</p>
          </div>
        ) : (
          <p className="text-gray-500">Loading...</p>
        )}
      </div>
      <footer className="absolute w-full flex flex-row justify-between bottom-0 left-0 p-4">
        <div>
          {provider ? (
            <p className="text-gray-500 text-sm">
              Quotes provided by{" "}
              <a href={linkProvider} target="_blank">
                {provider}
              </a>
            </p>
          ) : (
            <p className="text-gray-500">Loading...</p>
          )}
        </div>
        <div>
          <p className="text-gray-500 text-sm">
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
