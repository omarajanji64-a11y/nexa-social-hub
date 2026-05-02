import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/instagram')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/instagram"!</div>
}
