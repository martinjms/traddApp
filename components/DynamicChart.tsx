
import { CandlestickData, createChart } from 'lightweight-charts';
import React, { useEffect, useRef } from 'react';
import { Candle } from '../pages/api/bybit/kline';

export default function DynamicChart({ data }: { data: Candle[] }) {
    console.log(data)
    const chartContainerRef = useRef<HTMLDivElement>(null);
    useEffect(() => {

        const chart = createChart(chartContainerRef.current || "", { width: 0, height: 0 });
        const candlestickSeries = chart.addCandlestickSeries();
        candlestickSeries.setData(data as any);
    }, [])
    return (

        <div
            ref={chartContainerRef}
            style={{ width: "100vw", height: "100vh" }}
        />

    );
}


