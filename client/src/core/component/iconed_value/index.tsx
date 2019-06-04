import React, {InputHTMLAttributes } from "react";
import classNames from "classnames";
import styles from "./index.module.css";

export interface IIconedValueProps {
    iconCount: number;
    value: number;
    maxValue: number;
    renderIcon: (iconFill: number) => JSX.Element;
}

export const IconedValue = (props: IIconedValueProps) => (
    <div className={styles["root"]}>
        {
            Array.from(new Array(props.iconCount).keys())
                .map((_, i) => {
                    const iconValue = props.maxValue / props.iconCount;
                    const fill = iconValue * i;
                    const iconFill = fill < props.value ? 1 : Math.max(0, (fill - props.value) / iconValue);

                    return (
                        <div className={styles["icon"]}>
                            {props.renderIcon(iconFill)}
                        </div>
                    );
                })
        }
    </div>
);
