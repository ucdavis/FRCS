import React from 'react'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.common.white,
    width: '20px',
    height: '10px',
    fontSize: 14,
    fontWeight: 'bold',
    justifyContent: 'spaceBetween',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: '4px 4px',
    marginLeft:'4px'
  },
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}))
const rows = ['Chip Trees', 'Small Log Trees', 'Large Log Trees']

function InputTable({state, setState}) {
  //ct chip-tree slt - small-log-tree llt-large-log-tree WD-wood-density RF-residue fraction HF - hardwood-fraction
  // RemovalsCT
  const handleRemovalsCT = (e, {row}) => {
    if(row === 'Chip Trees'){setState({RemovalsCT: parseFloat(e.target.value)})}
    else if (row === 'Small Log Trees') {setState({RemovalsSLT: parseFloat(e.target.value)})}
    else {setState({RemovalsLLT: parseFloat(e.target.value)})}
  }

  // TreeVolCT
  const handleTreeVolCT = (e, {row}) => {
    if(row === 'Chip Trees'){setState({TreeVolCT: parseFloat(e.target.value)})}
    else if (row === 'Small Log Trees') {setState({TreeVolSLT: parseFloat(e.target.value)})}
    else {setState({TreeVolLLT: parseFloat(e.target.value)})}
  }

  //handleWD
  const handleWD = (e, {row}) => {
    if(row === 'Chip Trees'){setState({UserSpecWDCT: parseFloat(e.target.value)})}
    else if (row === 'Small Log Trees') {setState({UserSpecWDSLT: parseFloat(e.target.value)})}
    else {setState({UserSpecWDLLT: parseFloat(e.target.value)})}
  }

  //UserSpecRFCT
  const handleRF = (e, {row}) => {
    if(row === 'Chip Trees'){setState({UserSpecRFCT: parseFloat(e.target.value)})}
    else if (row === 'Small Log Trees') {setState({UserSpecRFSLT: parseFloat(e.target.value)})}
    else {setState({UserSpecRFLLT	: parseFloat(e.target.value)})}
  }

  ///handleHF
  const handleHF = (e, {row}) => {
    if(row === 'Chip Trees'){setState({UserSpecHFCT: parseFloat(e.target.value)})}
    else if (row === 'Small Log Trees') {setState({UserSpecHFSLT: parseFloat(e.target.value)})}
    else {setState({UserSpecHFLLT	: parseFloat(e.target.value)})}
  }

  const handleCTValue = ({row}) => {
    if(row === 'Chip Trees'){ return state.RemovalsCT }
    else if (row === 'Small Log Trees') {return state.RemovalsSLT}
    else { return state.RemovalsLLT }
  }

  const handleVolValue = ({row}) => {
    if(row === 'Chip Trees'){ return state.TreeVolCT }
    else if (row === 'Small Log Trees') {return state.TreeVolSLT}
    else { return state.TreeVolLLT }
  }

  const handleWDValue = ({row}) => {
    if(row === 'Chip Trees'){ return state.UserSpecWDCT }
    else if (row === 'Small Log Trees') {return state.UserSpecWDSLT}
    else { return state.UserSpecWDLLT }
  }

  const handleRFValue = ({row}) => {
    if(row === 'Chip Trees'){ return state.UserSpecRFCT }
    else if (row === 'Small Log Trees') {return state.UserSpecRFSLT}
    else { return state.UserSpecRFLLT }
  }

  const handleHFValue = ({row}) => {
    if(row === 'Chip Trees'){ return state.UserSpecHFCT }
    else if (row === 'Small Log Trees') {return state.UserSpecHFSLT}
    else { return state.UserSpecHFLLT }
  }


  return (
    <TableContainer component={Paper} style={{width: '95%', margin: '15px auto'}}>
      <Table sx={{ minWidth: 650 ,}} aria-label='simple table'>
        <TableHead>
          <TableRow sx={{ height: 5 }}>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell align='center' >Trees/acre</StyledTableCell>
            <StyledTableCell align='center' >Vol/tree&nbsp;(ft3)</StyledTableCell>
            <StyledTableCell align='center'>Green Wood Density&nbsp;(lbs/cf)</StyledTableCell>
            <StyledTableCell align='center'>Residue Fraction</StyledTableCell>
            <StyledTableCell align='center'>Hardwood Fraction</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row}>
              <StyledTableCell component='th' scope='row'>{row}</StyledTableCell>
              <StyledTableCell align='right'>
                <TextField 
                  id='filled-basic' variant='filled' size='small' type="number"
                  InputProps={{inputProps: {style: { textAlign: "center", fontSize: '16px' }}}} 
                  style={{width: '100%'}}
                  value={handleCTValue({row})}
                  onChange = {(e) => {handleRemovalsCT(e, {row})}}
                />
              </StyledTableCell>
              <StyledTableCell align='right'>
                <TextField 
                  id='filled-basic' variant='filled' size='small' type="number"
                  InputProps={{inputProps: {style: { textAlign: "center", fontSize: '16px' }}}} 
                  style={{width: '100%'}}
                  value={handleVolValue({row})}
                  onChange = {(e) => {handleTreeVolCT(e, {row})}}
                />
              </StyledTableCell >
              <StyledTableCell align='right' >
                <TextField 
                  id='filled-basic' variant='filled' size='small' type="number"
                  InputProps={{inputProps: {style: { textAlign: "center", fontSize: '16px' }}}} 
                  style={{width: '100%'}}
                  value={handleWDValue({row})}
                  onChange = {(e) => {handleWD(e, {row})}}
                />
              </StyledTableCell>
              <StyledTableCell >
                <TextField 
                  id='filled-basic' variant='filled' size='small' type="number"
                  InputProps={{inputProps: {style: { textAlign: "center", fontSize: '16px' }}}} 
                  style={{width: '100%'}}
                  value={handleRFValue({row})}
                  onChange = {(e) => {handleRF(e, {row})}}
                />
              </StyledTableCell>
              <StyledTableCell >
                <TextField 
                  id='filled-basic' variant='filled' size='small' type="number"
                  InputProps={{inputProps: {style: { textAlign: "center", fontSize: '16px' }}}} 
                  style={{width: '100%'}}
                  value={handleHFValue({row})}
                  onChange = {(e) => {handleHF(e, {row})}}
                />
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default InputTable
