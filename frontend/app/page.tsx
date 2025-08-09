"use client";

import { useState } from "react";
import axios from "axios";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState<string[]>([]);

  // Convert spaces to hyphens for LeetCode URL
  function formatForURL(qn?: string) {
    if (!qn) return "";
    return qn.replace(/\s+/g, "-");
  }

  function handleSubmit() {
    const q = `https://dsa-dev-backend.vercel.app/search?query=${question}`;
    axios
      .get(q)
      .then((res) => {
        console.log(res.data); // should be an array of strings
        setResponse(res.data || []);
      })
      .catch((error) => {
        console.error("There was an error making the request:", error);
      });
  }

  return (
    <div className="flex flex-col text-white items-center min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-black">
      <h1 className="text-[90px] mt-0 mb-8 font-bold text-center text-zinc-300">
        dsa | dev
      </h1>
      <div className="text-center text-gray-400">
        Search for your favourite data structure and algorithm questions from
        <a
          target="_blank"
          href="https://leetcode.com"
          className="text-yellow-400 ml-1"
        >
          LeetCode
        </a>
      </div>

      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            handleSubmit();
          }
        }}
        placeholder=" Type your question here ..."
        className="h-10 p-10 rounded-full m-10 mt-20 border-1 border-white w-140"
      />

      <div className="flex flex-wrap justify-center gap-6 mt-10 px-4 w-full">
        {response.length > 0 ? (
          response.map((item, index) => (
            <Card
              key={index}
              className="bg-inherit text-white w-full sm:w-[45%] md:w-[30%] min-w-[250px] max-w-xs p-6 rounded-2xl border border-white/10 shadow-sm"
            >
              <CardHeader className="space-y-2">
                <CardTitle className="text-lg font-semibold">{item}</CardTitle>
              </CardHeader>
              <CardFooter>
                <a
                  href={`https://leetcode.com/problems/${formatForURL(item)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-yellow-400 hover:underline text-sm"
                >
                  View on LeetCode
                </a>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="flex flex-wrap justify-center gap-6 mt-10 px-4">
            <Card className="bg-inherit text-white w-full sm:w-[45%] md:w-[30%] min-w-[250px] max-w-xs p-6 rounded-2xl border border-white/10 shadow-sm">
              <CardHeader className="space-y-2">
                <CardTitle className="text-lg font-semibold">
                  2000+ LC Questions
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                  Scraped over 2000+ questions
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-inherit text-white w-full sm:w-[45%] md:w-[30%] min-w-[250px] max-w-xs p-6 rounded-2xl border border-white/10 shadow-sm">
              <CardHeader className="space-y-2">
                <CardTitle className="text-lg font-semibold">
                  Optimised Results
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                  Get Links of most similar questions
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
