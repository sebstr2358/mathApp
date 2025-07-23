export default function CloseButton({ children, ...props }) {
	return (
		<button
			{...props}
			className="fixed top-2 md:top-4 right-2 md:right-4 px-2 md:px-6 py-1 md:py-3 mx-auto bg-blue-400 rounded-md text-blue-300 hover:bg-blue-600 text-stone-200"
		>
			{children}
		</button>
	);
}
