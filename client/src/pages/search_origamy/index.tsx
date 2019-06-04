import React from "react";
import { Page } from "../../core/component/page";
import { PageHeader } from "../../core/component/typography";
import styles from "./index.module.css";
import { routesMap } from "../../core/routes_map";
import { RouteType } from "../../core/route_type";
import Link from "redux-first-router-link";
import { SearchInput } from "../../core/component/search_input";
import { TiledList } from "../../core/component/tiled_list";
import { SearchOrigamyTile } from "./tile";


export class SearchOrigamyPage extends React.Component {
    public render() {
        return (
            <Page>
                <PageHeader>Схемы оригами</PageHeader>
                <SearchInput className={styles["search"]}/>
                <TiledList
                    tilesData={[1, 2, 3, 4, 5, 6, 7]}
                    numberTilesInRow={2}
                    renderTile={(tileData) => <SearchOrigamyTile />}
                    gap={20}
                />
            </Page>
        );
    }
}
