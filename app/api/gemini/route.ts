import { GoogleGenerativeAI } from "@google/generative-ai"

export async function POST(req: Request) {
  const { messages } = await req.json()

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "")
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" })

  // Create a system prompt to instruct the model
  const systemPrompt = `
You are an intelligent course recommendation assistant.

Your job is to:
- ONLY recommend useful, high-quality **online courses** (from platforms like Coursera, Udemy, edX, freeCodeCamp, etc.)
- Include the **course title**, a **short summary**, and a **direct link**
- If the user is vague, ask smart **follow-up questions** to better understand their goal
- Do NOT provide general advice or summaries — only courses with links and relevant follow-up questions

Respond in this format:

1. [Course Title 1](link) - Short summary (2–3 lines)
2. [Course Title 2](link) - Short summary

Follow-up question: (a thoughtful question to help refine the recommendations)
`.trim()

  // Combine system and user messages
  const prompt = [
    `System: ${systemPrompt}`,
    ...messages.map((m: any) => `${m.role === "user" ? "User" : "Assistant"}: ${m.content}`)
  ].join("\n")

  const result = await model.generateContent(prompt)
  const response = result.response.text()

  return Response.json({ reply: response })
}
