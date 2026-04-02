import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function generateWorkout(params: {
  goal: string
  experience: string
  equipment: string
  daysPerWeek: number
}) {
  const completion = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content: 'You are a fitness expert creating personalized workout plans. Return structured JSON with exercises, sets, reps, and rest periods.'
      },
      {
        role: 'user',
        content: `Create a ${params.daysPerWeek}-day workout plan for ${params.goal} with ${params.experience} experience using ${params.equipment} equipment.`
      }
    ],
    temperature: 0.7,
  })

  return completion.choices[0]?.message?.content || ''
}

export async function analyzeProgress(workoutHistory: string) {
  const completion = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content: 'You are a fitness coach analyzing workout progress. Provide insights on trends, plateaus, and recommendations.'
      },
      {
        role: 'user',
        content: `Analyze this workout history and provide insights: ${workoutHistory}`
      }
    ],
    temperature: 0.7,
  })

  return completion.choices[0]?.message?.content || ''
}

export async function suggestImprovements(exerciseName: string, userLevel: string) {
  const completion = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content: 'You are a fitness trainer providing form tips and exercise improvements for proper technique and safety.'
      },
      {
        role: 'user',
        content: `Provide form tips and safety advice for ${exerciseName} for a ${userLevel} level athlete.`
      }
    ],
    temperature: 0.7,
  })

  return completion.choices[0]?.message?.content || ''
}

export default openai
