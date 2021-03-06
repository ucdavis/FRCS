import React, { useState, useEffect } from "react";
import { useSetState } from "react-use";
import "./Page.css";
import Results from "./Results";
import InputTable from "./inputTable";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import FilledInput from "@mui/material/FilledInput";
import InputAdornment from "@mui/material/InputAdornment";
import initialInput from "./initialInput";
import { ThemeProvider, createTheme } from '@mui/material/styles';
// import { StylesProvider } from '@mui/styles';

const styledInputAdornment = {
  padding: "27.5px 14px", 
  backgroundColor: '#E1E8EB',
  marginLeft: '0px',
}

// const 

function Page() {
  const systemTypes = [
    "Ground-Based Mech WT",
    "Ground-Based Manual WT",
    "Ground-Based Manual Log",
    "Ground-Based CTL",
    "Cable Manual WT/Log",
    "Cable Manual WT",
    "Cable Manual Log",
    "Cable CTL",
    "Helicopter Manual Log",
    "Helicopter CTL",
  ];
  const cutTypes = ["Clear Cut", "Partial Cut"];
  const [state, setState] = useSetState(initialInput);
  const [firstTimeOpen, setFirstTimeOpen] = useState(true);

  const handleSystemType = (e) => {
    setState({ system: e.target.value });
  };
  const handleCutType = (e) => {
    setFirstTimeOpen(false);
    if (String(e.target.value) === "Partial Cut") {
      setState({ isPartialCut: true });
    } else {
      setState({ isPartialCut: false });
    }
  };
  const handleDeliverDist = (e) => {
    setState({ deliverToLandingDistance: parseFloat(e.target.value) || 0 });
  };
  const handleSlope = (e) => {
    setState({ slope: parseFloat(e.target.value) || 0 });
  };
  const handleMoistureContent = (e) => {
    setState({ moistureContent: parseFloat(e.target.value) || 0 });
  };
  const handleDieselFuelPrice = (e) => {
    setState({ dieselFuelPrice: parseFloat(e.target.value) || 0 });
  };
  const handleElevation = (e) => {
    setState({ elevation: parseFloat(e.target.value) || 0 });
  };
  const handleArea = (e) => {
    setState({ area: parseFloat(e.target.value) || 0 });
  };
  const handleMoveInDist = (e) => {
    setState({ moveInDistance: parseFloat(e.target.value) || 0 });
  };
  const handlewageFaller = (e) => {
    setState({ wageFaller: parseFloat(e.target.value) || 0 });
  };
  const handlewageOther = (e) => {
    setState({ wageOther: parseFloat(e.target.value) || 0 });
  };
  const handlelaborBenefits = (e) => {
    setState({ laborBenefits: parseFloat(e.target.value) || 0 });
  };
  const handleppiCurrent = (e) => {
    setState({ ppiCurrent: parseFloat(e.target.value) || 0 });
  };
  const handleresidueRecovFracWT = (e) => {
    setState({ residueRecovFracWT: parseFloat(e.target.value) || 0 });
  };
  const handleresidueRecovFracCTL = (e) => {
    setState({ residueRecovFracCTL: parseFloat(e.target.value) || 0 });
  };

  useEffect(() => {
    if (state.includeMoveInCosts === false) {
      setState({ area: 0 });
      setState({ moveInDistance: 0 });
    }
  }, [state.includeMoveInCosts, setState]);

  return (
    <Container
      style={{ width: "90vw", paddingLeft: "0px", paddingRight: "0px"}}
    >
      <h1 className="title">Fuel Reduction Cost Simulator </h1>
      <Box className="box">
        <div className="configuration">
          <div className="configurationLeftmiddle">
            <div className="configuration-left">
              <FormControl sx={{ m: 1 }} fullWidth disabled>
                <InputLabel
                  id="state"
                  className="label"
                  style={{ fontSize: "14px", fontWeight: "600" }}
                >
                  {" "}
                  Region
                </InputLabel>
                <Select
                  labelId="state"
                  id="state"
                  // label='state'
                  label={
                    <Box component="div" className="label">
                      {" "}
                      Region{" "}
                    </Box>
                  }
                  className="select"
                  value={"West"}
                >
                  <MenuItem
                    value={"West"}
                    style={{ fontSize: "14px", fontWeight: "600" }}
                  >
                    West
                  </MenuItem>
                </Select>
              </FormControl>

              <FormControl sx={{ m: 1 }} fullWidth>
                <InputLabel
                  id="cut-type"
                  className="label"
                  style={{ fontSize: "14px", fontWeight: "600" }}
                >
                  Cut Type
                </InputLabel>
                <Select
                  labelId="cut-type"
                  id="cut-type"
                  label="cut-type"
                  className="select"
                  onChange={(e) => handleCutType(e)}
                  value={
                    firstTimeOpen
                      ? ""
                      : state.isPartialCut
                      ? "Partial Cut"
                      : "Clear Cut"
                  }
                  defaultValue=""
                >
                  {cutTypes.map((cut, id) => {
                    return (
                      <MenuItem
                        value={cut}
                        key={id}
                      >
                        {" "}
                        {cut}{" "}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              {/* <StateSelect /> */}
              <FormControl sx={{ m: 1 }} fullWidth>
                <InputLabel
                  id="includeLoadingCosts"
                  className="label"
                  style={{ fontSize: "17px", fontWeight: "600"}}
                >
                  {" "}
                  Include loading cost?{" "}
                </InputLabel>
                <Select
                  labelId='includeLoadingCosts'
                  id="includeLoadingCosts"
                  label={
                    <Box component="div" className="label">
                      {" "}
                      Include loading cost?{" "}
                    </Box>
                  }
                  className="select"
                  onChange={(e) =>
                    setState({ includeLoadingCosts: e.target.value })
                  }
                  value={state.includeLoadingCosts}
                  defaultValue=""
                >
                  <MenuItem value={true}> Yes </MenuItem>
                  <MenuItem value={false}> No </MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ m: 1 }} fullWidth>
                <InputLabel
                  id="isBiomassSalvage"
                  className="label"
                  style={{ fontSize: "17px", fontWeight: "600" }}
                >
                  {" "}
                  Is biomass salvage?{" "}
                </InputLabel>
                <Select
                  // labelId='includeLoadingCosts'
                  id="isBiomassSalvage"
                  className="select"
                  label={
                    <Box component="div" className="label">
                      {" "}
                      Is biomass salvage?{" "}
                    </Box>
                  }
                  onChange={(e) =>
                    setState({ isBiomassSalvage: e.target.value })
                  }
                  value={state.isBiomassSalvage}
                  defaultValue=""
                >
                  <MenuItem value={true}> Yes </MenuItem>
                  <MenuItem value={false}> No </MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ m: 1 }} fullWidth>
                <InputLabel
                  id="includeCostsCollectChipResidues"
                  className="label"
                  style={{ fontSize: "16px", fontWeight: "600" }}
                >
                  Include the costs of collecting and chipping residues?
                </InputLabel>
                <Select
                  id="includeCostsCollectChipResidues"
                  className="select"
                  label={
                    <Box component="div" className="label">
                      {" "}
                      Include the costs of collecting and chipping residues?{" "}
                    </Box>
                  }
                  onChange={(e) =>
                    setState({
                      includeCostsCollectChipResidues: e.target.value,
                    })
                  }
                  value={state.includeCostsCollectChipResidues}
                  defaultValue=""
                >
                  <MenuItem value={true}> Yes </MenuItem>
                  <MenuItem value={false}> No </MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ m: 1 }} fullWidth>
                <InputLabel
                  id="includeMoveInCosts"
                  className="label"
                  style={{ fontSize: "17px", fontWeight: "600" }}
                >
                  {" "}
                  Include move-in costs?{" "}
                </InputLabel>
                <Select
                  id="includeMoveInCosts"
                  className="select"
                  label={
                    <Box component="div" className="label">
                      {" "}
                      Include move-in costs?{" "}
                    </Box>
                  }
                  onChange={(e) =>
                    setState({ includeMoveInCosts: e.target.value })
                  }
                  value={state.includeMoveInCosts}
                  defaultValue=""
                >
                  <MenuItem value={true}> Yes </MenuItem>
                  <MenuItem value={false}> No </MenuItem>
                </Select>
              </FormControl>

              {state.includeMoveInCosts && (
                <FormControl sx={{ m: 1 }} fullWidth>
                  <InputLabel
                    htmlFor="area"
                    style={{ fontSize: "17px", fontWeight: "600" }}
                  >
                    Area treated:
                  </InputLabel>
                  <FilledInput
                    label="area"
                    id="area"
                    value={state.area.toString()}
                    endAdornment={
                      <InputAdornment
                        position="end"
                        style={{ fontSize: "15px", fontWeight: "bold" }}
                      >
                        <p>arces</p>
                      </InputAdornment>
                    }
                    inputProps={{
                      style: { textAlign: "center", fontSize: "16px" },
                    }}
                    // size='small'
                    type="number"
                    onChange={(e) => {
                      handleArea(e);
                    }}
                  />
                </FormControl>
              )}
            </div>
            <div className="configuration-middle">
              <FormControl sx={{ m: 1 }} fullWidth>
                <InputLabel
                  id="system-type"
                  className="label"
                  style={{ fontSize: "14px", fontWeight: "600" }}
                >
                  {" "}
                  System Type{" "}
                </InputLabel>
                <Select
                  id="system-type"
                  label="system-type"
                  className="select"
                  onChange={(e) => handleSystemType(e)}
                  value={state.system}
                  defaultValue=""
                >
                  {systemTypes.map((system, id) => {
                    return (
                      <MenuItem value={systemTypes[id]} key={id}>
                        {systemTypes[id]}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <FormControl sx={{ m: 1 }} fullWidth>
                <TextField
                 sx={{
                  "& .MuiOutlinedInput-root": {
                    paddingRight: 0
                  }
                }}
                  className="textfield"
                  id="outlined-helperText"
                  label={
                    <Box component="div" className="label">
                      {" "}
                      Slope
                    </Box>
                  }
                  InputProps={{
                    inputProps: {
                      style: { textAlign: "center", fontSize: "17px" },
                    },
                    endAdornment: <InputAdornment position='end'sx={{...styledInputAdornment}}> % </InputAdornment>
                  }}
                  onChange={(e) => handleSlope(e)}
                  value={state.slope.toString()}
                  type="number"
                />
              </FormControl>
              <FormControl sx={{ m: 1 }} fullWidth>
                <TextField
                 sx={{
                  "& .MuiOutlinedInput-root": {
                    paddingRight: 0
                  }
                }}
                  id="outlined-helperText"
                  label={
                    <Box component="div" className="label">
                      {" "}
                      Elevation
                    </Box>
                  }
                  InputProps={{
                    inputProps: {
                      style: { textAlign: "center", fontSize: "17px" },
                    },
                    endAdornment: <InputAdornment position='end'sx={{...styledInputAdornment}}> ft </InputAdornment>

                  }}
                  onChange={(e) => handleElevation(e)}
                  value={state.elevation.toString()}
                  type="number"
                />
              </FormControl>
              <FormControl sx={{ m: 1 }} fullWidth>
                <TextField
                 sx={{
                  "& .MuiOutlinedInput-root": {
                    paddingRight: 0
                  }
                }}
                  className="textfield"
                  id="outlined-helperText"
                  label={
                    <Box component="div" className="label">
                      Yard/Skid/Forward Slope Distance 
                    </Box>
                  }
                  InputProps={{
                    inputProps: {
                      style: { textAlign: "center", fontSize: "17px" },
                    },
                    endAdornment: <InputAdornment position='end'sx={{...styledInputAdornment}}> ft </InputAdornment>
                  }}
                  onChange={(e) => handleDeliverDist(e)}
                  value={state.deliverToLandingDistance.toString()}
                  type="number"
                  // defaultValue='400'
                />
              </FormControl>

              <FormControl sx={{ m: 1 }} fullWidth>
                <TextField
                   sx={{
                    "& .MuiOutlinedInput-root": {
                      paddingRight: 0
                    }
                  }}
                  id="outlined-helperText"
                  label={
                    <Box component="div" className="label">
                      {" "}
                      Residue Recovery Fraction for CTL Systems
                    </Box>
                  }
                  InputProps={{
                    inputProps: {
                      style: { textAlign: "center", fontSize: "17px" },
                    },
                    endAdornment: <InputAdornment position='end'sx={{...styledInputAdornment}}> % </InputAdornment>
                  }}
                  onChange={(e) => {
                    handleresidueRecovFracCTL(e);
                  }}
                  value={state.residueRecovFracCTL.toString()}
                  type="number"
                />
              </FormControl>
              <FormControl sx={{ m: 1 }} fullWidth>
                <TextField
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      paddingRight: 0
                    }
                  }}
                  className="textfield"
                  id="outlined-helperText"
                  label={
                    <Box component="div" className="label">
                      {" "}
                      Residue Recovery Fraction for WT Systems 
                    </Box>
                  }
                  InputProps={{
                    inputProps: {
                      style: { textAlign: "center", fontSize: "17px" },
                    },
                    endAdornment: <InputAdornment position='end'sx={{...styledInputAdornment}}> % </InputAdornment>
                  }}
                  onChange={(e) => {
                    handleresidueRecovFracWT(e);
                  }}
                  value={state.residueRecovFracWT.toString()}
                  type="number"
                  // defaultValue='50'
                />
              </FormControl>

              {state.includeMoveInCosts && (
                <FormControl sx={{ m: 1 }} fullWidth>
                  <InputLabel
                    htmlFor="distance"
                    style={{ fontSize: "17px", fontWeight: "600" }}
                  >
                    {" "}
                    One way move in distance:{" "}
                  </InputLabel>
                  <FilledInput
                    label="distance"
                    id="distance"
                    value={state.moveInDistance.toString()}
                    endAdornment={
                      <InputAdornment
                        position="end"
                        style={{ fontSize: "15px", fontWeight: "bold" }}
                      >
                        {" "}
                        <p>miles</p>
                      </InputAdornment>
                    }
                    inputProps={{
                      style: { textAlign: "center", fontSize: "16px" },
                    }}
                    type="number"
                    onChange={(e) => {
                      handleMoveInDist(e);
                    }}
                  />
                </FormControl>
              )}
            </div>
          </div>

          <div className="configuration-right">
            <FormControl sx={{ m: 1 }} fullWidth className="right">
              <TextField
                sx={{
                  "& .MuiOutlinedInput-root": {
                    paddingRight: 0
                  }
                }}
                id="outlined-helperText"
                label={
                  <Box component="div" className="label">
                    {" "}
                    Diesel Fuel Price
                  </Box>
                }
                InputProps={{
                  inputProps: {
                    style: { textAlign: "center", fontSize: "17px" },
                  },
                  endAdornment: <InputAdornment position='end'sx={{...styledInputAdornment}}> $/gal </InputAdornment>
                }}
                onChange={(e) => {
                  handleDieselFuelPrice(e);
                }}
                value={state.dieselFuelPrice.toString()}
                type="number"
              />
            </FormControl>
            <FormControl sx={{ m: 1 }} fullWidth className="right">
              <TextField
                sx={{
                  "& .MuiOutlinedInput-root": {
                    paddingRight: 0
                  }
                }}
                className="textfield"
                id="outlined-helperText"
                label={
                  <Box component="div" className="label">
                    {" "}
                    Hourly Wage for Fallers 
                  </Box>
                }
                InputProps={{
                  inputProps: {
                    style: { textAlign: "center", fontSize: "17px" },
                  },
                  endAdornment: <InputAdornment position='end'sx={{...styledInputAdornment}}> $/hr </InputAdornment>
                }}
                onChange={(e) => handlewageFaller(e)}
                value={state.wageFaller.toString()}
                type="number"
              />
            </FormControl>
            <FormControl sx={{ m: 1 }} fullWidth className="right">
              <TextField
                sx={{
                  "& .MuiOutlinedInput-root": {
                    paddingRight: 0
                  }
                }}
                className="textfield"
                id="outlined-helperText"
                label={
                  <Box component="div" className="label">
                    {" "}
                    Hourly Wage for Other Workers
                  </Box>
                }
                InputProps={{
                  inputProps: {
                    style: { textAlign: "center", fontSize: "17px" },
                  },
                  endAdornment: <InputAdornment position='end' sx={{...styledInputAdornment}}> $/hr </InputAdornment>
                }}
                onChange={(e) => handlewageOther(e)}
                value={state.wageOther.toString()}
                type="number"
              />
            </FormControl>
            <FormControl sx={{ m: 1 }} fullWidth className="right">
              <TextField
                sx={{
                  "& .MuiOutlinedInput-root": {
                    paddingRight: 0
                  }
                }}
                className="textfield"
                id="outlined-helperText"
                label={
                  <Box component="div" className="label">
                    {" "}
                    Benefits and Overhead for Workers
                  </Box>
                }
                InputProps={{
                  inputProps: {
                    style: { textAlign: "center", fontSize: "17px" },
                  },
                  endAdornment: <InputAdornment position='end' sx={{...styledInputAdornment}}> % </InputAdornment>
                }}
                onChange={(e) => handlelaborBenefits(e)}
                value={state.laborBenefits.toString()}
                type="number"
              />
            </FormControl>
            <FormControl sx={{ m: 1 }} fullWidth className="right">
              <TextField
                className="textfield"
                id="outlined-helperText"
                label={
                  <Box component="div" className="label">
                    {" "}
                    Current Producer Price Index
                  </Box>
                }
                InputProps={{
                  inputProps: {
                    style: { textAlign: "center", fontSize: "17px" },
                  },
                }}
                onChange={(e) => handleppiCurrent(e)}
                value={state.ppiCurrent.toString()}
                type="number"
              />
            </FormControl>

            <FormControl sx={{ m: 1 }} fullWidth className="right">
              <TextField
                sx={{
                  "& .MuiOutlinedInput-root": {
                    paddingRight: 0
                  }
                }}
                className="textfield"
                id="outlined-helperText"
                label={
                  <Box component="div" className="label">
                    Moisture Content 
                  </Box>
                }
                InputProps={{
                  inputProps: {
                    style: { textAlign: "center", fontSize: "17px" },
                  },
                  endAdornment: <InputAdornment position='end' sx={{...styledInputAdornment}}> % </InputAdornment>
                }}
                onChange={(e) => {
                  handleMoistureContent(e);
                }}
                value={state.moistureContent.toString()}
                type="number"
                // defaultValue='50'
              />
            </FormControl>
          </div>
        </div>
        <Divider
          style={{
            width: "95%",
            marginTop: "10px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          {" "}
          Tree Charateristics{" "}
        </Divider>
        <div className="inputTable">
          <InputTable
            className="tree-charac"
            state={state}
            setState={setState}
          />
        </div>
        <div className="results">
          <Results
            className="result-table"
            input={state}
            setInput={setState}
            setFirstTimeOpen={setFirstTimeOpen}
          />
        </div>
      </Box>
    </Container>
  );
}

export default Page;
