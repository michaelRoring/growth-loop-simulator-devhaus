import React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from "recharts";
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";
import { formatCurrency, formatNumber } from "@/utils/simulationUtils";

interface GrowthChartProps {
  data: any[];
  type: "revenue" | "customers" | "marketing";
}

const GrowthChart: React.FC<GrowthChartProps> = ({ data, type }) => {
  const renderTooltip = (props: TooltipProps<ValueType, NameType>) => {
    const { active, payload, label } = props;

    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border rounded shadow-sm">
          <p className="text-sm font-medium mb-1">Month {label}</p>
          {type === "revenue" ? (
            <>
              <p className="text-xs text-[#715AFF]">
                Revenue: {formatCurrency(payload[0].value as number)}
              </p>
              <p className="text-xs text-[#C2008C]">
                Profit: {formatCurrency(payload[1].value as number)}
              </p>
            </>
          ) : type === "customers" ? (
            <p className="text-xs text-[#715AFF]">
              Customers: {formatNumber(payload[0].value as number)}
            </p>
          ) : (
            <p className="text-xs text-[#715AFF]">
              Marketing Budget: {formatCurrency(payload[0].value as number)}
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  const getChartConfig = () => {
    switch (type) {
      case "revenue":
        return {
          yAxisLabel: "Amount ($)",
          areas: [
            {
              dataKey: "revenue",
              name: "Revenue",
              stroke: "#99AFFF",
              fill: "#6688FF",

              fillOpacity: 0.6,
              strokeWidth: 2,
            },
            {
              dataKey: "profit",
              name: "Profit",
              stroke: "#0A00CC",
              fill: "#0D00FF",
              fillOpacity: 0.6,
              strokeWidth: 2,
            },
          ],
        };
      case "customers":
        return {
          yAxisLabel: "Customers",
          areas: [
            {
              dataKey: "customers",
              name: "Customers",
              stroke: "#0A00CC",
              fill: "#0D00FF",
              fillOpacity: 0.6,
              strokeWidth: 2,
            },
          ],
        };
      case "marketing":
        return {
          yAxisLabel: "Budget ($)",
          areas: [
            {
              dataKey: "budget",
              name: "Marketing Budget",
              stroke: "#0A00CC",
              fill: "#0D00FF",
              fillOpacity: 0.6,
              strokeWidth: 2,
            },
          ],
        };
      default:
        return {
          yAxisLabel: "",
          areas: [],
        };
    }
  };

  const config = getChartConfig();

  return (
    <div className="h-full w-full">
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="month"
            label={{
              value: "Month",
              position: "insideBottomRight",
              offset: -5,
            }}
          />
          <YAxis
            label={{
              value: config.yAxisLabel,
              angle: -90,
              position: "insideLeft",
              style: { textAnchor: "middle" },
            }}
            tickFormatter={(value) => {
              if (type === "revenue" || type === "marketing") {
                if (value >= 1000000) {
                  return `$${(value / 1000000).toFixed(1)}M`;
                } else if (value >= 1000) {
                  return `$${(value / 1000).toFixed(0)}K`;
                }
                return `$${value}`;
              } else {
                if (value >= 1000) {
                  return `${(value / 1000).toFixed(0)}K`;
                }
                return value.toString();
              }
            }}
          />
          <Tooltip content={renderTooltip} />
          <Legend />
          {config.areas.map((area, index) => (
            <Area
              key={index}
              type="monotone"
              dataKey={area.dataKey}
              name={area.name}
              stroke={area.stroke}
              fill={area.fill}
              fillOpacity={area.fillOpacity}
              strokeWidth={area.strokeWidth}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GrowthChart;
