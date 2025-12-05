import * as React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";

// =================== DATE HELPERS ===================
function formatDate(date) {
  return date.toISOString().split("T")[0];
}

const today = new Date();
const yesterdayDate = new Date(today);
yesterdayDate.setDate(today.getDate() - 1);

const beforeYesterdayDate = new Date(today);
beforeYesterdayDate.setDate(today.getDate() - 2);

// =================== PAGINATION BUTTONS ===================
function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton onClick={(e) => onPageChange(e, 0)} disabled={page === 0}>
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>

      <IconButton onClick={(e) => onPageChange(e, page - 1)} disabled={page === 0}>
        {theme.direction === "rtl" ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>

      <IconButton
        onClick={(e) => onPageChange(e, page + 1)}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
      >
        {theme.direction === "rtl" ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>

      <IconButton
        onClick={(e) =>
          onPageChange(e, Math.max(0, Math.ceil(count / rowsPerPage) - 1))
        }
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

// =================== ROUTE DATA ===================
function createRoute(route, subRoute, busCount, todaySeats, ySeats, bSeats) {
  const TOTAL_SEATS = busCount * 50;

  return {
    route,
    subRoute,
    busCount,

    totalSeats: TOTAL_SEATS,

    seatsTakenToday: todaySeats,
    seatsTakenYesterday: ySeats,
    seatsTakenBeforeYesterday: bSeats,

    seatsAvailable: TOTAL_SEATS - todaySeats,

    todayRevenue: todaySeats * 10,

    history: [
      {
        date: formatDate(yesterdayDate),
        seatsTaken: ySeats,
        revenue: ySeats * 10
      },
      {
        date: formatDate(beforeYesterdayDate),
        seatsTaken: bSeats,
        revenue: bSeats * 10
      }
    ]
  };
}

const rows = [
  createRoute("Nasr City", "→ New Cairo", 2, 67, 58, 54),
  createRoute("Rehab", "→ Madinaty", 2, 75, 60, 55),
  createRoute("Maadi", "→ Fifth Settlement", 3, 122, 110, 96),
  createRoute("Dokki", "→ Mohandessin", 1, 40, 38, 35),
  createRoute("Heliopolis", "→ Nasr City", 2, 80, 70, 65),
  createRoute("Zamalek", "→ Downtown", 1, 45, 41, 39),
  createRoute("6th October", "→ Sheikh Zayed", 3, 130, 122, 118),
  createRoute("Obour", "→ Shorouk City", 2, 90, 72, 68)
];

// =================== ROW COMPONENT ===================
function Row({ row }) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <TableRow
        sx={{
          "& > *": { borderBottom: "unset" },
          background: "var(--card-bg)"
        }}
      >
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>

        <TableCell sx={{ fontWeight: 600 }}>{row.route}</TableCell>
        <TableCell>{row.subRoute}</TableCell>

        <TableCell align="right">
          {row.seatsTakenToday} / {row.totalSeats}
        </TableCell>

        <TableCell align="right">{row.todayRevenue} EGP</TableCell>
      </TableRow>

      {/* COLLAPSE SECTION */}
      <TableRow>
        <TableCell colSpan={6} style={{ padding: 0 }}>
          <Collapse in={open} unmountOnExit timeout="auto">
            <Box sx={{ m: 2, p: 2, background: "var(--card-bg)", borderRadius: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Route History
              </Typography>

              <Typography sx={{ mb: 1 }}>
                <strong>Buses:</strong> {row.busCount} buses  
                &nbsp;|&nbsp;  
                <strong>Total Seats:</strong> {row.totalSeats}
              </Typography>

              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Seats Taken</TableCell>
                    <TableCell align="right">Revenue</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((h, i) => (
                    <TableRow key={i}>
                      <TableCell>{h.date}</TableCell>
                      <TableCell>{h.seatsTaken}</TableCell>
                      <TableCell align="right">{h.revenue} EGP</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <Box sx={{ mt: 1 }}>
                <strong>Seats Available Today:</strong> {row.seatsAvailable}
              </Box>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

// =================== MAIN TABLE ===================
export default function RoutesTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRowsChange = (e) => {
    const v = e.target.value === "all" ? rows.length : parseInt(e.target.value, 10);
    setRowsPerPage(v);
    setPage(0);
  };

  const paginatedRows =
    rowsPerPage === rows.length
      ? rows
      : rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
      <TableContainer
        component={Paper}
        sx={{
          width: "85%",
          borderRadius: 2,
          background: "var(--card-bg)",
          boxShadow: "none",
          border: "none"
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ background: "var(--card-bg)" }}>
              <TableCell />
              <TableCell sx={{ fontWeight: 600 }}>Route</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Sub-Route</TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>
                Seats Taken (Today)
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>
                Revenue
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedRows.map((row) => (
              <Row key={row.route} row={row} />
            ))}
          </TableBody>

          {/* PAGINATION */}
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, { label: "Show All", value: "all" }]}
                colSpan={5}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={(e, newPage) => setPage(newPage)}
                onRowsPerPageChange={handleRowsChange}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Box>
  );
}
