
import { Card, CardContent, Stack, SxProps, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Theme } from "@mui/material";
import { Project } from "../models/Project";
import { MemberSummary, getProjectMemberSummary, getProjectMemberSummaryTotals, numberWithSpaces } from "../utils/projectUtils";
import useStoredState from "../hooks/useStoredState";
import { getConf } from "../data/settings";
import ModeToggler from "./charts/ModeToggler";



const ProjectHoursTable = ({ project }: { project: Project }) => {

    const [hourMode, setHourMode] = useStoredState<string>("projecthourstable-hourmode", "hours");

    let summary = getProjectMemberSummary(project);

    let totals = getProjectMemberSummaryTotals(summary)

    const phases: [string, string][] = project.phases.map((p) => [p.id, p.name || p.type]);


    const fsx = { fontWeight: 700, fontSize: "1.1rem", color: "primary.main" };
    const tsx = { color: "primary.main" };
    const hsx = { fontSize: "0.6rem", color: "text.secondary", fontWeight: 700, textTransform: "uppercase", backgroundColor: "background.default", p: 0.2, pl: 0.5, pr: 0.5 };


    if (hourMode === "days") {
        summary = summary.map((s) => {
            s.totalHours = s.totalHours / getConf("time.workingDay");
            s.perPhase = s.perPhase.map((p) => [p[0], p[1] / getConf("time.workingDay"), p[2]]);
            return s;
        });

        totals.totalHours = totals.totalHours / getConf("time.workingDay");
        totals.perPhase = totals.perPhase.map((p) => [p[0], p[1] / getConf("time.workingDay"), p[2]]);
    }

    return (
        <Card elevation={5} sx={{ pt: 1 }}>
            <Stack direction="row" spacing={2} alignItems="center" justifyContent="flex-end" sx={{ m: 1, mr: 2 }}>
                <ModeToggler value={hourMode} onChange={setHourMode} options={[["hours", "Hours"], ["days", "Work Days"]]} />
            </Stack>

            <TableContainer component={CardContent}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={hsx}>Member</TableCell>
                            <TableCell sx={hsx}>Team(s)</TableCell>
                            {phases.map((p) => (
                                <TableCell sx={hsx}>{p[1]}</TableCell>
                            ))}
                            <TableCell sx={hsx}>Total</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {summary.map((s) => (
                            <TableRow key={s.memberId}>
                                <TableCell>{s.memberName}</TableCell>
                                <TableCell>{s.teams.map((t) => t[1]).join(", ")}</TableCell>

                                {phases.map((p) => (
                                    <PhaseCell key={`${s.memberId}-${p[0]}`} phaseId={p[0]} project={project} summary={s} unit={hourMode === "hours" ? "h" : "d"} />
                                ))}
                                <TableCell sx={tsx}>{numberWithSpaces(s.totalHours)} {hourMode === "hours" ? "h" : "d"}</TableCell>
                            </TableRow>
                        ))}
                        <TableRow >
                            <TableCell colSpan={2} align="right" sx={fsx}>Total</TableCell>

                            {phases.map((p) => (
                                <PhaseCell key={`totals-${p[0]}`} phaseId={p[0]} project={project} summary={totals} sx={fsx} unit={hourMode === "hours" ? "h" : "d"} />
                            ))}
                            <TableCell sx={fsx}>{numberWithSpaces(totals.totalHours)} {hourMode === "hours" ? "h" : "d"}</TableCell>
                        </TableRow>

                    </TableBody>
                </Table>
            </TableContainer>
        </Card>
    );
};

const PhaseCell = ({ phaseId, project, summary, sx, unit }: { phaseId: string; project: Project; summary: MemberSummary, unit: string, sx?: SxProps<Theme> }) => {
    const sum = summary.perPhase.find((s) => s[0] === phaseId);
    const s = sx || {}
    return <TableCell sx={s}>{sum ? numberWithSpaces(sum[1]) : 0} {unit}</TableCell>;
};

export default ProjectHoursTable;
