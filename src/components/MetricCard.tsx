
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ChartLine, DollarSign, Users, BarChart } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  description: string;
  type: "revenue" | "profit" | "customers" | "roi";
  growth?: number;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  description,
  type,
  growth
}) => {
  const getIcon = () => {
    switch (type) {
      case "revenue":
        return <DollarSign className="h-5 w-5 text-blue-500" />;
      case "profit":
        return <DollarSign className="h-5 w-5 text-green-600" />;
      case "customers":
        return <Users className="h-5 w-5 text-purple-500" />;
      case "roi":
        return <BarChart className="h-5 w-5 text-orange-500" />;
      default:
        return <ChartLine className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col">
          <div className="flex items-center mb-2 gap-1">
            {getIcon()}
            <span className="text-sm font-medium text-gray-500">{title}</span>
          </div>
          <div className="text-2xl font-bold mb-1">{value}</div>
          <div className="text-xs text-gray-500">{description}</div>
          {growth !== undefined && (
            <div className="mt-2 text-sm positive-growth">
              +{growth}% growth
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MetricCard;
