// src/app/api/openai/route.ts
import { NextResponse } from 'next/server';
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();

    // Use the completions endpoint for completion models
    const response = await openai.completions.create({
      model: 'text-davinci-003', // Update the model here if needed
      prompt,
      max_tokens: 100,
    });

    // Access the text of the first choice
    const text = response.choices[0].text;

    return NextResponse.json({ text });
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ error: 'Failed to fetch response from OpenAI' }, { status: 500 });
  }
}
