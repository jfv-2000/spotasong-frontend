import { Typography } from "@mui/material";
import { Box } from "@mui/system";
// @ts-ignore
import BubbleChartD3 from "@weknow/react-bubble-chart-d3";
import "./BubbleChart.scss";

export default function BubbleChart({ data }: { data: any[] }) {
  return (
    <Box className="chart">
      {data.length == 0 ? (
        <Typography>No data to display.</Typography>
      ) : (
        <BubbleChartD3
          graph={{
            zoom: 1.0,
            offsetX: 0.0,
            offsetY: 0.0,
          }}
          width={500}
          height={500}
          padding={2} // optional value, number that set the padding between bubbles
          showLegend={true} // optional value, pass false to disable the legend.
          valueFont={{
            family: "Arial",
            size: 12,
            color: "#fff",
            weight: "bold",
          }}
          labelFont={{
            family: "Arial",
            size: 14,
            color: "#fff",
            weight: "bold",
          }}
          //Custom bubble/legend click functions such as searching using the label, redirecting to other page
          legendFont={{
            family: "Arial",
            size: 10,
            color: "#000",
            weight: "bold",
          }}
          // legendClickFun={legendClick}
          data={data}
        />
      )}
    </Box>
  );
}
