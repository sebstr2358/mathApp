export default function Button({children, ...props}) {
    return <button {...props} className="ms-4 px-2 py-1 bg-stone-400 rounded-md text-stone-100 hover:bg-stone-600 text-stone-200">{children}</button>
}