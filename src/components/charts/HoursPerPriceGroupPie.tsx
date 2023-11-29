import { PieValueType, PieChart } from "@mui/x-charts";
import { MakeOptional } from "@mui/x-date-pickers/internals";
import { Project } from "../../models/Project"
import { getAllocatedHoursByPriceGroup } from "../../utils/projectUtils";
import { useState } from "react";
import { getConf } from "../../data/settings";



const HoursPerPriceGroupPie = ({ p, height, mode: targetMode }: { p: Project, height?: number, mode?: "hours" | "price" | "days" }) => {

    const mode = targetMode || "hours";

    const hours = getAllocatedHoursByPriceGroup(p);

    const testData: PieValueType[] = Object.keys(hours).map((key, index) => {

        const val: PieValueType = {
            id: key,
            label: key,
            value: hours[key],

        };
        if(mode === "price") {
            
        }
        const pg = p.prices.find((p) => p.id === key);
        if (pg) {
            val.label = `${pg.name},${pg.value} €/h`
        }

        if (mode === "price" && pg) {
            val.value = val.value * pg.value;
        }

        if(mode === "days") {
            val.value = val.value / getConf("time.workingDay");
        }

        return val;
    });

    function getArcLabel(item: PieValueType) {
        if (mode === "price") {
            const pg = p.prices.find((p) => p.id === item.id);
            if (pg) {
                return `${item.value} €`
            }
        }
        if(mode === "days") {
            return `${item.value}d`
        }
        return `${item.value}h`
    }

    return (
        <PieChart
            series={
                [
                    {
                        arcLabel: getArcLabel,
                        data: testData
                    },
                ]
            }

            height={height || 400}
        />
    )

}



export default HoursPerPriceGroupPie;