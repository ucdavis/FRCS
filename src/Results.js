import React, {useState, useEffect} from 'react'
import {useSetState} from 'react-use';
import './Results.css';
import { styled } from '@mui/material/styles'
import Divider from '@mui/material/Divider'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { runFrcs } from '@ucdavis/frcs';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
// import initialInput from './initialInput'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import ExportData from './ExportData';
import ExampleInput from './ExampleInput';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.common.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    // backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}))

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const initialOutput = {
     //OUTPUT
     WeightPerAcreTotal: '',
     CostPerAcreTotal: '',
     CostPerBoleCCFTotal: '',
     CostPerGTTotal: '',
     DieselPerAcreTotal: '',
     GasolinePerAcreTotal: '',
     JetFuelPerAcreTotal: '',
     WeightPerAcreResidue: '',
     CostPerAcreResidue: '',
     CostPerBoleCCFResidue: '',
     CostPerGTResidue: '',
     DieselPerAcreResidue: '',
     GasolinePerAcreResidue: '',
     JetFuelPerAcreResidue: ''
}

function Results({input, setInput, setFirstTimeOpen}) {
    const [state, setState] = useSetState(initialOutput)
    const [openDialog, setOpenDialog] = useState(false);
    const [openAlart, setOpenAlart] = useState(false);

    const testNoneValue = (input) => {
      if(input.System === '' || input.PartialCut === '' || input.DeliverDist === '' || 
        input.Slope === '' || input.Elevation === '' ||
        input.UserSpecWDCT === '' || input.UserSpecWDSLT === '' || input.UserSpecWDLLT === '' || 
        input.UserSpecRFCT === '' || input.UserSpecRFSLT === '' || input.UserSpecRFLLT === '' || 
        input.UserSpecHFCT === '' || input.UserSpecHFSLT === '' || input.UserSpecHFLLT === '' || 
        input.RemovalsCT === '' || input.TreeVolCT === '' || input.RemovalsSLT === '' || 
        input.TreeVolSLT === '' || input.RemovalsLLT === '' || input.TreeVolLLT === '' || 
        input.DieselFuelPrice === '' || input.MoistureContent === '') {return true}
      else {return false}
    }

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpenAlart(false);
    };

    const calculate = () => {
      if(testNoneValue(input)) { setOpenAlart(true) }
      else{
        const output = runFrcs(input);
        const Total = output.Total;
        const Residue = output.Residue;
        setState({
            WeightPerAcreTotal : Total.WeightPerAcre.toFixed(3),
            WeightPerAcreResidue : Residue.WeightPerAcre.toFixed(3),
            CostPerAcreTotal: Total.CostPerAcre.toFixed(3),
            CostPerAcreResidue: Residue.CostPerAcre.toFixed(3),
            CostPerBoleCCFTotal: Total.CostPerBoleCCF.toFixed(3),
            CostPerBoleCCFResidue: Residue.CostPerBoleCCF.toFixed(3),
            CostPerGTTotal: Total.CostPerGT.toFixed(3),
            CostPerGTResidue: Residue.CostPerGT.toFixed(3),
            DieselPerAcreTotal: Total.DieselPerAcre.toFixed(3),
            DieselPerAcreResidue: Residue.DieselPerAcre.toFixed(3),
            GasolinePerAcreTotal: Total.GasolinePerAcre.toFixed(3),
            GasolinePerAcreResidue: Residue.GasolinePerAcre.toFixed(3),
            JetFuelPerAcreTotal: Total.JetFuelPerAcre.toFixed(3),
            JetFuelPerAcreResidue: Residue.JetFuelPerAcre.toFixed(3)
        })
      }
    }
    
    const handleClearAllButton = () => { setOpenDialog(true) }
    const handleDisagree = () => { setOpenDialog(false)}
    const handleAgree = () => {setOpenDialog(false); window.location.reload()}
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
      <div className='btn-group' >
        <div className='btn-group1'>
        <Button variant="contained" onClick = {calculate} style={{fontSize: '14px'}} className='btn'>Calculate</Button>
        <Button variant="contained" onClick = {handleClearAllButton} style={{fontSize: '14px'}} className='btn'>Clear</Button>
        </div>
        <div className='btn-group2'>
        <Button variant="contained" onClick = {handleExampleInput} style={{fontSize: '14px'}} className='btn'>Use Example Inputs</Button>
        <ExportData input={input} state = {state}/>
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
            <Button variant="outlined" onClick={handleDisagree}> Disagree </Button>
            <Button variant="outlined" onClick={handleAgree} autoFocus> Agree </Button>
          </DialogActions>
      </Dialog>

      <Divider style={{ width: '95%', marginTop: '30px', marginLeft: 'auto', marginRight: 'auto' }}> Results </Divider>

      <TableContainer component={Paper} style={{width: '95%',  margin: '15px auto'}}>
        <Table sx={{ minWidth: 700 }} aria-label='simple table'>
          <TableHead>
            <TableRow sx={{ height: 5 }}>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell align='center'>Yield&nbsp;(GT/ac)</StyledTableCell>
              <StyledTableCell align='center'>Cost&nbsp;($/ac)</StyledTableCell>
              <StyledTableCell align='center'>Cost&nbsp;($/BoleCCF)</StyledTableCell>
              <StyledTableCell align='center'>Cost&nbsp;($/GT)</StyledTableCell>
              <StyledTableCell align='center'>Diesel&nbsp;(gal/ac)</StyledTableCell>
              <StyledTableCell align='center'> Gasoline&nbsp;(gal/ac)</StyledTableCell>
              <StyledTableCell align='center'> Jet Fuel&nbsp;(gal/ac)</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
              <StyledTableRow key='Total'>
                <StyledTableCell component='th' scope='row' style={{width: '10%'}}> Total </StyledTableCell>
                <StyledTableCell align='right'>{state.WeightPerAcreTotal}</StyledTableCell>
                <StyledTableCell align='right'> {state.CostPerAcreTotal} </StyledTableCell>
                <StyledTableCell align='right'> {state.CostPerBoleCCFTotal} </StyledTableCell>
                <StyledTableCell align='right'> {state.CostPerGTTotal} </StyledTableCell>
                <StyledTableCell align='right'> {state.DieselPerAcreTotal} </StyledTableCell>
                <StyledTableCell align='right'> {state.GasolinePerAcreTotal} </StyledTableCell>
                <StyledTableCell align='right'> {state.JetFuelPerAcreTotal} </StyledTableCell>
              </StyledTableRow>
              <StyledTableRow key='Reside'>
                <StyledTableCell component='th' scope='Reside' style={{width: '10%'}}> Residual Woody Biomass </StyledTableCell>
                <StyledTableCell align='right'> {state.WeightPerAcreResidue} </StyledTableCell>
                <StyledTableCell align='right'> {state.CostPerAcreResidue} </StyledTableCell>
                <StyledTableCell align='right'> {state.CostPerBoleCCFResidue} </StyledTableCell>
                <StyledTableCell align='right'> {state.CostPerGTResidue} </StyledTableCell>
                <StyledTableCell align='right'> {state.DieselPerAcreResidue} </StyledTableCell>
                <StyledTableCell align='right'> {state.GasolinePerAcreResidue} </StyledTableCell>
                <StyledTableCell align='right'> {state.JetFuelPerAcreResidue} </StyledTableCell>
              </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>
      
      <Snackbar open={openAlart} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="info" sx={{ width: '100%', borderRadius: '10px'}}>
          Please Fill in Values!
        </Alert>
      </Snackbar>
  </>
  )
}

export default Results
