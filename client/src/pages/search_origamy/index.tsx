import React from "react";
import { Page } from "../../core/component/page";
import { PageHeader } from "../../core/component/typography";
import styles from "./index.module.css";
import { routesMap } from "../../core/routes_map";
import { RouteType } from "../../core/route_type";
import Link from "redux-first-router-link";
import { SearchInput } from "../../core/component/search_input";


export class SearchOrigamyPage extends React.Component {
    public render() {
        return (
            <Page>
                <PageHeader>Схемы оригами</PageHeader>
                <SearchInput />
                
                <Link to={routesMap[RouteType.ORIGAMY].path || ""}>to some origamy</Link>
            </Page>
        );
    }
}
