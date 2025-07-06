import {
  Chart,
  LineController,
  CategoryScale,
  Tooltip,
  PointElement,
  LineElement,
  LinearScale,
  Filler,
  Title
} from "chart.js";

// Common component to register Chart.js plugins
import { type JSX, onMount } from "solid-js";

type ChartRegisterProps = {
  children: JSX.Element;
};

const ChartRegister = (props: ChartRegisterProps) => {
  onMount(() => {
    Chart.register([
      Title,
      LineController,
      CategoryScale,
      PointElement,
      LineElement,
      LinearScale,
      Tooltip,
      Filler
    ]);
  });
  return props.children;
};

export default ChartRegister;
