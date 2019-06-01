import React, { SyntheticEvent } from "react";
import classNames from "classnames";
import styles from "./input.module.css";
import { IInputProps, Input } from "../input";

export interface ISearchInputProps extends IInputProps {
    onSearchClick?: (e: SyntheticEvent<HTMLButtonElement>) => void;
}

export const SearchInput = (props: ISearchInputProps) => (
    <div className={classNames(styles["search-input"], props.className)}>
        {/* className после props, что бы props.className не сайдэфектил */}
        <Input {...props} className={styles["search-input__input"]}/>
        <button className={styles["search-input__button"]} onClick={props.onSearchClick}></button>
    </div>
);
