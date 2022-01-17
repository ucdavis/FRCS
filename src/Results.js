import React, { useState, useEffect } from "react";
import { useSetState } from "react-use";
import "./Results.css";
import { styled } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getFrcsOutputs } from "@ucdavis/frcs";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import ExportData from "./ExportData";
import ExampleInput from "./ExampleInput";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.common.white,
    fontSize: 14,
    fontWeight: "bold",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    // backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const initialOutput = {
  //OUTPUT
  WeightPerAcreTotal: "",
  CostPerAcreTotal: "",
  CostPerBoleCCFTotal: "",
  CostPerGTTotal: "",
  DieselPerAcreTotal: "",
  GasolinePerAcreTotal: "",
  JetFuelPerAcreTotal: "",
  WeightPerAcreResidue: "",
  CostPerAcreResidue: "",
  CostPerBoleCCFResidue: "",
  CostPerGTResidue: "",
  DieselPerAcreResidue: "",
  GasolinePerAcreResidue: "",
  JetFuelPerAcreResidue: "",
};

function Results({ input, setInput, setFirstTimeOpen }) {
  const [state, setState] = useSetState(initialOutput);
  const [openDialog, setOpenDialog] = useState(false);
  const [openAlart, setOpenAlart] = useState(false);

  const testNoneValue = (input) => {
    if (
      input.system === "" ||
      input.isPartialCut === "" ||
      input.deliverToLandingDistance === "" ||
      input.slope === "" ||
      input.elevation === "" ||
      input.woodDensityCT === "" ||
      input.woodDensitySLT === "" ||
      input.woodDensityLLT === "" ||
      input.residueFractionCT === "" ||
      input.residueFractionSLT === "" ||
      input.residueFractionLLT === "" ||
      input.hardwoodFractionCT === "" ||
      input.hardwoodFractionSLT === "" ||
      input.hardwoodFractionLLT === "" ||
      input.treesPerAcreCT === "" ||
      input.volumeCT === "" ||
      input.treesPerAcreSLT === "" ||
      input.volumeSLT === "" ||
      input.treesPerAcreLLT === "" ||
      input.volumeLLT === "" ||
      input.dieselFuelPrice === "" ||
      input.moistureContent === "" ||
      input.wageFaller === "" ||
      input.wageOther === "" ||
      input.laborBenefits === "" ||
      input.ppiCurrent === "" ||
      input.residueRecovFracWT === "" ||
      input.residueRecovFracCTL === ""
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlart(false);
  };

  const calculate = () => {
    if (testNoneValue(input)) {
      setOpenAlart(true);
    } else {
      // console.log(input);
      const output = getFrcsOutputs(input);
      const total = output.total;
      const biomass = output.residual;
      setState({
        WeightPerAcreTotal: total.yieldPerAcre.toFixed(2),
        WeightPerAcreResidue: biomass.yieldPerAcre.toFixed(2),
        CostPerAcreTotal: total.costPerAcre.toFixed(2),
        CostPerAcreResidue: biomass.costPerAcre.toFixed(2),
        CostPerBoleCCFTotal: total.costPerBoleCCF.toFixed(2),
        CostPerBoleCCFResidue: biomass.costPerBoleCCF.toFixed(2),
        CostPerGTTotal: total.costPerGT.toFixed(2),
        CostPerGTResidue: biomass.costPerGT.toFixed(2),
        DieselPerAcreTotal: total.dieselPerAcre.toFixed(2),
        DieselPerAcreResidue: biomass.dieselPerAcre.toFixed(2),
        GasolinePerAcreTotal: total.gasolinePerAcre.toFixed(2),
        GasolinePerAcreResidue: biomass.gasolinePerAcre.toFixed(2),
        JetFuelPerAcreTotal: total.jetFuelPerAcre.toFixed(2),
        JetFuelPerAcreResidue: biomass.jetFuelPerAcre.toFixed(2),
      });
    }
  };

  const handleClearAllButton = () => {
    setOpenDialog(true);
  };
  const handleDisagree = () => {
    setOpenDialog(false);
  };
  const handleAgree = () => {
    setOpenDialog(false);
    window.location.reload();
  };
  const handleExampleInput = () => {
    setInput(ExampleInput);
    setFirstTimeOpen(false);
  };

  // useEffect(() => {
  //     console.log(input);
  //   },[input]);

  return (
    <>
      {/* direction="row" */}
      <div className="btn-group">
        <div className="btn-group1">
          <Button
            variant="contained"
            onClick={calculate}
            style={{ fontSize: "14px" }}
            className="btn"
          >
            Calculate
          </Button>
          <Button
            variant="contained"
            onClick={handleClearAllButton}
            style={{ fontSize: "14px" }}
            className="btn"
          >
            Clear
          </Button>
        </div>
        <div className="btn-group2">
          <Button
            variant="contained"
            onClick={handleExampleInput}
            style={{ fontSize: "14px" }}
            className="btn"
          >
            Use Example Inputs
          </Button>
          <ExportData input={input} state={state} />
          {/* <Button variant="contained" onClick = {()=>ExportData({input, state})}>Export Report</Button> */}
        </div>
      </div>
      <Dialog
        open={openDialog}
        onClose={handleDisagree}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure to clear all input values?"}
        </DialogTitle>
        <DialogActions>
          <Button variant="outlined" onClick={handleDisagree}>
            {" "}
            Disagree{" "}
          </Button>
          <Button variant="outlined" onClick={handleAgree} autoFocus>
            {" "}
            Agree{" "}
          </Button>
        </DialogActions>
      </Dialog>

      <Divider
        style={{
          width: "95%",
          marginTop: "30px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        {" "}
        Results{" "}
      </Divider>

      <TableContainer
        component={Paper}
        style={{ width: "95%", margin: "15px auto" }}
      >
        <Table sx={{ minWidth: 700 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ height: 5 }}>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell align="center">
                Yield&nbsp;(GT/ac)
              </StyledTableCell>
              <StyledTableCell align="center">Cost&nbsp;($/ac)</StyledTableCell>
              <StyledTableCell align="center">
                Cost&nbsp;($/BoleCCF)
              </StyledTableCell>
              <StyledTableCell align="center">Cost&nbsp;($/GT)</StyledTableCell>
              <StyledTableCell align="center">
                Diesel&nbsp;(gal/ac)
              </StyledTableCell>
              <StyledTableCell align="center">
                {" "}
                Gasoline&nbsp;(gal/ac)
              </StyledTableCell>
              <StyledTableCell align="center">
                {" "}
                Jet Fuel&nbsp;(gal/ac)
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <StyledTableRow key="Total">
              <StyledTableCell
                component="th"
                scope="row"
                style={{ width: "10%" }}
              >
                {" "}
                Total{" "}
              </StyledTableCell>
              <StyledTableCell align="right">
                {state.WeightPerAcreTotal}
              </StyledTableCell>
              <StyledTableCell align="right">
                {" "}
                {state.CostPerAcreTotal}{" "}
              </StyledTableCell>
              <StyledTableCell align="right">
                {" "}
                {state.CostPerBoleCCFTotal}{" "}
              </StyledTableCell>
              <StyledTableCell align="right">
                {" "}
                {state.CostPerGTTotal}{" "}
              </StyledTableCell>
              <StyledTableCell align="right">
                {" "}
                {state.DieselPerAcreTotal}{" "}
              </StyledTableCell>
              <StyledTableCell align="right">
                {" "}
                {state.GasolinePerAcreTotal}{" "}
              </StyledTableCell>
              <StyledTableCell align="right">
                {" "}
                {state.JetFuelPerAcreTotal}{" "}
              </StyledTableCell>
            </StyledTableRow>
            <StyledTableRow key="Reside">
              <StyledTableCell
                component="th"
                scope="Reside"
                style={{ width: "10%" }}
              >
                {" "}
                Residual Woody Biomass{" "}
              </StyledTableCell>
              <StyledTableCell align="right">
                {" "}
                {state.WeightPerAcreResidue}{" "}
              </StyledTableCell>
              <StyledTableCell align="right">
                {" "}
                {state.CostPerAcreResidue}{" "}
              </StyledTableCell>
              <StyledTableCell align="right">
                {" "}
                {state.CostPerBoleCCFResidue}{" "}
              </StyledTableCell>
              <StyledTableCell align="right">
                {" "}
                {state.CostPerGTResidue}{" "}
              </StyledTableCell>
              <StyledTableCell align="right">
                {" "}
                {state.DieselPerAcreResidue}{" "}
              </StyledTableCell>
              <StyledTableCell align="right">
                {" "}
                {state.GasolinePerAcreResidue}{" "}
              </StyledTableCell>
              <StyledTableCell align="right">
                {" "}
                {state.JetFuelPerAcreResidue}{" "}
              </StyledTableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Snackbar open={openAlart} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="info"
          sx={{ width: "100%", borderRadius: "10px" }}
        >
          Please Fill in Values!
        </Alert>
      </Snackbar>
    </>
  );
}

export default Results;
