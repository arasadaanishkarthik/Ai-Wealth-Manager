/**
 * AI Service Abstraction Layer
 *
 * Current implementation: Keyword-based predefined responses
 * Future: Replace sendMessage() body with Amazon Bedrock API call
 *
 * Interface contract:
 *   sendMessage(userInput: string, context: object) => Promise<AIResponse>
 *
 * AIResponse shape:
 *   { response: string, reasoning: Array<{label, value}>, assumptions: string[] }
 */

import { aiResponses, defaultAiResponse } from '../data/recommendations';
import { aiBusinessPlanTemplate } from '../data/startups';

// Simulates network delay for realistic UX
const simulateDelay = (ms = 1200) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Finds the best matching predefined response based on keyword matching.
 * @param {string} input - User's message
 * @returns {object} - Matched AI response object
 */
function findMatchingResponse(input) {
  const lowerInput = input.toLowerCase();

  let bestMatch = null;
  let highestScore = 0;

  for (const responseObj of aiResponses) {
    const score = responseObj.keywords.reduce((acc, keyword) => {
      return lowerInput.includes(keyword.toLowerCase()) ? acc + 1 : acc;
    }, 0);

    if (score > highestScore) {
      highestScore = score;
      bestMatch = responseObj;
    }
  }

  return highestScore > 0 ? bestMatch : defaultAiResponse;
}

/**
 * Primary AI interface method.
 * Replace the implementation below with an Amazon Bedrock API call
 * without changing the interface signature or return shape.
 *
 * @param {string} userInput - The user's question or prompt
 * @param {object} context - Optional user context (income, goals, etc.)
 * @returns {Promise<{response: string, reasoning: Array, assumptions: Array}>}
 */
export async function sendMessage(userInput, context = {}) {
  // TODO: Replace with Amazon Bedrock API call
  // const response = await fetch('/api/ai/chat', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ message: userInput, context }),
  // });
  // return response.json();

  await simulateDelay(1200 + Math.random() * 800);
  return findMatchingResponse(userInput);
}

/**
 * Generates a simulated business plan for a startup.
 * @param {object} startup - Startup data object
 * @returns {Promise<object>} - Business plan object
 */
export async function generateBusinessPlan(startup) {
  // TODO: Replace with Amazon Bedrock generative AI call
  await simulateDelay(2000);
  return aiBusinessPlanTemplate(startup);
}

/**
 * Analyzes a lifestyle expense and returns impact assessment.
 * @param {number} amount - Expense amount
 * @param {string} category - Expense category
 * @param {object} userContext - User financial context
 * @returns {Promise<object>} - Impact analysis object
 */
export async function analyzeLifestyleImpact(amount, category, userContext) {
  // TODO: Replace with API call
  await simulateDelay(600);

  const { availableCapacity = 30000 } = userContext;
  const percentOfCapacity = Math.round((amount / availableCapacity) * 100);
  const remainingCapacity = availableCapacity - amount;
  const estimatedGoalImpact = Math.ceil(amount / 10000);

  return {
    expense: amount,
    category,
    percentOfCapacity,
    remainingCapacity: Math.max(0, remainingCapacity),
    savingsImpact: -amount,
    goalImpactMonths: estimatedGoalImpact,
    message: `This scenario reduces the amount available for your current goals by ₹${amount.toLocaleString('en-IN')} and may extend the projected timeline by approximately ${estimatedGoalImpact} month${estimatedGoalImpact !== 1 ? 's' : ''}. The decision is entirely yours.`,
    disclaimer: 'Illustrative analysis based on synthetic demo data. Not financial advice.',
  };
}

export default { sendMessage, generateBusinessPlan, analyzeLifestyleImpact };
