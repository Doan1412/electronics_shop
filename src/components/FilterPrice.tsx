import React, { useEffect, useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useFilterContext } from "../contexts/FilterContext";
import { FilterParams } from "../types/filterParams.type";

const PriceHandle = ({ value, min, max, ...restProps }: any) => {
  const position = ((value - min) / (max - min)) * 100;
  const { prefixCls, dragging, ...rest } = restProps;

  return (
    <>
      <div
        style={{ left: `${position}%` }}
        className="absolute -translate-x-1/2 -translate-y-full mb-2 flex items-center justify-center top-[2px]"
      >
        <span className="text-[#e2a400] text-xs font-semibold p-1">$</span>
        <span className="text-[12px] font-bold">{value}</span>
      </div>
      <div
        {...rest}
        style={{ left: `${position}%` }}
        className="
          absolute 
          h-4 w-4 
          z-[1] 
          bg-gradient-to-b from-white to-[#f5f5fa] 
          rounded-full 
          outline-none 
          transform -translate-x-1/2 -translate-y-1/2 
          shadow-lg 
          border border-yellow-500
          mt-[2px]
        "
      ></div>
    </>
  );
};

const PriceFilter = () => {
  const startPrice = 1;
  const endPrice= 5000;

  const { filters, setFilters } = useFilterContext();
  const [sliderRange, setSliderRange] = useState<[number, number]>([startPrice, endPrice]);

  useEffect(() => {
    setSliderRange([startPrice, endPrice]);
  }, [startPrice, endPrice]);

  useEffect(() => {
    if (filters.price) {
      setSliderRange([filters.price.min || startPrice, filters.price.max || endPrice]);
    } else {
      setSliderRange([startPrice, endPrice]);
    }
  }, [filters]);

  const handlePriceChange = (value: number | number[]) => {
    if (Array.isArray(value) && value.length === 2) {
      setSliderRange(value as [number, number]);

      setFilters((prevFilters: FilterParams) => {
        const updatedFilters = { ...prevFilters };

        if (value[0] !== startPrice || value[1] !== endPrice) {
          updatedFilters.price = {
            min: value[0],
            max: value[1],
          };
        } else {
          delete updatedFilters.price;
        }

        return updatedFilters;
      });
    }
  };

  return (
    <div className="mb-6">
      <h3 className="text-xs font-semibold uppercase tracking-[0.2em] mb-4">
        Price
      </h3>
      <div className="relative w-full pt-5">
        <Slider
          range
          min={startPrice}
          max={endPrice}
          value={sliderRange}
          onChange={(value) => setSliderRange(value as [number, number])}
          onAfterChange={handlePriceChange}
          handleRender={(node, props) => <PriceHandle {...props} min={startPrice} max={endPrice} />}
          trackStyle={[{ backgroundColor: "#e2a400", height: "5px" }]}
          railStyle={{ backgroundColor: "#ddd", height: "5px" }}
        />
      </div>
    </div>
  );
};

export default PriceFilter;
