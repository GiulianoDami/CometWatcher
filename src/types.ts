export interface CometData {
  id: string;
  name: string;
  orbitPeriod: number;
  semiMajorAxis: number;
  eccentricity: number;
  inclination: number;
  periapsisDistance: number;
  apoapsisDistance: number;
  mass: number;
  composition: string[];
  lastObservationDate: Date;
  fragmentCount: number;
  fragmentationRate: number;
  trajectory: {
    x: number[];
    y: number[];
    z: number[];
  };
}

export interface AnalysisResult {
  cometId: string;
  analysisDate: Date;
  fragmentationPattern: string;
  stabilityIndex: number;
  riskLevel: 'low' | 'medium' | 'high';
  predictedBreakupDate?: Date;
  confidenceScore: number;
  keyFindings: string[];
}

export interface PredictionResult {
  cometId: string;
  predictionDate: Date;
  predictedFragmentationDate: Date;
  probability: number;
  uncertaintyRange: {
    lowerBound: Date;
    upperBound: Date;
  };
  recommendedActions: string[];
  modelAccuracy: number;
}