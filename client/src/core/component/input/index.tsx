import React, {InputHTMLAttributes } from "react";
import classNames from "classnames";
import styles from "./input.module.css";

export interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
    
}

export const Input = (props: IInputProps) =>
    <input {...props} className={classNames(props.className, styles["input"])} />;
