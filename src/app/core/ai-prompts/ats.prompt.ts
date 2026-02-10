export function atsPrompt(
  jobTitle: string,
  jobDescription: string,
  resume: string,
  lang: 'ar' | 'en' = 'en'
): string {
  return `
Analyze the resume against the job description for ATS suitability.

Return ONLY raw JSON (no markdown) with this structure:
{
  "score": number (0-100),
  "matchPercentage": number,
  "strengths": string[] (max 5),
  "missingSkills": string[] (max 5),
  "recommendations": string[] (max 6)
}

Rules:
- Be concise
- JSON only
- Respond in ${lang === 'ar' ? 'Arabic' : 'English'}

Job Title:
${jobTitle}

Job Description:
${jobDescription}

Resume:
${resume}
`;
}
