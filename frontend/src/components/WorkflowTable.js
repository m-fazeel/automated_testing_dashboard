import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from '@mui/material';

const WorkflowTable = ({ workflows }) => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <TableContainer component={Paper} className="mb-4">
            <Table aria-label="workflow table">
                <TableHead>
                    <TableRow sx={{ bgcolor: 'white' }}> {/* Header background */}
                        <TableCell align="left" sx={{ fontWeight: 'bold' }}> {/* Count column */}
                            Count
                        </TableCell>
                        {['Date', 'Workflow Number', 'Status', 'Total Test Cases', 'Passed', 'Failed', 'Total Time'].map((header, index) => (
                            <TableCell key={index} align={index === 0 ? 'inherit' : 'right'} sx={{ fontWeight: 'bold' }}>
                                {header}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {workflows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((workflow, index) => (
                        <TableRow key={index} sx={{ '&:nth-of-type(odd)': { bgcolor: 'action.hover' } }}> {/* Zebra striping */}
                            <TableCell component="th" scope="row" align="left"> {/* Count cell */}
                                {index + 1}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {workflow.date}
                            </TableCell>
                            <TableCell align="right">{workflow.number}</TableCell>
                            <TableCell align="right" sx={{ fontWeight: 'bold', color: workflow.status === 'success' ? 'green' : 'red' }}>
                                {workflow.status}
                            </TableCell>
                            <TableCell align="right">{workflow.totalTests}</TableCell>
                            <TableCell align="right">{workflow.passed}</TableCell>
                            <TableCell align="right">{workflow.failed}</TableCell>
                            <TableCell align="right">{workflow.totalTime}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={workflows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </TableContainer>
    );
};

export default WorkflowTable;
