import { NextResponse } from "next/server";
import axios from "axios";
import { Quotable, QuoteTypes, QuoteZen } from "@/types/quotesType";

const urlWaifu = "https://waifu.it/api/v4/quote";
const urlZen = "https://zenquotes.io/api/random/";
const urlQuotable =
  "https://api.quotable.io/quotes/random?limit=1&tags=technology|famous-quotes|film|love|pain|sadness|self-help";

const list = ["Zen", "Waifu", "Quotable"];
const randomizer = Math.floor(Math.random() * list.length);
const selected = list[randomizer];

export async function GET() {
  try {
    let response;
    let provider;
    let linkProvider;

    switch (selected) {
      case "Waifu":
        provider = "Waifu.it";
        linkProvider = "https://waifu.it/";
        console.log("Selected Provider", provider);

        response = await axios.get(urlWaifu, {
          headers: {
            Authorization: process.env.WAIFU_IT_TOKEN as string,
            "Cache-Control": "no-cache, no-store, must-revalidate",
          },
        });

        break;

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

      case "Quotable":
        provider = "Quotable Quotes";
        linkProvider = "https://github.com/lukePeavey/quotable";
        console.log("Selected Provider:", provider);

        response = await axios.get(urlQuotable, {
          headers: {
            "Cache-Control": "no-cache, no-store, must-revalidate",
          },
        });

        const quotableQuotes: Quotable = response.data[0];
        response = {
          data: {
            _id: quotableQuotes._id,
            quote: quotableQuotes.content,
            anime: "",
            author: quotableQuotes.author,
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
      }
    );
  } catch (error: any) {
    console.error("Error fetching quotes:", error);

    return NextResponse.json(
      { error: "Error fetching quotes", details: error.message || error },
      { status: 500 }
    );
  }
}
