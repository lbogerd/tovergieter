"use client";

import { useFormState } from "react-dom";

import type { ReactNode } from "react";

export function Form({
	children,
	action,
	className,
}: {
	children: ReactNode;
	action: (prevState: any, formData: FormData) => Promise<ActionResult>;
	className?: string;
}) {
	const [state, formAction] = useFormState(action, {
		error: null,
	});
	return (
		<form action={formAction} className={`${className}`}>
			{children}
			<p>{state.error}</p>
		</form>
	);
}

export type ActionResult = {
	error: string | null;
};
