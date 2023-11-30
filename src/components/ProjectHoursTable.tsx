
import { Card, CardContent, SxProps, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Theme } from "@mui/material";
import { Project } from "../models/Project";
import { MemberSummary, getProjectMemberSummary, getProjectMemberSummaryTotals, numberWithSpaces } from "../utils/projectUtils";



const ProjectHoursTable = ({ project }: { project: Project }) => {
    const summary = getProjectMemberSummary(project);

    const totals = getProjectMemberSummaryTotals(summary)

    const phases: [string, string][] = project.phases.map((p) => [p.id, p.name || p.type]);


    const fsx = { fontWeight: 700, fontSize: "1.1rem", color: "primary.main" };
    const tsx = { color: "primary.main" };
    const hsx = { fontSize: "0.6rem", color: "text.secondary", fontWeight: 700, textTransform: "uppercase", backgroundColor: "background.default", p: 0.2, pl: 0.5, pr: 0.5 };

    return (
        <Card elevation={5}>
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
                                    <PhaseCell key={`${s.memberId}-${p[0]}`} phaseId={p[0]} project={project} summary={s} />
                                ))}
                                <TableCell sx={tsx}>{numberWithSpaces(s.totalHours)} h</TableCell>
                            </TableRow>
                        ))}
                        <TableRow >
                            <TableCell colSpan={2} align="right" sx={fsx}>Total</TableCell>

                            {phases.map((p) => (
                                <PhaseCell key={`totals-${p[0]}`} phaseId={p[0]} project={project} summary={totals} sx={fsx} />
                            ))}
                            <TableCell sx={fsx}>{numberWithSpaces(totals.totalHours)} h</TableCell>
                        </TableRow>

                    </TableBody>
                </Table>
            </TableContainer>
        </Card>
    );
};

const PhaseCell = ({ phaseId, project, summary, sx }: { phaseId: string; project: Project; summary: MemberSummary, sx?: SxProps<Theme> }) => {
    const sum = summary.perPhase.find((s) => s[0] === phaseId);
    const s = sx || {}
    return <TableCell sx={s}>{sum ? numberWithSpaces(sum[1]) : 0} h</TableCell>;
};

export default ProjectHoursTable;
