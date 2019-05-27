import React from "react";
import { Provider, connect } from "react-redux";
import { store } from "../../store";
import { IRouterState } from "../../store/reducer/router";
import { routesMap } from "../../routes_map";
import { IRootState } from "../../store/reducer";

export class App extends React.PureComponent {
    public render() {
        return (
            <Provider store={store}>
                <PageSelector />
            </Provider>
        );
    }
}

interface IPageSelectorProps {
    router: IRouterState;
}

class PageSelectorComponent extends React.PureComponent<IPageSelectorProps> {
    public render() {
        const CurrentPage: any = routesMap[this.props.router.type]
            ? routesMap[this.props.router.type].component
            : <div></div>;

        return <CurrentPage />;
    }
}

const PageSelector = connect(
    (state: IRootState) => ({
        router: state.router,
    }),
)(PageSelectorComponent);
