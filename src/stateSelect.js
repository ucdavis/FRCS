import React from 'react'
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'

function StateSelect() {
  const stateChange = (e) => {
    // console.log(e.target)
  }
  const states = [
    'Alabama',
    'Alaska',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'Florida',
    'Georgia',
    'Hawaii',
    'Idaho',
    'IllinoisIndiana',
    'Iowa',
    'Kansas',
    'Kentucky',
    'Louisiana',
    'Maine',
    'Maryland',
    'Massachusetts',
    'Michigan',
    'Minnesota',
    'Mississippi',
    'Missouri',
    'MontanaNebraska',
    'Nevada',
    'New Hampshire',
    'New Jersey',
    'New Mexico',
    'New York',
    'North Carolina',
    'North Dakota',
    'Ohio',
    'Oklahoma',
    'Oregon',
    'Pennsylvania',
    'Rhode Island',
    'South Carolina',
    'South Dakota',
    'Tennessee',
    'Texas',
    'Utah',
    'Vermont',
    'Virginia',
    'Washington',
    'West Virginia',
    'Wisconsin Wyoming',
  ]

  return (
    <FormControl sx={{ m: 1 }} fullWidth>
      <InputLabel id='state' className='inputlabel'>
        State
      </InputLabel>
      <Select
        defaultValue=""
        labelId='state'
        id='state'
        // value={age}
        label='state'
        className='select'
        onChange={(e) => {
          stateChange(e)
        }}
      >
        {states.map((state, id) => {
          return <MenuItem value={states[id]} key={id}>{states[id]} </MenuItem>
        })}
      </Select>
    </FormControl>
  )
}

export default StateSelect
