import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import styled from 'styled-components';
const ChartCon=styled.div`
width:600px;
height:250px;
box-shadow: rgba(0, 0, 0,0.7) 0px 0px 0px 0.1px, rgb(209, 213, 219) 0px 0px 0px 0.4px inset;
padding:10px
`
const data = [
  {
    name: 'Previous Month',
    uv: 1000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Last Month',
    uv: 5000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'This Month',
    uv: 1000,
    pv: 9800,
    amt: 8290,
  },
  
];




  const Chart=()=> {
    return (
        <ChartCon>

      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={500}
          height={400}
          data={data}
          margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
            >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
      </ResponsiveContainer>
            </ChartCon>
    );
  }

  export default Chart
