import axios from "axios";
import { NextResponse } from "next/server";
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
        response = await axios.get(urlWaifu, {
          headers: {
            Authorization: process.env.WAIFU_IT_TOKEN,
          },
        });
        break;

      case "Zen":
        provider = "ZenQuotes";
        linkProvider = "https://zenquotes.io/";
        const resZ = await axios.get(urlZen);
        const zenQuotes: QuoteZen = resZ.data[0];
        const readyZenQuotes: QuoteTypes = {
          _id: 1,
          quote: zenQuotes.q,
          anime: "",
          author: zenQuotes.a,
        };
        response = { data: readyZenQuotes };
        break;

      case "Quotable":
        provider = "Quotable Quotes";
        linkProvider = "https://github.com/lukePeavey/quotable";
        const resQ = await axios.get(urlQuotable);
        const QuotableQuotes: Quotable = resQ.data[0];
        const readyQuotableQuotes: QuoteTypes = {
          _id: QuotableQuotes._id,
          quote: QuotableQuotes.content,
          anime: "",
          author: QuotableQuotes.author,
        };
        response = { data: readyQuotableQuotes };
        break;
    }

    return NextResponse.json(
      { data: response?.data, provider: provider, linkProvider: linkProvider },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: "Error fetching quotes", details: error.message || error },
      { status: 500 }
    );
  }
}
