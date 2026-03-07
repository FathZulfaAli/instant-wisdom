import { NextResponse } from "next/server";
import axios from "axios";
import { Quotable, QuoteTypes, QuoteZen } from "@/types/quotesType";
export const fetchCache = "force-no-store";

const urlZen = "https://zenquotes.io/api/random/";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    let response;
    let provider;
    let linkProvider;

    const list = ["Zen"];
    const selected = list[0];

    switch (selected) {
      case "Zen":
        provider = "ZenQuotes";
        linkProvider = "https://zenquotes.io/";
        console.log("Selected Provider", provider);

        response = await axios.get(urlZen, {
          headers: {
            "Cache-Control": "no-cache, no-store, must-revalidate",
          },
        });

        const zenQuotes: QuoteZen = response.data[0];
        response = {
          data: {
            _id: 1,
            quote: zenQuotes.q,
            anime: "",
            author: zenQuotes.a,
          } as QuoteTypes,
        };
        break;
    }

    return NextResponse.json(
      { data: response?.data, provider: provider, linkProvider: linkProvider },
      {
        status: 200,
        headers: {
          "Cache-Control":
            "no-store, no-cache, must-revalidate, proxy-revalidate",
          Pragma: "no-cache",
          Expires: "0",
          "Surrogate-Control": "no-store",
        },
      },
    );
  } catch (error: any) {
    console.error("Error fetching quotes:", error);

    return NextResponse.json(
      { error: "Error fetching quotes", details: error.message || error },
      { status: 500 },
    );
  }
}
