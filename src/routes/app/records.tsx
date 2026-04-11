import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/records')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/app/records"!</div>
}
