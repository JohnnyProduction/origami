import React from "react";
import { Page } from "../../core/component/page";
import { PageHeader } from "../../core/component/typography";
import styles from "./index.module.css";
import { SearchInput } from "../../core/component/search_input";
import { TiledList } from "../../core/component/tiled_list";
import { SearchOrigamyTile } from "./tile";
import { IMapiOrigamy } from "../../mapi/origamy";
import { string } from "prop-types";

interface ISearchOrigamyPage {
    search: string;
    data: IMapiOrigamy[];
    isLoading: boolean;
}

export class SearchOrigamyPage extends React.Component<{}, ISearchOrigamyPage> {
    public state = {
        search: "",
        data: [],
        isLoading: true,
    }

    public componentDidMount() {
        
    }


    public render() {
        return (
            <Page>
                <PageHeader>Схемы оригами</PageHeader>
                <SearchInput className={styles["search"]} value={this.state.search}/>
                <TiledList
                    tilesData={this.state.data}
                    numberTilesInRow={2}
                    renderTile={(tileData) => <SearchOrigamyTile />}
                    gap={20}
                />
            </Page>
        );
    }
}
