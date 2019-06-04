import React from "react";
import styles from "./tile.module.css";
import starIconUrl from "./star.png";
import starComplexityUrl from "./complexity.png";
import { IconedValue } from "../../core/component/iconed_value";
import { routesMap } from "../../core/routes_map";
import Link from "redux-first-router-link";
import { RouteType } from "../../core/route_type";

export class SearchOrigamyTile extends React.Component {
    public render() {
        return (
            <Link to={routesMap[RouteType.ORIGAMY].path || ""} className={styles["root"]}>
                <img className={styles["img"]} src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Origami-crane.jpg/1200px-Origami-crane.jpg"></img>
                <div  className={styles["right"]}>
                    <h4 className={styles["title"]}>Олень</h4>
                    <dl className={styles["description"]}>
                        <dt className={styles["description__title"]}>Автор</dt>
                        <dd className={styles["description__value"]}>Jo Nakashima</dd>
                        <dt className={styles["description__title"]}>Популярность</dt>
                        <dd className={styles["description__value"]}>
                            <IconedValue
                                iconCount={5}
                                maxValue={10}
                                value={3}
                                renderIcon={(iconFill) => <img className={styles["description__value"]} src={starIconUrl}></img>}
                            />
                        </dd>
                        <dt className={styles["description__title"]}>Сложность</dt>
                        <dd className={styles["description__value"]}>
                            <IconedValue
                                iconCount={5}
                                maxValue={10}
                                value={3}
                                renderIcon={(iconFill) => <img className={styles["description__value"]} src={starComplexityUrl}></img>}
                            />
                        </dd>
                        <dt className={styles["description__title"]}>Длительность</dt>
                        <dd className={styles["description__value"]}>8/10</dd>
                    </dl>
                </div>
            </Link>
        );
    }
}
