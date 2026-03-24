/**
 * Fragmentation pattern recognition and historical comparison algorithms
 */

/**
 * Detects patterns in comet fragmentation data
 * @param data - Astronomical data points representing comet fragmentation events
 * @returns Object containing detected patterns and confidence levels
 */
export function detectPatterns(data: Array<{timestamp: number, size: number, distance: number, velocity: number}>): any {
  if (!data || data.length < 3) {
    return { patterns: [], confidence: 0 };
  }

  // Simple pattern detection based on size trends
  const sizes = data.map(d => d.size);
  let trend = 0;
  let stability = 0;

  // Calculate trend (rate of change in size)
  if (sizes.length >= 2) {
    const firstSize = sizes[0];
    const lastSize = sizes[sizes.length - 1];
    trend = (lastSize - firstSize) / sizes.length;
  }

  // Calculate stability (variance in sizes)
  const meanSize = sizes.reduce((a, b) => a + b, 0) / sizes.length;
  const variance = sizes.reduce((a, b) => a + Math.pow(b - meanSize, 2), 0) / sizes.length;
  stability = Math.sqrt(variance);

  // Determine pattern type
  let patternType = 'stable';
  if (trend < -0.5 && stability > 10) {
    patternType = 'fragmenting';
  } else if (trend > 0.5 && stability > 10) {
    patternType = 'expanding';
  }

  return {
    patterns: [{
      type: patternType,
      trend: trend,
      stability: stability,
      confidence: Math.min(1, Math.abs(trend) * 0.5 + (1 - stability / 100))
    }],
    confidence: Math.min(1, Math.abs(trend) * 0.5 + (1 - stability / 100))
  };
}

/**
 * Compares current comet data with historical fragmentation patterns
 * @param comet - Current comet data object
 * @returns Comparison results with historical data
 */
export function compareWithHistorical(comet: {size: number, velocity: number, distance: number}): any {
  // Historical data for reference (simplified)
  const historicalPatterns = [
    { name: 'C/1995 O1 (Hale-Bopp)', size: 50, velocity: 50, distance: 1.5, pattern: 'fragmenting' },
    { name: 'C/2013 A1 (Siding Spring)', size: 30, velocity: 40, distance: 1.2, pattern: 'fragmenting' },
    { name: 'C/2025 K1 (ATLAS)', size: 25, velocity: 35, distance: 1.0, pattern: 'fragmenting' }
  ];

  // Find closest match based on normalized parameters
  let bestMatch = null;
  let minDistance = Infinity;

  for (const historical of historicalPatterns) {
    const distance = Math.sqrt(
      Math.pow(comet.size - historical.size, 2) +
      Math.pow(comet.velocity - historical.velocity, 2) +
      Math.pow(comet.distance - historical.distance, 2)
    );

    if (distance < minDistance) {
      minDistance = distance;
      bestMatch = historical;
    }
  }

  return {
    match: bestMatch,
    similarity: 1 - Math.min(1, minDistance / 100),
    historicalPattern: bestMatch?.pattern || 'unknown'
  };
}