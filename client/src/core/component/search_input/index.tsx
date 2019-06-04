import React, { SyntheticEvent } from "react";
import classNames from "classnames";
import styles from "./index.module.css";
import { IInputProps, Input } from "../input";
import searchIconUrl from "./search_icon.png";

export interface ISearchInputProps extends IInputProps {
    onSearchClick?: (e: SyntheticEvent<HTMLButtonElement>) => void;
}

export const SearchInput = (props: ISearchInputProps) => (
    <div className={classNames(styles["root"], props.className)}>
        {/* className после props, что бы props.className не сайдэфектил */}
        <Input {...props} className={styles["input"]} placeholder={"Поиск"}/>
        <button className={styles["button"]} onClick={props.onSearchClick}>
            <img className={styles["button_icon"]} src={searchIconUrl} />
        </button>
    </div>
);
