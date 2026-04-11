import { createFileRoute, createRootRoute, Outlet } from "@tanstack/react-router";
import { useState } from "react";
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
export const Route = createRootRoute({
    component: RootRouteComponent,
});
function RootRouteComponent() {
    return (
        <>
            <Outlet />
            {//<TanStackRouterDevtools />
            }
        </>
    );
}
