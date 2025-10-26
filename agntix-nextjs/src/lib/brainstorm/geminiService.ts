import { GoogleGenAI, Type } from "@google/genai";
import { Brief, AgencyType, Cluster, ApiResponse } from './types';

const getAgencyFramework = (agencyType: AgencyType): string => {
  switch (agencyType) {
    case AgencyType.CREATIVE:
      return "Generate triggers based on strategic positioning, messaging frameworks, and narrative angles. Consider concepts like Category Disruption, Feature Leadership, Value Redefinition, Simplification Messaging, Subculture Alignment, Outcome Focused (JDtB), Emotional Relief, Empowerment Messaging, Founder/Origin Story, and Expertise/Authority Claims.";
    case AgencyType.MEDIA:
      return "Generate triggers based on strategic media moments, cultural contexts, and audience tensions. Consider the relationship between content, environment, and mindset: When is the audience most receptive? What moments of transition, need, or realization create openings for brands? Think about TV/Streaming Content Sponsorships that align with audience values, Podcast Integrations that feel native to the conversation, Cultural Moment Activations, Environment-Based Opportunities (gyms, airports, waiting rooms, commutes), Tension-Point Media (decision moments, life transitions, seasonal rituals), Co-Viewing Experiences, Contextual Content Alignment (what they're watching/reading/listening to), Day-Part Strategies tied to emotional states, Location-Based Moments of need, and Media Properties that mirror audience identity. Focus on WHY someone would be receptive in that moment, not just WHERE to place an ad.";
    case AgencyType.PR:
      return "Generate triggers based on earning media, building reputation, and managing public perception. Consider tactics like Ambassador/Advocate Programs, Influencer Seeding/Gifting, Community Engagement, Speaking Slot Pitching, PR Stunts, Award Submissions, Non-Profit/Cause Alignments, Data & Trend Reports, Reactive Media Placement (Newsjacking), Proactive Feature Pitching, and Thought Leadership Placement.";
    case AgencyType.EXPERIENTIAL:
      return "Generate triggers based on creating immersive, memorable, in-person brand moments. Consider tactics like Pop-Up Activations, Mobile Roadshows, Brand Museums, 'Unboxing' Events, Event Naming Rights, VIP Lounges, Utility Sponsorships (e.g., charging stations), User-Generated Content (UGC) Stations, Interactive Tech (AR/VR), and Post-Event Virtual Extensions.";
    default:
      throw new Error("Invalid agency type");
  }
};

const buildPrompt = (brief: Brief): string => {
  const agencyFramework = getAgencyFramework(brief.agencyType);

  return `
    **Persona**:
    You are a world-class Creative Director and strategist with decades of experience leading brainstorms that result in award-winning, globally recognized work. Your specialty is shattering conventional thinking and provoking teams to explore uncomfortable but brilliant territories.

    **User Input**:
    - Brand/Product: ${brief.brandProduct}
    - Core Challenge: ${brief.coreChallenge}
    - Target Audience: ${brief.targetAudience}
    - Brand Tone: ${brief.brandTone}
    - Audience & Market Context: ${brief.marketContext}

    **Core Task**:
    Based on the user input, generate a diverse set of 30-40 provocative brainstorming triggers organized into 4-5 thematic clusters. Your goal is NOT to provide solutions or suggest specific tactics. Instead, generate thought-provoking questions, strategic tensions, and creative challenges that force the team to explore unconventional territories and generate their own ideas. Use the following framework for your generation:
    ${agencyFramework}

    **Mandatory Stylistic Constraints**:
    - Brevity: Every trigger must be a maximum of 15 words. This is a strict rule.
    - Question-Led or Challenge-Oriented: Structure triggers as open questions (e.g., "What if...?", "How might...?") or provocations that require ideation rather than execution (e.g., "Imagine if...", "Consider positioning...", "Explore treating...").
    - Inject Constraints: Include limitations to spark creativity (e.g., "...with a $0 budget," "...using only audio," "...in a single city block.").
    - Use Contradictions: Create juxtapositions and unexpected pairings to force new thinking (e.g., "Partner with our biggest competitor," "Market our luxury product in a discount store.").
    - Provocative Fragments: Include 1-2 incomplete sentences per cluster that the team must finish (e.g., "Our product is now the official sponsor of ________.", "What if our brand suddenly became illegal? We would ________.").

    **What NOT to Generate**:
    - Do NOT create tactical execution ideas (e.g., "Partner with X to do Y")
    - Do NOT suggest specific campaigns, activations, or media buys
    - Do NOT provide prescriptive solutions
    - Instead: Frame tensions, pose dilemmas, ask uncomfortable questions

    **Critical Output Constraint**:
    Your entire response MUST be a single, valid JSON object. This is non-negotiable for programmatic parsing. Do not include ANY text, explanations, markdown formatting, or conversational phrases before or after the JSON object. Your response must begin with \`{\` and end with \`}\`.
  `;
};

// Get API key from environment
const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY as string });

export const generateTriggers = async (brief: Brief): Promise<Cluster[]> => {
  if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
    throw new Error("NEXT_PUBLIC_GEMINI_API_KEY environment variable not set.");
  }

  const prompt = buildPrompt(brief);

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            clusters: {
              type: Type.ARRAY,
              description: "A list of thematic clusters for brainstorming.",
              items: {
                type: Type.OBJECT,
                properties: {
                  title: {
                    type: Type.STRING,
                    description: "The title of the thematic cluster."
                  },
                  prompts: {
                    type: Type.ARRAY,
                    description: "A list of brainstorming trigger prompts within this cluster.",
                    items: {
                      type: Type.STRING
                    }
                  }
                },
                required: ["title", "prompts"]
              }
            }
          },
          required: ["clusters"]
        }
      }
    });

    const text = response.text;

    // Fallback parsing in case the model wraps the JSON in markdown or other text
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error("No JSON object found in the response:", text);
      throw new Error("Invalid response format from AI. Could not find a JSON object.");
    }

    const parsedJson: ApiResponse = JSON.parse(jsonMatch[0]);
    if (!parsedJson.clusters || !Array.isArray(parsedJson.clusters)) {
        throw new Error("Invalid JSON structure: 'clusters' array not found.");
    }

    return parsedJson.clusters;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to fetch ideas from the AI service.");
  }
};
