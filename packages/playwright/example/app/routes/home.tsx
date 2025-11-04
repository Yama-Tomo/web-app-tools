import { Welcome } from '../welcome/welcome'
import type { Route } from './+types/home'

export const loader = async () => {
  const response = await fetch(`${process.env['BACKEND_API_HOST']}/message`)
  if (!response.ok) {
    throw new Error('Failed to fetch message')
  }
  const message: { data: string } = await response.json()

  return { data: message.data }
}

// biome-ignore lint/correctness: noEmptyPattern
export function meta({}: Route.MetaArgs) {
  return [
    { title: 'New React Router App' },
    { name: 'description', content: 'Welcome to React Router!' },
  ]
}

export default function Home(props: Route.ComponentProps) {
  return <Welcome message={props.loaderData.data} />
}
