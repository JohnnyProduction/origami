import React, {InputHTMLAttributes } from "react";
import classNames from "classnames";
import styles from "./index.module.css";

export interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
    
}

export const Input = (props: IInputProps) =>
    <input {...props} className={classNames(props.className, styles["input"])} />;
