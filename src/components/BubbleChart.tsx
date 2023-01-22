import { Box } from "@mui/system";
import BubbleChartD3 from "@weknow/react-bubble-chart-d3";
import "./BubbleChart.scss";

export default function BubbleChart(){

  function bubbleClick(label: any){
    console.log("Custom bubble click func")
  }
  function legendClick(label: any){
    console.log("Customer legend click func")
  }
    return(
      <Box className="chart">
        <BubbleChartD3
          graph= {{
            zoom: 1.0,
            offsetX: 0.0,
            offsetY: 0.0,
          }}
          width={500}
          height={500}
          padding={2} // optional value, number that set the padding between bubbles
          showLegend={false} // optional value, pass false to disable the legend.
          valueFont={{
                family: 'Arial',
                size: 12,
                color: '#fff',
                weight: 'bold',
              }}
          labelFont={{
                family: 'Arial',
                size: 14,
                color: '#fff',
                weight: 'bold',
              }}
          //Custom bubble/legend click functions such as searching using the label, redirecting to other page
          bubbleClickFunc={bubbleClick}
          // legendClickFun={legendClick}
          data={[
            { label: 'CRM', value: 1 },
            { label: 'API', value: 1 },
            { label: 'Data', value: 1 },
            { label: 'Commerce', value: 1 },
            { label: 'AI', value: 3 },
            { label: 'Management', value: 5 },
            { label: 'Testing', value: 6 },
            { label: 'Mobile', value: 9 },
            { label: 'Conversion', value: 9 },
            { label: 'Misc', value: 21 },
            { label: 'Databases', value: 22 },
            { label: 'DevOps', value: 22 },
            { label: 'Javascript', value: 23 },
            { label: 'Languages / Frameworks', value: 25 },
            { label: 'Front End', value: 26 },
            { label: 'Content', value: 26 },
          ]}
        />
      </Box>
    )
}