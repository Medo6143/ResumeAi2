export interface AtsResult {
    score: number;
    matchPercentage: number;
    matchStatus: string;
    strengths: string[];
    gaps: string[];
    actionableSteps: string[];
}
