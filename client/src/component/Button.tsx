import React from "react";

type buttonType = {
    text: string,
    size: "lg" | "md" | "sm" | "xs" | "wide",
    color: "default" | "neutral" | "primary" | "accent" | "ghost" | "error",
    isOutlined?: boolean,
    isLoading?: boolean,

    icon?: React.ReactElement,

    onClick?: () => void
}

const Button: React.FC<buttonType> = ({ text, color, size, isLoading, isOutlined, icon: Icon, onClick }: buttonType) => {
    const colorVariants = {
        default: '',
        neutral: 'btn-neutral',
        primary: 'btn-primary',
        accent: 'btn-accent',
        ghost: 'btn-ghost',
        error: 'btn-error',
    }
    const sizeVariants = {
        md: '',
        lg: 'btn-lg',
        sm: 'btn-sm',
        xs: 'h-[2rem] btn-xs',
        wide: 'btn-wide',
    }
    return (
        <button onClick={onClick}
            className={`btn 
            capitalize
            ${colorVariants[color]}
            ${sizeVariants[size]}
            ${isOutlined ? "btn-outline" : ""}
                `}>
            {isLoading && <span className="loading loading-spinner"></span>}
            {/* {Icon && Icon} */}
            {Icon}
            {text}</button>
    )

}
Button.defaultProps = {
    isOutlined: false,
    isLoading: false,
}

export { Button }