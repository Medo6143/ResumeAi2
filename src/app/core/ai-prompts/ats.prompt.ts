export function atsPrompt(
  jobTitle: string,
  jobDescription: string,
  resume: string,
  lang: 'ar' | 'en' = 'en'
): string {
  const jdContext = jobDescription
    ? `against the following job description:\n${jobDescription}`
    : `for general ATS suitability and best practices for a "${jobTitle}" role.`;

  return `
Analyze the following resume ${jdContext}

Return ONLY raw JSON (no markdown) with this structure:
{
  "score": number (0-100),
  "matchPercentage": number,
  "match_status": "EXCELLENT" | "GOOD" | "POOR" | "AVERAGE",
  "strengths": string[] (max 5),
  "gaps": string[] (max 5),
  "actionable_steps": string[] (max 6)
}

Rules:
- Be critical and provide truly professional feedback.
- Focus on action verbs, quantifiable metrics, and formatting.
- JSON only.
- Respond in ${lang === 'ar' ? 'Arabic' : 'English'}

Resume Content:
${resume}
`;
}
