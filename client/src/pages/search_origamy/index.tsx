import React, { SyntheticEvent } from "react";
import { Page } from "../../core/component/page";
import { PageHeader } from "../../core/component/typography";
import styles from "./index.module.css";
import { SearchInput } from "../../core/component/search_input";
import { TiledList } from "../../core/component/tiled_list";
import { SearchOrigamyTile } from "./tile";
import { IMapiOrigamy } from "../../mapi/origamy";
import _ from "lodash";
import { MAPI } from "../../mapi";

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

    private handleSearch = _.throttle(() => {
        this.setState({
            isLoading: true,
        })
        MAPI.Origamy.getByFilter({
            from: 0,
            to: 10,
            match: {
                name: this.state.search,
            }
        }).then(origamy => {
            this.setState({
                data: origamy.data,
                isLoading: false,
            });
        });
    }, 300);

    private handleSearchChanged = (e: SyntheticEvent<HTMLInputElement>) => {
        this.setState({
            search: e.currentTarget.value,
        });
    }

    public render() {
        return (
            <Page>
                <PageHeader>Схемы оригами</PageHeader>
                <SearchInput
                    className={styles["search"]}
                    value={this.state.search}
                    onSearchClick={this.handleSearch}
                    onChange={this.handleSearchChanged}
                />
                <TiledList
                    tilesData={this.state.data}
                    numberTilesInRow={2}
                    renderTile={(tileData) => <SearchOrigamyTile data={tileData} />}
                    gap={20}
                />
            </Page>
        );
    }
}
