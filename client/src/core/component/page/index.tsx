import React from "react";
import styles from "./index.module.css";
import logoUrl from "./logo-fox.png"
import { Menu } from "./menu";

export class Page extends React.PureComponent {
    public render() {
        return (
            <div className={styles["page"]}>
                <div className={styles["page__bg-left"]}></div>
                <div className={styles["page__content"]}>
                    <header className={styles["page__header"]}>
                        <img className={styles["page__logo"]} src={logoUrl}></img>
                    </header>
                    <div>
                        <nav>
                            <Menu></Menu>
                        </nav>
                    </div>
                    <main className={styles["page__content-main"]}>
                        {this.props.children}
                    </main>
                    <footer className={styles["page__content-footer"]}>

                    </footer>
                </div>
                <div className={styles["page__bg-right"]}></div>
            </div>
        );
    }
}
