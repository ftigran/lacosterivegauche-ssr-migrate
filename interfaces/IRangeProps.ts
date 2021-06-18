export default interface IRangeProps {
  title: string;
  sliderProps: {
    name: string;
    defaultValue: number;
    min: number;
    step: number;
    //  markStep?:number;
    max: number;
  };
}
