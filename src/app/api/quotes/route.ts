import axios from "axios";
import { NextResponse } from "next/server";
import { QuoteTypes, QuoteZen } from "@/types/quotesType";

const urlWaifu = "https://waifu.it/api/v4/quote";
const urlZen = "https://zenquotes.io/api/random/";

const list = ["Zen", "Waifu"];
const randomizer = Math.floor(Math.random() * list.length);
const selected = list[randomizer];

export async function GET() {
  try {
    let response;
    let provider;
    let linkProvider;

    switch (selected) {
      case "Waifu":
        provider = "Waifu.it API";
        linkProvider = "https://waifu.it/";
        response = await axios.get(urlWaifu, {
          headers: {
            Authorization: process.env.WAIFU_IT_TOKEN,
          },
        });
        break;

      case "Zen":
        provider = "ZenQuotes API";
        linkProvider = "https://zenquotes.io/";
        const res = await axios.get(urlZen);
        // Transform Zen response to match QuoteTypes format
        const zenQuotes: QuoteZen = res.data[0];
        const transformedQuote: QuoteTypes = {
          _id: 1,
          quote: zenQuotes.q,
          anime: "",
          author: zenQuotes.a,
        };
        response = { data: transformedQuote };
        break;
    }

    return NextResponse.json(
      { data: response?.data, provider: provider, linkProvider: linkProvider },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching quotes" },
      { status: 500 }
    );
  }
}
