import styled from "@emotion/styled";
// import Slider from '@material-ui/core/Slider';
import MainLayout from "../components/mainlayout";
// import { Range } from 'react-range';
import IRangeProps from "../interfaces/IRangeProps";

const Container = styled.form`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr;
  grid-gap: 40px;
  max-width: 1460px;
`;
const Button = styled.button`
background: #FDD207;
font-family: Roboto;
font-style: normal;
font-weight: bold;
font-size: 49px;
line-height: 57px;
min-width 390px;
height: 110px;
border-radius: 55px;
color: #371548;
border: none;
min-width: 390px;
`;
const ranges: IRangeProps[] = [
  {
    title: "Сколько слов",
    sliderProps: {
      name: "quantityWords",
      defaultValue: 7,
      min: 1,
      step: 1,
      max: 10,
    },
  },
  {
    title: "Стартовое расстояние",
    sliderProps: {
      name: "lenghtOfWord",
      defaultValue: 25,
      min: 5,
      step: 5,
      max: 40,
    },
  },
  {
    title: "Сколько букв в словах",
    sliderProps: {
      name: "startDistance",
      defaultValue: 9,
      min: 3,
      step: 1,
      max: 16,
    },
  },
  {
    title: "Увеличение расстояния",
    sliderProps: {
      name: "changeDistance",
      defaultValue: 25,
      min: 5,
      step: 5,
      max: 40,
    },
  },
];
const speed = "speed";

export default function Home() {
  return (
    <MainLayout title={"Settings"} pageTitle="Тренажер «Поле зрения»">
    </MainLayout>
  );
}
