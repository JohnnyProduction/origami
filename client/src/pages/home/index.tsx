import React from "react";
import { Page } from "../../core/component/page";
import { PageHeader } from "../../core/component/typography";
import styles from "./index.module.css";


export class HomePage extends React.Component {
    public render() {
        return (
            <Page>
                <PageHeader>Home</PageHeader>
            </Page>
        );
    }
}
