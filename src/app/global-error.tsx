"use client";

export default function GlobalError(props: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	return (
		<html lang="en">
			<body>
				<h2>Something went wrong!</h2>
				<button type="button" onClick={() => props.reset()}>
					Try again
				</button>
			</body>
		</html>
	);
}
