import React from "react";
import { BarChart } from "@mui/x-charts/BarChart";

const data = [
  { month: "Jan", revenue: 1000 },
  { month: "Feb", revenue: 1500 },
  { month: "Mar", revenue: 2000 },
  { month: "Apr", revenue: 2500 },
  { month: "May", revenue: 3000 },
  { month: "Jun", revenue: 3500 },
  { month: "Jul", revenue: 4000 },
  { month: "Aug", revenue: 4500 },
  { month: "Sep", revenue: 5000 },
  { month: "Oct", revenue: 5500 },
  { month: "Nov", revenue: 6000 },
  { month: "Dec", revenue: 6500 },
];

const formatEGP = (value) => `${value.toLocaleString()} EGP`;

export default function RevenueBars() {
  return (
    <div
      style={{
        width: 1100,
        height: 340,
        margin: "auto",
        background: "var(--card-bg)",
        padding: "20px",
        borderRadius: "12px",
      }}
    >
      <h3
        style={{
          textAlign: "center",
          margin: 0,
          marginBottom: 10,
          color: "var(--text-dark)",
          fontWeight: 600,
        }}
      >
        Monthly Revenue
      </h3>

      <BarChart
        dataset={data}
        xAxis={[
          {
            scaleType: "band",
            dataKey: "month",
            tickLabelPlacement: "middle",
            tickPlacement: "middle",
            tickSize: 4,
            tickFontSize: 12,
            color: "var(--text-light)",
            stroke: "var(--text-light)",
          },
        ]}
        series={[
          {
            dataKey: "revenue",
            color: "var(--primary)",
            valueFormatter: formatEGP,
          },
        ]}
        slotProps={{
          tooltip: {
            sx: {
              fontSize: "5px",       
              padding: "4px 6px",    
              borderRadius: "6px",
              backgroundColor: "var(--card-bg)",
              boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
            },
          },
          
          bar: {
            barGap: 5,
            barCategoryGap: 70,
          },
        }}
        yAxis={[
          {
            label: "Revenue",
            color: "var(--text-light)",
          },
        ]}
        height={280}
        grid={{ horizontal: true, vertical: false, stroke: "var(--chart-grid)" }}
        sx={{
          "& .MuiChartsAxis-tickLabel": {
            fill: "var(--text-light)",
            fontSize: 12,
          },
          "& .MuiChartsAxis-line": {
            stroke: "transparent",
          },
          "& .MuiChartsGrid-line": {
            stroke: "var(--chart-grid)",
          },
        }}
      />
    </div>
  );
}
