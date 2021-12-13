
const initialInput = {
    system: '',
    isPartialCut: false, //- set to True if not select clearCut 
    deliverToLandingDistance: '',
    slope: '',
    elevation: '',
    includeLoadingCosts: false,
    includeMoveInCosts: false,
    moveInDistance: 0,
    area: 0,
    includeCostsCollectChipResidues: false,
    woodDensityCT: '', 
    woodDensitySLT: '',
    woodDensityLLT: '',
    residueFractionCT: '',
    residueFractionSLT: '',
    residueFractionLLT: '',
    hardwoodFractionCT: '',
    hardwoodFractionSLT: '',
    hardwoodFractionLLT: '',
    treesPerAcreCT: '', //trees per aeca
    treesPerAcreSLT: '',
    treesPerAcreLLT: '',
    volumeCT: '',
    volumeSLT: '',
    volumeLLT: '',
    dieselFuelPrice: '',
    moistureContent: '',
    isBiomassSalvage: false,
    wageFaller = '',
    wageOther = '',
    laborBenefits = '',
    ppiCurrent = '',
    residueRecovFracWT = '',
    residueRecovFracCTL = '',
}

export default initialInput;