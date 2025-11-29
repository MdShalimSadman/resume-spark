import OpenAI from "openai";
import { NextResponse } from "next/server";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { resume } = await req.json();

    const prompt = `
You are an expert ATS (Applicant Tracking System) analyzer.
Evaluate the resume below against typical ATS parsing rules and current job market standards for the target role (Senior Software Engineer).

Resume:${resume}

You MUST generate a JSON object with the following structure. Do not include any text outside the JSON object.

JSON Structure:
{
  "atsScore": [Number 0-100],
  "summary": "[Brief, overall assessment of ATS readiness]",
  "strengths": ["[Good point 1]", "[Good point 2]", "..."],
  "issues": ["[Issue 1 reduces score]", "[Issue 2 reduces score]", "..."],
  "fixSuggestions": ["[Fix suggestion 1]", "[Fix suggestion 2]", "..."],
  "keywordOptimization": ["[Keyword suggestion 1]", "[Keyword suggestion 2]", "..."]
}
    `;

    const completion = await client.chat.completions.create({
      model: "gpt-5-nano",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
    });

    const jsonStringResult = completion.choices[0].message.content;

    const structuredResult = JSON.parse(jsonStringResult || "{}");

    return NextResponse.json({ result: structuredResult }, { status: 200 });
  } catch (error) {
    console.error("ATS CHECK ERROR:", error);
    return NextResponse.json(
      { error: "Failed to analyze resume" },
      { status: 500 }
    );
  }
}
