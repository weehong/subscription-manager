import { withAuthenticationRequired } from "@auth0/auth0-react"
import Loading from "@/components/Loading"
import { ComponentType } from "react"

export default function ProtectedRoute({component}: {component: ComponentType}) {
    const Component = withAuthenticationRequired(component, {
        onRedirecting: () => <Loading />,
    })

    return <Component />
}