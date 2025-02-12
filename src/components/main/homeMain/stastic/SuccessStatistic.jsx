import React from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const corruptionData = [
  { sector: "Education", cases: 150, loss: 50 },
  { sector: "Healthcare", cases: 200, loss: 80 },
  { sector: "Police", cases: 250, loss: 100 },
  { sector: "Transport", cases: 100, loss: 40 },
  { sector: "Government", cases: 180, loss: 90 },
];

const corruptionTypes = [
  { name: "Bribery", value: 45 },
  { name: "Embezzlement", value: 25 },
  { name: "Fraud", value: 15 },
  { name: "Extortion", value: 15 },
];

const COLORS = ["#E23670", "#E68B34", "#3DB78A", "#AE57DA"];
const totalCases = corruptionTypes.reduce((acc, curr) => acc + curr.value, 0);

const SuccessStatistic = () => {
  return (
    <section className="py-16 px-6 screen">
      <h1 className="text-4xl mb-12 mt-20 playfair font-bold text-start text-[#329980]">
        Corruption Statistics in Bangladesh
      </h1>

      <div className="flex flex-col lg:flex-row justify-center items-center gap-10">
        {/* Bar Chart */}
        <div className="w-full lg:w-1/2 bg-[#24303F] p-6 rounded-lg shadow-md">
          {/* <h2 className="text-xl font-semibold text-[#164193] mb-4 text-center">
            Corruption Cases by Sector
          </h2> */}
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart
              data={corruptionData}
              margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="sector" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="loss" fill="#b770db" stroke="#3AB092" />
              <Bar dataKey="cases" barSize={40} fill="#AE57DA" />
              <Line type="monotone" dataKey="loss" stroke="#D32F2F" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Donut Chart */}
        <div className="relative w-full lg:w-1/2 bg-[#24303F] p-6 rounded-lg shadow-md flex flex-col items-center">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                dataKey="value"
                data={corruptionTypes}
                cx="50%"
                cy="50%"
                innerRadius={70} // Creates the donut effect
                outerRadius={100}
                paddingAngle={5}
                fill="#8884d8"
                label
              >
                {corruptionTypes.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>

          {/* Centered Text in Donut */}
          <div className="absolute top-1/2 left-1/2 text-center transform -translate-x-1/2 -translate-y-1/2 text-white text-2xl font-bold">
            {totalCases}
            <p className="text-sm">Total Cases</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessStatistic;
