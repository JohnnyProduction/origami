import React from "react";
import styles from "./index.module.css";

// Заголовок страницы
export const PageHeader = (props: any) =>
    <h1 className={styles["typography__page-header"]} {...props}>{props.children}</h1>

// Заголовок секции на странице
export const PageTitle = (props: any) =>
    <h3 className={styles["typography__page-title"]} {...props}>{props.children}</h3>    

export const Text = (props: any) =>
    <span className={styles["typography__text"]} {...props}>{props.children}</span>    