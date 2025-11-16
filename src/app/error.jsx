"use client" // Error boundaries must be Client Components

import { Button } from "@/components/ui/button"
import { HomeIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Error({ error, reset }) {
	const router = useRouter()
	useEffect(() => {
		// Log the error to an error reporting service
		console.error(error)
	}, [error])

	return (
		<div className="flex h-full w-full flex-col items-center justify-center gap-4">
			<h2>Something went wrong!</h2>
			<Button
				onClick={
					// Attempt to recover by trying to re-render the segment
					() => reset()
				}
			>
				Try again
			</Button>
			<Button
				onClick={
					// Go back to the home page
					() => router.push("/")
				}
			>
				Go Home <HomeIcon className="size-4" />
			</Button>
		</div>
	)
}