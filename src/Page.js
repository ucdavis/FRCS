import React, { useState , useEffect} from 'react'
import {useSetState} from 'react-use';
import './Page.css'
import Results from './Results'
import InputTable from './inputTable'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import Divider from '@mui/material/Divider'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import FilledInput from '@mui/material/FilledInput'
import InputAdornment from '@mui/material/InputAdornment'
import initialInput from './initialInput'
// import { StylesProvider } from '@mui/styles';

function Page() {
  const systemTypes = [ 'Ground-Based Mech WT', 'Ground-Based Manual WT', 'Ground-Based Manual Log', 'Ground-Based CTL', 'Cable Manual WT/Log', 'Cable Manual WT', 'Cable Manual Log', 'Cable CTL', 'Helicopter Manual Log', 'Helicopter CTL' ]
  const cutTypes = ['Clear Cut', 'Partial Cut']
  const [state, setState] = useSetState(initialInput);
  const [firstTimeOpen, setFirstTimeOpen] = useState(true);

  const handleSystemType = (e) => {setState({System: e.target.value})}
  const handleCutType = (e) => { 
    setFirstTimeOpen(false);
    if(String(e.target.value) === 'Partial Cut'){setState({PartialCut: true})} 
    else{setState({PartialCut: false})}
  }
  const handleDeliverDist = (e) => {setState({DeliverDist: parseFloat(e.target.value)})}
  const handleSlope = (e) => {setState({Slope: parseFloat(e.target.value)})}
  const handleMoistureContent = (e) => {setState({MoistureContent: parseFloat(e.target.value)})}
  const handleDieselFuelPrice = (e) => {setState({DieselFuelPrice: parseFloat(e.target.value)})}
  const handleElevation = (e) => {setState({Elevation: parseFloat(e.target.value)})}
  const handleArea = (e) => {setState({Area: parseFloat(e.target.value)})}
  const handleMoveInDist = (e) => {setState({MoveInDist: parseFloat(e.target.value)})}
  const handleCalcLoad = () => { setState({CalcLoad: !state.CalcLoad}) }
  const handleCalcMoveIn = () => { setState({CalcMoveIn: !state.CalcMoveIn}) }
  const handleCalcResidues = () => { setState({CalcResidues: !state.CalcResidues})}
  const handleChipAll = () => { setState({ChipAll: !state.ChipAll}) }

  // useEffect(() => {
  //   console.log(state);
  // },[state]);

  return (
    <Container style={{width: '90vw', paddingLeft: '0px', paddingRight: '0px'}}>
      <h1 className='title'>Fuel Reduction Cost Simulator - West</h1>
      <Box className='box'>
        <div className='configuration'>
          <div className='configurationLeftmiddle'>
          <div className='configuration-left'>
            <FormControl sx={{ m: 1 }} fullWidth>
              <InputLabel id='system-type' className='label' style={{fontSize: '17px'}}> System Type </InputLabel>
              {/* <Box component="div" id='system-type' className='label'>System Type</Box> */}
              <Select
                labelId='system-type'
                id='system-type'
                label='system-type'
                className='select'
                onChange={(e)=>handleSystemType(e)}
                value={state.System}
                defaultValue=""
              >
                {systemTypes.map((system, id)=> {return <MenuItem value={systemTypes[id]} key={id}  >{systemTypes[id]}</MenuItem>})}
              </Select>
            </FormControl>

            <FormControl sx={{ m: 1 }} fullWidth >
              <InputLabel id='cut-type' className='label' style={{fontSize: '17px'}}>Cut Type</InputLabel>
              <Select
                labelId='cut-type'
                id='cut-type'
                label='cut-type'
                className='select'
                onChange={(e)=> handleCutType(e)}
                value={firstTimeOpen ? '' : (state.PartialCut ? 'Partial Cut' : 'Clear Cut')}
                defaultValue=""
              >
                {cutTypes.map((cut, id)=> {return <MenuItem value={cut} key={id} style={{fontSize: '17px'}}> {cut} </MenuItem>})}
              </Select>
            </FormControl>
            {/* <StateSelect /> */}
            <FormControl sx={{ m: 1 }} fullWidth >
              <TextField
                className='textfield'
                id='outlined-helperText'
                label={<Box component="div" className='label'>Yard/Skid/Forward Slope Dist (ft)</Box>}
                InputProps={{inputProps: {style: { textAlign: "center", fontSize: '17px' }}}}
                onChange={(e)=> handleDeliverDist(e)}
                value={state.DeliverDist}
                // defaultValue='400'
              />
            </FormControl>
            <FormControl sx={{ m: 1 }} fullWidth >
              <TextField
                className='textfield'
                id='outlined-helperText'
                label={<Box component="div" className='label'>Moisture Content (%)</Box>}
                InputProps={{inputProps: {style: { textAlign: "center", fontSize: '17px' }}}}
                onChange={(e) => {handleMoistureContent(e)}}
                value={state.MoistureContent}
                // defaultValue='50'
              />
            </FormControl>
          </div>
          <div className='configuration-middle'>
          <FormControl sx={{ m: 1 }} fullWidth disabled>
              <InputLabel id='state' className='label' style={{fontSize: '17px'}} > State: California</InputLabel>
              <Select
                labelId='state'
                id='state'
                // label='state'
                label={<Box component="div" className='label'> state </Box>}
                className='select'
                defaultValue=""
              >
                <MenuItem value={'California'}>California</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1 }} fullWidth>
              <TextField
                className='textfield'
                id='outlined-helperText'
                label={<Box component="div" className='label'> Slope (%)</Box>}
                InputProps={{inputProps: {style: { textAlign: "center", fontSize: '17px' }}}}
                onChange={(e) => handleSlope(e)}
                value={state.Slope}
              />
            </FormControl>
            <FormControl sx={{ m: 1 }} fullWidth>
              <TextField
                id='outlined-helperText'
                label={<Box component="div" className='label'> Elevation (ft)</Box>}
                InputProps={{inputProps: {style: { textAlign: "center", fontSize: '17px' }}}}
                onChange = {(e) => handleElevation(e)}
                value={state.Elevation}
              />
            </FormControl>
            <FormControl sx={{ m: 1 }} fullWidth>
              <TextField
                id='outlined-helperText'
                label={<Box component="div" className='label'> Diesel Fuel Price ($/gal)</Box>}
                InputProps={{inputProps: {style: { textAlign: "center", fontSize: '17px' }}}}
                onChange={(e)=>{handleDieselFuelPrice(e)}}
                value={state.DieselFuelPrice}
              />
            </FormControl>
          </div>
          </div>
          <div className='checkList'>
              <div className='firstLineCheckList'>
              <FormControlLabel
                control={<Checkbox onClick = {handleCalcLoad} checked={state.CalcLoad}/>}
                // label={<Box component="div" fontSize={15}> Include Loading Costs</Box>}
                label={<Box component="div" className='label'> Include Loading Costs</Box>}
                className={`${state.CalcMoveIn ? 'small' : 'large'}`}
              />
              <FormControlLabel
                control={<Checkbox onClick = {handleChipAll} checked={state.ChipAll}/>}
                // label='Include chipping all trees'
                label={<Box component="div" className='label'> Include chipping all trees</Box>}
                className={`${state.CalcMoveIn ? 'small' : 'large'}`}
              />
              </div>
              <div className='secondLineCheckList'>
              <FormControlLabel
                control={<Checkbox onClick = {handleCalcResidues} checked={state.CalcResidues}/>}
                label={<Box component="div" className='label'> Include the costs of collecting and chipping residues</Box>}
                className={`${state.CalcMoveIn ? 'small' : 'large'}`}
              />
              <FormControlLabel
                control={<Checkbox onClick={handleCalcMoveIn} checked={state.CalcMoveIn}/>}
                // label='Include move-in costs'
                label={<Box component="div" className='label'> Include move-in costs</Box>}
                className={`${state.CalcMoveIn ? 'small' : 'large'}`}
              />
              {state.CalcMoveIn && (
                <div className='hide'>
                  <FormControl sx={{ m: 1,  width: '200px' }}>
                    <InputLabel htmlFor='area' style={{fontSize: '15px'}}>Area treated:</InputLabel>
                    <FilledInput
                      label='area'
                      id='area'
                      value={state.Area}
                      endAdornment={
                        <InputAdornment position='end' style={{fontSize: '15px', fontWeight: 'bold'}}><p>arces</p></InputAdornment>
                      }
                      inputProps={{style: { textAlign: "center", fontSize: '16px' }}}
                      size='small'
                      onChange={(e) => {handleArea(e)}}
                    />
                  </FormControl>
                  <FormControl sx={{ m: 1, width: '250px' }}>
                    <InputLabel htmlFor='distance' style={{fontSize: '15px'}}>
                      One way move in distance
                    </InputLabel>
                    <FilledInput
                      label='distance'
                      id='distance'
                      value={state.MoveInDist}
                      endAdornment={
                        <InputAdornment position='end' style={{fontSize: '15px', fontWeight: 'bold'}}> <p>miles</p></InputAdornment>
                      }
                      inputProps={{style: { textAlign: "center", fontSize: '16px' }}}
                      size='small'
                      onChange={(e) => {handleMoveInDist(e)}}
                    />
                  </FormControl>
                </div>
              )}
              </div>
        </div>
      </div>
        <Divider style={{ width: '95%', marginTop: '10px', marginLeft: 'auto', marginRight: 'auto' }}> Tree Charateristics </Divider>
        <div className='inputTable'>
          <InputTable className='tree-charac' state={state} setState={setState}/>
        </div>
        <div className='results'><Results className='result-table' input = {state} setInput={setState} setFirstTimeOpen={setFirstTimeOpen}/></div>
      </Box>
    </Container>
  )
}

export default Page
