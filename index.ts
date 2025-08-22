import OpenAI from 'openai';

(async (apiKey: string = process.env.OPENAI_API_KEY || '') => {
  if (!apiKey) {
    throw new Error('OpenAI API key is required');
  }

  const openai = new OpenAI({
    apiKey: apiKey
  });

  async function runCompletion(content: string = '') {
    try {
      const completion = await openai.chat.completions.create({
        messages: [{ role: 'user', content }],
        model: 'gpt-4o-mini',
      });

      return completion.choices[0]?.message?.content ?? 'No response'
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const businessIdea = '' +
    'Cyber security solution is a broken industry.' +
    'Provide a solution to 99% of the small medium businesses in the world.' +
    'What are the pain points of the current industry?'
  const response = await runCompletion(businessIdea);
  const solution = response + `\nPropose an agentic AI solution to the problem of cyber security`
  const final = await runCompletion(solution)
  console.log(final);
})();
