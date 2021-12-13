import React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.common.white,
    width: "20px",
    height: "10px",
    fontSize: 14,
    fontWeight: "bold",
    justifyContent: "spaceBetween",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
    padding: "4px 4px",
    marginLeft: "4px",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
const rows = ["Chip Trees", "Small Log Trees", "Large Log Trees"];

function InputTable({ state, setState }) {
  //ct chip-tree slt - small-log-tree llt-large-log-tree WD-wood-density RF-residue fraction HF - hardwood-fraction
  // RemovalsCT
  const handleRemovalsCT = (e, { row }) => {
    if (row === "Chip Trees") {
      setState({ treesPerAcreCT: parseFloat(e.target.value) || 0 });
    } else if (row === "Small Log Trees") {
      setState({ treesPerAcreSLT: parseFloat(e.target.value) || 0 });
    } else {
      setState({ treesPerAcreLLT: parseFloat(e.target.value) || 0 });
    }
  };

  // TreeVolCT
  const handleTreeVolCT = (e, { row }) => {
    if (row === "Chip Trees") {
      setState({ volumeCT: parseFloat(e.target.value) || 0 });
    } else if (row === "Small Log Trees") {
      setState({ volumeSLT: parseFloat(e.target.value) || 0 });
    } else {
      setState({ volumeLLT: parseFloat(e.target.value) || 0 });
    }
  };

  //handleWD
  const handleWD = (e, { row }) => {
    if (row === "Chip Trees") {
      setState({ woodDensityCT: parseFloat(e.target.value) || 0 });
    } else if (row === "Small Log Trees") {
      setState({ woodDensitySLT: parseFloat(e.target.value) || 0 });
    } else {
      setState({ woodDensityLLT: parseFloat(e.target.value) || 0 });
    }
  };

  //UserSpecRFCT
  const handleRF = (e, { row }) => {
    if (row === "Chip Trees") {
      setState({ residueFractionCT: parseFloat(e.target.value) || 0 });
    } else if (row === "Small Log Trees") {
      setState({ residueFractionSLT: parseFloat(e.target.value) || 0 });
    } else {
      setState({ residueFractionLLT: parseFloat(e.target.value) || 0 });
    }
  };

  ///handleHF
  const handleHF = (e, { row }) => {
    if (row === "Chip Trees") {
      setState({ hardwoodFractionCT: parseFloat(e.target.value) || 0 });
    } else if (row === "Small Log Trees") {
      setState({ hardwoodFractionSLT: parseFloat(e.target.value) || 0 });
    } else {
      setState({ hardwoodFractionLLT: parseFloat(e.target.value) || 0 });
    }
  };

  const handleCTValue = ({ row }) => {
    if (row === "Chip Trees") {
      return state.treesPerAcreCT;
    } else if (row === "Small Log Trees") {
      return state.treesPerAcreSLT;
    } else {
      return state.treesPerAcreLLT;
    }
  };

  const handleVolValue = ({ row }) => {
    if (row === "Chip Trees") {
      return state.volumeCT;
    } else if (row === "Small Log Trees") {
      return state.volumeSLT;
    } else {
      return state.volumeLLT;
    }
  };

  const handleWDValue = ({ row }) => {
    if (row === "Chip Trees") {
      return state.woodDensityCT;
    } else if (row === "Small Log Trees") {
      return state.woodDensitySLT;
    } else {
      return state.woodDensityLLT;
    }
  };

  const handleRFValue = ({ row }) => {
    if (row === "Chip Trees") {
      return state.residueFractionCT;
    } else if (row === "Small Log Trees") {
      return state.residueFractionSLT;
    } else {
      return state.residueFractionLLT;
    }
  };

  const handleHFValue = ({ row }) => {
    if (row === "Chip Trees") {
      return state.hardwoodFractionCT;
    } else if (row === "Small Log Trees") {
      return state.hardwoodFractionSLT;
    } else {
      return state.hardwoodFractionLLT;
    }
  };

  return (
    <TableContainer
      component={Paper}
      style={{ width: "95%", margin: "15px auto" }}
    >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow sx={{ height: 5 }}>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell align="center">Trees/acre</StyledTableCell>
            <StyledTableCell align="center">
              Vol/tree&nbsp;(ft3)
            </StyledTableCell>
            <StyledTableCell align="center">
              Green Wood Density&nbsp;(lbs/cf)
            </StyledTableCell>
            <StyledTableCell align="center">Residue Fraction</StyledTableCell>
            <StyledTableCell align="center">Hardwood Fraction</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row}>
              <StyledTableCell component="th" scope="row">
                {row}
              </StyledTableCell>
              <StyledTableCell align="right">
                <TextField
                  id="filled-basic"
                  variant="filled"
                  size="small"
                  type="number"
                  InputProps={{
                    inputProps: {
                      style: { textAlign: "center", fontSize: "16px" },
                    },
                  }}
                  style={{ width: "100%" }}
                  value={handleCTValue({ row }).toString()}
                  onChange={(e) => {
                    handleRemovalsCT(e, { row });
                  }}
                />
              </StyledTableCell>
              <StyledTableCell align="right">
                <TextField
                  id="filled-basic"
                  variant="filled"
                  size="small"
                  type="number"
                  InputProps={{
                    inputProps: {
                      style: { textAlign: "center", fontSize: "16px" },
                    },
                  }}
                  style={{ width: "100%" }}
                  value={handleVolValue({ row }).toString()}
                  onChange={(e) => {
                    handleTreeVolCT(e, { row });
                  }}
                />
              </StyledTableCell>
              <StyledTableCell align="right">
                <TextField
                  id="filled-basic"
                  variant="filled"
                  size="small"
                  type="number"
                  InputProps={{
                    inputProps: {
                      style: { textAlign: "center", fontSize: "16px" },
                    },
                  }}
                  style={{ width: "100%" }}
                  value={handleWDValue({ row }).toString()}
                  onChange={(e) => {
                    handleWD(e, { row });
                  }}
                />
              </StyledTableCell>
              <StyledTableCell>
                <TextField
                  id="filled-basic"
                  variant="filled"
                  size="small"
                  type="number"
                  InputProps={{
                    inputProps: {
                      style: { textAlign: "center", fontSize: "16px" },
                    },
                  }}
                  style={{ width: "100%" }}
                  value={handleRFValue({ row }).toString()}
                  onChange={(e) => {
                    handleRF(e, { row });
                  }}
                />
              </StyledTableCell>
              <StyledTableCell>
                <TextField
                  id="filled-basic"
                  variant="filled"
                  size="small"
                  type="number"
                  InputProps={{
                    inputProps: {
                      style: { textAlign: "center", fontSize: "16px" },
                    },
                  }}
                  style={{ width: "100%" }}
                  value={handleHFValue({ row }).toString()}
                  onChange={(e) => {
                    handleHF(e, { row });
                  }}
                />
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default InputTable;
