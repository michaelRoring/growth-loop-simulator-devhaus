
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { QuarterlyData, formatCurrency, formatNumber, formatPercentage } from '@/utils/simulationUtils';

interface PerformanceScorecardProps {
  data: QuarterlyData[];
}

const PerformanceScorecard: React.FC<PerformanceScorecardProps> = ({ data }) => {
  return (
    <div className="overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Quarter</TableHead>
            <TableHead>Revenue</TableHead>
            <TableHead>QoQ Growth</TableHead>
            <TableHead>Profit</TableHead>
            <TableHead>QoQ Growth</TableHead>
            <TableHead>End Customers</TableHead>
            <TableHead>New Customers</TableHead>
            <TableHead>QoQ Growth</TableHead>
            <TableHead>ROI</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((quarter) => (
            <TableRow key={quarter.quarter}>
              <TableCell>Q{quarter.quarter}</TableCell>
              <TableCell>{formatCurrency(quarter.revenue)}</TableCell>
              <TableCell>
                <div className={quarter.qoqRevenueGrowth > 0 ? "positive-growth" : ""}>
                  {quarter.qoqRevenueGrowth > 0 ? '+' : ''}{formatPercentage(quarter.qoqRevenueGrowth)}
                </div>
              </TableCell>
              <TableCell>{formatCurrency(quarter.profit)}</TableCell>
              <TableCell>
                <div className={quarter.qoqProfitGrowth > 0 ? "positive-growth" : ""}>
                  {quarter.qoqProfitGrowth > 0 ? '+' : ''}{formatPercentage(quarter.qoqProfitGrowth)}
                </div>
              </TableCell>
              <TableCell>{formatNumber(quarter.customersEnd)}</TableCell>
              <TableCell>{formatNumber(quarter.newCustomers)}</TableCell>
              <TableCell>
                <div className={quarter.qoqCustomerGrowth > 0 ? "positive-growth" : ""}>
                  {quarter.qoqCustomerGrowth > 0 ? '+' : ''}{formatPercentage(quarter.qoqCustomerGrowth)}
                </div>
              </TableCell>
              <TableCell>
                <div className={quarter.roi > 0 ? "positive-growth" : ""}>
                  {formatPercentage(quarter.roi)}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PerformanceScorecard;
