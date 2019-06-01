import React from "react";
import classNames from "classnames";
import styles from "./input.module.css";

type IRowSizeProp = ((fullWidth: number) => number) | number;

export interface ITiledListProps<T> {
    isLoading: boolean;
    tilesData: T[];
    gap?: number;
    rowSize: IRowSizeProp;
    renderTile: (tileData: T) => JSX.Element;
    onEndReached?: () => void;
}
// Основная идея:
// Автоматическое распределение тайлов по сетке в зависимости от их размеров и размеров экрана
// Плавное появление (с отложенной перерисовкой) каждого тайла

export class TiledList<T> extends React.Component<ITiledListProps<T>> {
    
}
