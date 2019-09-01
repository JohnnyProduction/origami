import React from "react"
import { Direction } from "../../types/direction";
import styles from "./index.module.css";
import classNames from "classnames";

interface IProps {
    direction: Direction;
    roundSize?: number;
    classNames?: string;
}

export const Separator = (props: IProps) => {
    const roundSize = props.roundSize || 1;
    return (
        <div className={classNames(
            styles["root"],
            classNames({
                [styles["up"]]: props.direction === Direction.UP,
                [styles["down"]]: props.direction === Direction.DOWN,
                [styles["left"]]: props.direction === Direction.LEFT,
            }),
            props.classNames,
        )}>
            <div className={styles["l_1"]}/>
            <div className={styles["l_2"]}/>
            <div className={styles["l_3"]}/>
            <div className={styles["l_4"]}/>
            <div className={styles["clearfix"]}/>
        </div>
    )
}
