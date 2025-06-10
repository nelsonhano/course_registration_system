export default function AdminHeaderComponent({title, text}:{title: string, text?: string}) {
return (
    <div className="flex flex-col pl-2 mt-10 gap-2">
        <h1 className="md:text-4xl text-2xl text-blue-700">{title}</h1>
        <p className=" sm:w-[500px] leading-4 font-serif">{text}</p>
    </div>
)
}
