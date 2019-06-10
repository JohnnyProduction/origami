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

const PAGE_SIZE = 4;

interface ISearchOrigamyPage {
    search: string;
    data: IMapiOrigamy[];
    currentPage: number;
    isLoading: boolean;
    total: number;
}

export class SearchOrigamyPage extends React.Component<{}, ISearchOrigamyPage> {
    public state = {
        search: "",
        currentPage: 0,
        data: [],
        isLoading: true,
        total: 0,
    }

    public componentDidMount() {
        MAPI.Origamy.getByFilter({
            from: 0,
            to: PAGE_SIZE,
        }).then(origamy => {
            this.setState({
                currentPage: 0,
                data: origamy.data,
                isLoading: false,
                total: origamy.total,
            });
        });
    }

    private handleSearch = _.throttle(() => {
        this.setState({
            isLoading: true,
        })
        MAPI.Origamy.getByFilter({
            from: 0,
            to: PAGE_SIZE,
            match: {
                name: this.state.search,
            }
        }).then(origamy => {
            this.setState({
                currentPage: 0,
                data: origamy.data,
                isLoading: false,
                total: origamy.total,
            });
        });
    }, 300);

    private handleSearchChanged = (e: SyntheticEvent<HTMLInputElement>) => {
        this.setState({
            search: e.currentTarget.value,
        });
    }

    private handleEndReached = () => {
        this.setState({
            isLoading: true,
        })
        MAPI.Origamy.getByFilter({
            from: this.state.currentPage,
            to: this.state.currentPage + PAGE_SIZE,
            match: {
                name: this.state.search,
            }
        }).then(origamy => {
            this.setState({
                currentPage: this.state.currentPage + PAGE_SIZE,
                data: [...this.state.data, ...origamy.data],
                isLoading: false,
                total: origamy.total,
            });
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
                    isLoading={this.state.isLoading}
                    tilesData={this.state.data}
                    numberTilesInRow={2}
                    renderTile={(tileData) => <SearchOrigamyTile data={tileData} />}
                    gap={20}
                    onEndReached={this.handleEndReached}
                    hideMore={this.state.total <= this.state.data.length}
                />
            </Page>
        );
    }
}
