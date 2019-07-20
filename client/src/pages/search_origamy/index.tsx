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
import { Subject, Observable, Subscription } from "rxjs";
import { flatMap } from "rxjs/operators";
import { IPage } from "../../mapi/paging";

const PAGE_SIZE = 4;

interface ISearchOrigamyPage {
    search: string;
    data: IMapiOrigamy[];
    currentPage: number;
    isLoading: boolean;
    total: number;
}

export class SearchOrigamyPage extends React.Component<{}, ISearchOrigamyPage> {
    private origamyPage$: Observable<IPage<IMapiOrigamy>>;
    private fetchOrigamy$ = new Subject<number>();
    private origamySubscription: Subscription | null = null;

    public state = {
        search: "",
        currentPage: 0,
        data: [],
        isLoading: true,
        total: 0,
    }

    constructor(props: {}) {
        super(props);

        this.origamyPage$ = this.fetchOrigamy$.pipe(
            flatMap((pageNumber) => {
                return MAPI.Origamy.getByFilter({
                    start: pageNumber * PAGE_SIZE,
                    limit: PAGE_SIZE,
                });
            }),
        );
    }

    public componentDidMount() {
        this.fetchOrigamyPage(0);
    }

    private fetchOrigamyPage(pageNumber: number) {
        if (this.origamySubscription) {
            this.origamySubscription.unsubscribe();
        }

        this.setState({
            isLoading: true,
            data: pageNumber === 0 ? [] : this.state.data,
        });

        this.origamySubscription = this.origamyPage$.subscribe(page => {
            this.setState({
                data: [...this.state.data, ...page.data],
                currentPage: Math.floor(page.start / PAGE_SIZE),
                isLoading: false,
            });
            console.log(this.state.data)
        });

        this.fetchOrigamy$.next(pageNumber);
    }

    public componentWillUnmount() {
        if (this.origamySubscription) {
            this.origamySubscription.unsubscribe();
        }
    }

    private handleSearch = _.throttle(() => {
        this.fetchOrigamyPage(0);
    }, 300);

    private handleSearchChanged = (e: SyntheticEvent<HTMLInputElement>) => {
        this.setState({
            search: e.currentTarget.value,
        });
    }

    private handleEndReached = () => {
        this.fetchOrigamyPage(this.state.currentPage + 1);
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
