import styles from "./Button.module.scss";

type ButtonProps = {
    variant?: "primary" | "error" | "success";
    children: React.ReactNode;
};


export default function Button({ variant = "primary", children }: ButtonProps) {
    return (
        <button className={`${styles.button} ${styles[variant]}`}>
            {children}
        </button>
    );
}