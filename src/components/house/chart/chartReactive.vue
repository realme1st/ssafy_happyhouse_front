<script>
import { Bar } from "vue-chartjs/legacy";

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);
//Getting the reactiveProp mixin from the mixins module.
// const { reactiveProp } = mixins;
export default {
  extends: Bar,
  // mixins: [reactiveProp],
  components: { Bar },

  props: {
    chartId: {
      type: String,
      default: "bar-chart",
    },
    datasetIdKey: {
      type: String,
      default: "label",
    },
    width: {
      type: Number,
      default: 300,
    },
    height: {
      type: Number,
      default: 200,
    },
    cssClasses: {
      default: "",
      type: String,
    },
    styles: {
      type: Object,
      default: () => {},
    },
    plugins: {
      type: Object,
      default: () => {},
    },
  },
  mounted() {
    // this.chartData is created in the mixin and contains all the data needed to build the chart.
    // this.renderChart(this.chartData, this.options);
  },
  data() {
    return {};
  },
};
</script>
