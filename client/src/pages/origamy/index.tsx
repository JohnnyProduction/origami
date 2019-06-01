import React from "react";
import { Page } from "../../core/component/page";
import { PageHeader, Text, PageTitle } from "../../core/component/typography";
import styles from "./index.module.css";
import { MAPI } from "../../mapi";

const data = {
    name: "Базовая форма - Водяная бомба",
    photo: "img/base_form_water_bomb/6.png",
    description: "У этой базовой формы имеются две видимые квадратные плоскости,не раскрывающийся («глухой») угол, образованный в центре начальной формы (квадрата), и раскрывающийся угол, расположенный напротив«глухого» и образованный за счет углов квадрата. Это одна из самых часто используемых базовых форм оригами. поэтому важно научиться правильно и довольно быстро складывать ее.",
    points: [
        {
            photo: "img/base_form_water_bomb/1.png",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco labo",
        },
        {
            photo: "img/base_form_water_bomb/2.png",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco labo",
        },
        {
            photo: "img/base_form_water_bomb/3.png",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco labo",
        },
        {
            photo: "img/base_form_water_bomb/4.png",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco labo",
        },
        {
            photo: "img/base_form_water_bomb/5.png",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco labo",
        },
        {
            photo: "img/base_form_water_bomb/6.png",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco labo",
        },
    ]
}



export class OrigamyPage extends React.Component {
    public componentDidMount() {
        // MAPI.Origamy.getById("6CTSxv8PPU").then(value => console.log(value));
        MAPI.Origamy.getByFilter({from: 0, to: 10}).then(value => console.log(value));
    }
    public render() {
        return (
            <Page>
                <section className={styles["origamy-page__section"]}>
                    <PageHeader>{data.name}</PageHeader>
                    <img className={styles["origamy-page__photo"]} src={data.photo}></img>
                    <Text>{data.description}</Text>
                </section>
                
                {
                    data.points.map((point, i) => (
                        <section className={styles["origamy-page__section"]} key={i}>
                            <PageTitle>{`Шаг №${i + 1}`}</PageTitle>
                            <img className={styles["origamy-page__point-photo"]} src={point.photo}></img>
                            <Text>{point.description}</Text>
                        </section>
                    ))
                }
            </Page>
        );
    }
}
