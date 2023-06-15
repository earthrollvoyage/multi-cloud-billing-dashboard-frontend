import React from 'react';
import { BarChart, Bar, LabelList ,Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'earth-earth...',
    uv: 90000,
    cost: '$20.2',
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    cost: '$19.2',
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    cost: '$18.2',
    pv: 9800,
    amt: 2290,
  }
];

const renderCustomizedLabel = ({ x, y, width, height, value}) => {
  const fireOffset = value.toString().length < 6;
  const offset = fireOffset ? -40 : 6;
  if (value.toString().length >= 4) {
    value = value / 1000
  } else if (value.toString().length < 4 && value.toString().length >= 3){
    value = value / 100
  } else {
    value = value
  }

    return (
        <text x={x + width -offset} y={y + height} fill={fireOffset ? "#285A64" :"#fff"} textAnchor="end" fontSize={13}>
          {'$' + `${value}k`}
        </text>
    );
};

const SimpleBarChart = ({ data }) => {

  	return (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            width={100} 
            height={100} 
            data={data} 
            layout="vertical"
            margin={{top: 5, right: 60, left: 40, bottom: 5}}
          >
            <XAxis hide tick={false} type="number"/>
            <YAxis axisLine={false} tickLine={false}  type="category" dataKey="name" interval={0} tick={{fontSize: 11, angle: 0 }}/>
            {/* <CartesianGrid strokeDasharray="3 3"/> */}
            <Tooltip/>
            {/* <Legend /> */}
            <text y={20} fill="#fff" textAnchor="middle" dominantBaseline="middle">
                  {'$20k'}
          </text>

            <Bar barSize={10} dataKey="total" fill="rgb(108,180,244)" >
              <LabelList dataKey="total" content={renderCustomizedLabel} position="insideRight" style={{ fill: "white" }} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      );
}

export default SimpleBarChart;

// ReactDOM.render(
//   <SimpleBarChart data={data} xKey="name" yKey="pv" />,
//   document.getElementById("root")
// );
