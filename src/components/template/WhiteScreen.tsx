interface WhiteScreenProps {
    children: React.ReactNode,
    className?: string,
    style?: React.CSSProperties
}

const WhiteScreen = ({ children, className, style }: WhiteScreenProps) => {
    return (
        <div className={`${className} main-layout bg-white w-[90%] rounded-[2rem] p-4 shadow-md`} style={style}>
            {children}
        </div>
    )
}

export default WhiteScreen;