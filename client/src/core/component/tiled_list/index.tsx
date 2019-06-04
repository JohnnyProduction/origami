import React from "react";
import classNames from "classnames";
import styles from "./index.module.css";


export interface ITiledListProps<T> {
    // Массив с данными для тайлов. Может начинаться не с первого элемента,
    // тогда смещение задается через tilesOffset 
    tilesData: T[];
    // свойство задающие количество тайлов в строчку. Может принимать число или функцию.
    // Функция принимает текущую ширину списка в px и должна вернуть количество тайлов.
    // Например если мы хотим при ширине в > 500px показывать 2 тайла, а при меньшей 1 тайл.
    // То функция будет выглядеть примерно так: (rowWidth: number) => rowWidth > 500 ? 2 : 1;
    numberTilesInRow: ((rowWidth: number) => number) | number;
    className?: string;
    // Показать иконку загрузки. Если tilesData не пустой то иконка будет в низу списка.
    // Иначе по середине.
    isLoading?: boolean;
    gap?: number; // Размер пространства между тайлами в px
    renderTile: (tileData: T) => JSX.Element;
    // Обработчик на нажатие на стрелочку еще (more) в конце списка
    onEndReached?: () => void;
}

interface ITiledListState {
    currentWidth: number;
}

export class TiledList<T> extends React.Component<ITiledListProps<T>, ITiledListState> {
    public state: ITiledListState = {
        currentWidth: 0,
    }

    private ref: React.RefObject<HTMLUListElement> = React.createRef();

    public componentDidMount() {
        window.addEventListener("resize", this.handleWindowResize);

        this.handleWindowResize();
    }

    public componentWillUnmount() {
        window.removeEventListener("resize", this.handleWindowResize);
    }

    private handleWindowResize = () => {
        if (this.ref.current) {
            this.setState({
                currentWidth: this.ref.current.clientWidth,
            })
        }
    }

    public render() {
        return (
            <ul className={classNames(styles["root"], this.props.className)} ref={this.ref}>
                {this.state.currentWidth && this.renderTiles()}
            </ul>
        );
    }

    private renderTiles() {
        const numberTilesInRow = this.getNumberTilesInRow();
        const tileWidth = 100 / numberTilesInRow;
        const gap = this.props.gap || 0;
        const tileStyle = {
            width: `${tileWidth}%`,
            padding: gap,
            paddingRight: 0,
            paddingBottom: 0,
        }

        const lastLineClearFix = Array.from(new Array(numberTilesInRow - (this.props.tilesData.length % numberTilesInRow)))
            .map((_, i) => (
                <li className={styles["tile"]} key={i + this.props.tilesData.length} style={tileStyle} aria-hidden="true"></li>
            ));

        return this.props.tilesData
            .map((tileData, i) => (
                <li className={styles["tile"]} key={i} style={{
                    ...tileStyle,
                    paddingLeft: i % numberTilesInRow ? gap : 0,
                }}>
                    {this.props.renderTile(tileData)}
                </li>
            )).concat(lastLineClearFix);
    }

    private getNumberTilesInRow(): number {
        const { numberTilesInRow } = this.props;

        if (typeof numberTilesInRow === "function") {
            return (numberTilesInRow as any)(this.state.currentWidth);
        }

        return numberTilesInRow;
    }
}
