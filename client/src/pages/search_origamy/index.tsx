import React from "react";
import { Page } from "../../core/component/page";
import { PageHeader } from "../../core/component/typography";
import styles from "./index.module.css";
import { routesMap } from "../../core/routes_map";
import { RouteType } from "../../core/route_type";
import Link from "redux-first-router-link";


export class SearchOrigamyPage extends React.Component {
    public render() {
        return (
            <Page>
                <PageHeader>SearchOrigamyPage</PageHeader>
                <Link to={routesMap[RouteType.ORIGAMY].path || ""}>to some origamy</Link>
            </Page>
        );
    }
}
