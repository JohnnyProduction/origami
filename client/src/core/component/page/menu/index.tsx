import React from "react";
import styles from "./index.module.css";
import { routesMap } from "../../../routes_map";
import { RouteType } from "../../../route_type";
import Link from "redux-first-router-link";

const menuItems = [
    {
        type: RouteType.HOME,
        name: "Главная",
    },
    {
        type: RouteType.CATEGORIES,
        name: "Категории",
    },
    {
        type: RouteType.SEARCH_ORIGAMY,
        name: "Оригами",
    },
]

export class Menu extends React.PureComponent {
    public render() {
        return (
            <ul className={styles["menu"]}>
                {
                    menuItems.map(link => {
                        const url = routesMap[link.type].path || "";
                        return (
                            <li className={styles["menu__item"]}>
                                <Link to={url} className={styles["menu__link"]}>
                                    {link.name}
                                    <div className={styles["menu__underline"]}></div>
                                </Link>
                            </li>
                        );
                    })
                }
            </ul>
        );
    }
}