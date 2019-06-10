import React from "react";
import styles from "./tile.module.css";
import starIconUrl from "./star.png";
import starComplexityUrl from "./complexity.png";
import { IconedValue } from "../../core/component/iconed_value";
import { routesMap } from "../../core/routes_map";
import Link from "redux-first-router-link";
import { RouteType } from "../../core/route_type";
import { IMapiOrigamy } from "../../mapi/origamy";

interface ISearchOrigamyTileProps {
    data: IMapiOrigamy;
}

export class SearchOrigamyTile extends React.Component<ISearchOrigamyTileProps> {
    public render() {
        const link = `${routesMap[RouteType.ORIGAMY].path}/${this.props.data.id}`;
        const imgUrl = `img/${this.props.data.id}/6.png`;
        return (
            <Link to={link} className={styles["root"]}>
                <img className={styles["img"]} src={imgUrl}></img>
                <div  className={styles["right"]}>
                    <h4 className={styles["title"]}>{this.props.data.name}</h4>
                    <dl className={styles["description"]}>
                        <dt className={styles["description__title"]}>Автор</dt>
                        <dd className={styles["description__value"]}>Jo Nakashima</dd>
                        <dt className={styles["description__title"]}>Популярность</dt>
                        <dd className={styles["description__value"]}>
                            <IconedValue
                                iconCount={5}
                                maxValue={10}
                                value={this.props.data.rating}
                                renderIcon={(iconFill) => <img className={styles["description__value"]} src={starIconUrl}></img>}
                            />
                        </dd>
                        <dt className={styles["description__title"]}>Сложность</dt>
                        <dd className={styles["description__value"]}>
                            <IconedValue
                                iconCount={5}
                                maxValue={10}
                                value={this.props.data.complexity}
                                renderIcon={(iconFill) => <img className={styles["description__value"]} src={starComplexityUrl}></img>}
                            />
                        </dd>
                        <dt className={styles["description__title"]}>Длительность</dt>
                        <dd className={styles["description__value"]}>{this.props.data.duration}</dd>
                    </dl>
                </div>
            </Link>
        );
    }
}
