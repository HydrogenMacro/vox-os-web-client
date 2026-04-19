import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(misc)/terms-of-service')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div className="flex flex-col items-stretch p-4">
    <h1 className="text-3xl text-center">Terms of Service</h1>
    Todo
  </div>
}
