import { AxisConfig, BarChart, BarSeriesType, ScaleName } from "@mui/x-charts";
import { Project } from "../../models/Project";
import { getAllPriceGroupsInProject, getPriceForEachPhase, numberWithSpaces } from "../../utils/projectUtils";
import { MakeOptional } from "@mui/x-date-pickers/internals";
import { useState } from "react";



const CostOfEachPhaseBars = ({ p, height, mode: targetMode }: { p: Project, height?: number, mode?: "total" | "groups" | undefined }) => {

    const [mode, setMode] = useState<"total" | "groups">(targetMode !== undefined ? targetMode : "total");

    const phaseSummary = getPriceForEachPhase(p);


    // console.log(phaseSummary);

    const xAxisData: AxisConfig[] = [
        {
            id: "cost-of-phase",
            scaleType: "band",
            data: [],
            label: "Phases",
            labelStyle: {
                fontSize: 12,
                fontWeight: 700,
            }
        }
    ];

    const seriesData: BarSeriesType[] = [];


    // const hourBars: BarSeriesType = {
    //     type: 'bar',
    //     data: [],
    //     label: "Hours"
    // }

    const totalCostBars: BarSeriesType = {
        type: 'bar',
        data: [],
        label: "Cost €",
        valueFormatter: (v) => `${numberWithSpaces(v)} €`,
    }

    const pricegroupData: Record<string, number[]> = {};

    p.prices.forEach((price) => {
        pricegroupData[price.id] = [];

    });


    phaseSummary.forEach((ps) => {
        if (xAxisData[0].data) {
            xAxisData[0].data?.push(ps.phaseName);
        }

        totalCostBars.data?.push(ps.totalPrice);




        Object.keys(ps.pricePerGroup).forEach((key) => {
            if (pricegroupData[key] === undefined) {
                pricegroupData[key] = [];
            }
            pricegroupData[key].push(ps.pricePerGroup[key]);
        });
    });

    if (targetMode === "groups") {
        Object.keys(pricegroupData).forEach((key) => {

            const bar: BarSeriesType = {
                type: 'bar',
                data: pricegroupData[key],
                label: key,
                valueFormatter: (v) => `${numberWithSpaces(v)} €`,
            }
            const pg = p.prices.find((price) => price.id === key);
            if (pg) {
                bar.label = `${pg.name}, ${pg.value} €/h`
            }


            seriesData.push(bar);
        });
    } else {
        seriesData.push(totalCostBars);
    }

    return (
        <BarChart
            margin={{ left: 90 }}

            yAxis={[{

                valueFormatter: (v) => `${numberWithSpaces(v)} €`,

            }]}
            xAxis={xAxisData}
            series={seriesData}




            // xAxis={[{ scaleType: 'band', data: ['group A', 'group B', 'group C', 'group D'] }]}
            // series={testSeriesData}


            height={height || 400}
        />
    )

}


export default CostOfEachPhaseBars;