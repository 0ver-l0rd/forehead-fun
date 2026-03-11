import OpenAI from 'openai';
import { Character, Genre } from '@/data/characters';

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

const openai = new OpenAI({
    apiKey,
    dangerouslyAllowBrowser: true // Since we are in a client-side Vite app for now
});

/**
 * Generates a list of 10-15 characters based on a custom player prompt.
 */
export async function generateCharacterStack(prompt: string): Promise<Character[]> {
    const systemPrompt = `
    You are a professional game designer for a "Guess Who" / "Heads Up" style game.
    The user will provide a theme or category (e.g., "Controversial Actors", "90s Cartoon Villains").
    Generate a list of 12 iconic, recognizable characters fitting this theme.
    
    Output MUST be a JSON object with a "characters" key containing an array of objects with this structure:
    {
      "characters": [
        {
          "name": "Character Name",
          "description": "A very brief, 1-sentence hint that describes who they are without using their name."
        }
      ]
    }
    
    Keep descriptions fun and evocative.
  `;

    const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: `Generate 12 characters for the theme: ${prompt}` }
        ],
        response_format: { type: "json_object" }
    });

    const content = response.choices[0].message.content;
    if (!content) throw new Error("Failed to generate characters");

    console.log("Raw AI Content:", content);
    const parsed = JSON.parse(content);

    // Resilient array extraction
    let characters = parsed.characters;
    if (!Array.isArray(characters)) {
        // If "characters" key is missing, look for ANY array in the object
        const foundArray = Object.values(parsed).find(val => Array.isArray(val));
        characters = foundArray || [];
    }

    if (!Array.isArray(characters)) {
        throw new Error("AI did not return a valid character list");
    }

    return characters.map((c: any) => ({
        name: c.name,
        description: c.description,
        genre: prompt // Force the genre to match the prompt
    }));
}

/**
 * Generates a descriptive image for a character using DALL-E 3.
 */
export async function generateCharacterImage(name: string, description: string): Promise<string> {
    const prompt = `A high-quality, professional character portrait of ${name}. 
  Description: ${description}. 
  Style: Vibrant, cinematic digital art, clean background, center-framed, looking towards the viewer. 
  Avoid any text, watermarks, or letters in the image.`;

    const response = await openai.images.generate({
        model: "dall-e-3",
        prompt,
        n: 1,
        size: "1024x1024",
        quality: "standard"
    });

    return response.data[0].url || "";
}
