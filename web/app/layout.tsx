"use client"

import Blocked from "@components/shared/blocked"

import "@styles/global.css"

import { FC, PropsWithChildren, Suspense } from "react"

import { GoogleOAuthProvider } from "@react-oauth/google"
import { Analytics } from "@vercel/analytics/react"
import { ThemeProvider } from "next-themes"
import { Toaster } from "react-hot-toast"
import { SWRConfig } from "swr"

import { useUser, useWorkspace } from "@hooks/store"

import PostHogProvider from "@contexts/external/PosthogContext"
import ProgressBarProvider from "@contexts/external/ProgressBarProvider"
import { StoreProvider } from "@contexts/StoreContext"

import { SWR_CONFIG } from "@constants/swr-config"
import { THEMES } from "@constants/themes"

import StoreWrapper from "@wrappers/store/StoreWrapper"

import { isMobileDevice } from "@helpers/common.helper"

const RootLayout: FC<PropsWithChildren> = function ({ children }) {
    const {
        currentUser,
        membership: { currentProjectRole, currentWorkspaceRole },
    } = useUser()
    const { currentWorkspace } = useWorkspace()
    if (typeof window !== "undefined" && navigator && isMobileDevice(navigator.userAgent)) {
        return (
            <div className="flex h-screen justify-center">
                <Blocked />
            </div>
        )
    }
    return (
        <html lang="en">
            <body>
                <ProgressBarProvider>
                    <Toaster
                        toastOptions={{
                            style: {
                                background: "#333",
                                color: "#fff",
                            },
                            position: "bottom-right",
                            success: {
                                icon: "🎉",
                                duration: 3000,
                            },
                            error: {
                                icon: "🚧",
                                duration: 3000,
                            },
                        }}
                    />
                    <Analytics />
                    <GoogleOAuthProvider clientId={process.env["NEXT_PUBLIC_GOOGLE_SSO_CLIENT_ID"] ?? ""}>
                        <StoreProvider>
                            <ThemeProvider themes={THEMES} defaultTheme="system">
                                <Suspense>
                                    <StoreWrapper>
                                        <PostHogProvider
                                            user={currentUser}
                                            currentWorkspaceId={currentWorkspace?.id}
                                            workspaceRole={currentWorkspaceRole}
                                            projectRole={currentProjectRole}
                                        >
                                            <SWRConfig value={SWR_CONFIG}>{children}</SWRConfig>
                                        </PostHogProvider>
                                    </StoreWrapper>
                                </Suspense>
                            </ThemeProvider>
                        </StoreProvider>
                    </GoogleOAuthProvider>
                </ProgressBarProvider>
            </body>
        </html>
    )
}

export default RootLayout
