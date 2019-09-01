import React from "react";
import styles from "./index.module.css";
import { Separator } from "../separator";
import { Direction } from "../../types/direction";
import classnames from "classnames";

interface IProps {
    src: string;
    alt?: string;
    className?: string;
    imageClassName?: string;            
}

export const ImageWithFrame = (props: IProps) => {
    return (
        <div className={classnames(styles["root"], props.className)}>
            <img src={props.src} alt={props.alt} className={props.imageClassName} />
            <Separator direction={Direction.RIGHT} classNames={classnames(styles["tl"], styles["h"])}/>
            <Separator direction={Direction.DOWN} classNames={classnames(styles["tl"], styles["v"])}/>
            <Separator direction={Direction.LEFT} classNames={classnames(styles["tr"], styles["h"])}/>
            <Separator direction={Direction.DOWN} classNames={classnames(styles["tr"], styles["v"])}/>
            <Separator direction={Direction.RIGHT} classNames={classnames(styles["bl"], styles["h"])}/>
            <Separator direction={Direction.UP} classNames={classnames(styles["bl"], styles["v"])}/>
            <Separator direction={Direction.LEFT} classNames={classnames(styles["br"], styles["h"])}/>
            <Separator direction={Direction.UP} classNames={classnames(styles["br"], styles["v"])}/>
        </div>
    )
}
