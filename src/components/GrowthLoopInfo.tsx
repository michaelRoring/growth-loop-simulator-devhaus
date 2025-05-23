
import React, { useState } from 'react';
import { ChevronDown } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const GrowthLoopInfo: React.FC = () => {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">Understanding Growth Loops</h2>
      <p className="text-gray-600 mb-4">Learn how paid acquisition loops drive e-commerce growth</p>
      
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>What are growth loops?</AccordionTrigger>
          <AccordionContent>
            <p>
              Growth loops are self-reinforcing systems where the output of one process becomes the input of another, 
              creating a continuous cycle of growth. In e-commerce, a paid acquisition growth loop converts marketing 
              spend into new customers, generating revenue that can be reinvested into more marketing, acquiring more 
              customers, and so on.
            </p>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-2">
          <AccordionTrigger>How do paid acquisition loops work?</AccordionTrigger>
          <AccordionContent>
            <p>
              The basic flow of a paid acquisition loop is:
            </p>
            <ol className="list-decimal ml-5 mt-2 space-y-1">
              <li>Invest marketing budget to acquire new customers</li>
              <li>New customers generate revenue through purchases</li>
              <li>A portion of revenue becomes profit</li>
              <li>Reinvest a percentage of profit back into marketing</li>
              <li>Cycle repeats, compounding growth over time</li>
            </ol>
            <p className="mt-2">
              The efficiency of this loop depends on your customer acquisition cost (CAC), average order value (AOV), 
              purchase frequency, profit margins, and reinvestment rate.
            </p>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-3">
          <AccordionTrigger>Key metrics to track</AccordionTrigger>
          <AccordionContent>
            <ul className="list-disc ml-5 space-y-2">
              <li><span className="font-medium">Customer Acquisition Cost (CAC):</span> The cost to acquire one new customer</li>
              <li><span className="font-medium">Average Order Value (AOV):</span> Average amount spent per order</li>
              <li><span className="font-medium">Purchase Frequency:</span> How often customers make purchases in a given time period</li>
              <li><span className="font-medium">Customer Lifetime Value (LTV):</span> Total revenue expected from a customer</li>
              <li><span className="font-medium">LTV:CAC Ratio:</span> Ideally 3:1 or higher for sustainable growth</li>
              <li><span className="font-medium">Profit Margin:</span> Percentage of revenue that becomes profit</li>
              <li><span className="font-medium">Return on Ad Spend (ROAS):</span> Revenue generated per dollar of ad spend</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-4">
          <AccordionTrigger>How to optimize your growth loop</AccordionTrigger>
          <AccordionContent>
            <p>To improve the efficiency of your growth loop:</p>
            <ul className="list-disc ml-5 mt-2 space-y-2">
              <li><span className="font-medium">Lower CAC:</span> Improve targeting, ad creative, or landing page conversion rates</li>
              <li><span className="font-medium">Increase AOV:</span> Add upsells, cross-sells, or bundle products</li>
              <li><span className="font-medium">Boost Purchase Frequency:</span> Implement subscription models, loyalty programs, or email marketing</li>
              <li><span className="font-medium">Improve Margins:</span> Optimize pricing, reduce COGS, or streamline operations</li>
              <li><span className="font-medium">Test Reinvestment Rate:</span> Find the optimal percentage that balances growth with profitability</li>
            </ul>
            <p className="mt-2">
              Even small improvements in these metrics can dramatically impact long-term growth due to the compounding effect.
            </p>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-5">
          <AccordionTrigger>Common challenges and solutions</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3">
              <div>
                <h4 className="font-medium">Challenge: Rising CAC over time</h4>
                <p>Solution: Diversify acquisition channels, improve targeting, and focus on retention to reduce dependence on new customer acquisition.</p>
              </div>
              
              <div>
                <h4 className="font-medium">Challenge: Cash flow constraints</h4>
                <p>Solution: Optimize payment terms, improve inventory management, and consider financing options for marketing spend.</p>
              </div>
              
              <div>
                <h4 className="font-medium">Challenge: Scaling operations</h4>
                <p>Solution: Invest in infrastructure, automation, and team capacity in anticipation of growth.</p>
              </div>
              
              <div>
                <h4 className="font-medium">Challenge: Market saturation</h4>
                <p>Solution: Expand to new market segments or geographies, or develop new products/services.</p>
              </div>
              
              <div>
                <h4 className="font-medium">Challenge: Forecasting accuracy</h4>
                <p>Solution: Continuously test assumptions and update your model with actual performance data.</p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default GrowthLoopInfo;
