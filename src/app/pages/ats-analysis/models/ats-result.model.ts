export interface AtsResult {
    score: number;
    matchPercentage: number;
    strengths: string[];
    missingSkills: string[];
    recommendations: string[];
}
