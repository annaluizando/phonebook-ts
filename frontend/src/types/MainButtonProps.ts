export interface MainButtonProps {
    text: string;
    onclick?: () => void;
    type?: "button" | "submit" | "reset";
    color?: string;
    hoverColor?: string;
    outlineColor?: string;
}