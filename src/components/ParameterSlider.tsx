import React from "react";
import { Slider } from "@/components/ui/slider";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ParameterSliderProps {
  label: string;
  value: number;
  onChange: (value: number[]) => void;
  min: number;
  max: number;
  step?: number;
  tooltip?: string;
  tips?: string;
  bestPractice?: string;
  prefix?: string;
  suffix?: string;
  defaultValue?: number[];
}

const ParameterSlider: React.FC<ParameterSliderProps> = ({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  tooltip,
  tips,
  bestPractice,
  prefix = "",
  suffix = "",
  defaultValue,
}) => {
  return (
    <div className="mb-4">
      <div className="parameter-label">
        {label}
        {tooltip && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 info-icon" />
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p className="mb-4">{tooltip}</p>
                <hr />
                <p className="py-2 font-bold underline">Tips</p>
                <p>{tips}</p>
                <hr />
                <p className="py-2 font-bold underline">Best practice</p>
                <p>{bestPractice}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <Slider
            value={[value]}
            min={min}
            max={max}
            step={step}
            onValueChange={onChange}
            defaultValue={defaultValue}
            className="mb-2"
          />
        </div>
        <div className="text-right w-20 text-sm font-medium">
          {prefix}
          {value.toLocaleString()}
          {suffix}
        </div>
      </div>
      <div className="flex justify-between text-xs text-gray-500">
        <span>
          {prefix}
          {min.toLocaleString()}
          {suffix}
        </span>
        <span>
          {prefix}
          {max.toLocaleString()}
          {suffix}
        </span>
      </div>
    </div>
  );
};

export default ParameterSlider;
