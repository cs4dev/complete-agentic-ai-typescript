import OpenAI from 'openai';
import { Anthropic } from '@anthropic-ai/sdk'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

let request = `
  Please come up with a challenging, nuanced question that I can ask a number of LLMs to evaluate their intelligence.
  Answer only with the question, no explanation.
`

let messages: OpenAI.Chat.ChatCompletionMessageParam[] = [{ role: 'user', content: request }]

let response = await openai.chat.completions.create({
  model: 'gpt-4o-mini',
  messages
})

let question = response.choices[0].message.content
if (question) {
  console.log(question)
}

const competitors = []
const answers = []
if (question) {
  const model = "gpt-4o-mini"
  messages = [{ "role": 'user', "content": question }]
  response = await openai.chat.completions.create({ model, messages })
  const answer = response.choices[0].message.content
  console.log(answer)
  competitors.push(model)
  answers.push(answer)
}

