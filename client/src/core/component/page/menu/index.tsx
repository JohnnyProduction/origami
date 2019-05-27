import React from "react";
import styles from "./index.module.css";

const data = [
    {
        name: "Главная",
        url: "/",
    },
    {
        name: "Категории",
        url: "/",
    },
    {
        name: "Оригами",
        url: "/",
    },
]

export class Menu extends React.PureComponent {
    public render() {
        return (
            <ul className={styles["menu"]}>
                {
                    data.map(link => (
                        <li className={styles["menu__item"]}>
                            <a href={link.url} className={styles["menu__link"]}>
                                {link.name}
                                <div className={styles["menu__underline"]}></div>
                            </a>
                        </li>
                    ))
                }
            </ul>
        );
    }
}