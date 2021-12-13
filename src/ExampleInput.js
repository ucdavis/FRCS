const ExampleInput = {
  system: "Cable Manual WT",
  isPartialCut: true,
  deliverToLandingDistance: 400,
  slope: 30,
  elevation: 5000,
  includeLoadingCosts: true,
  includeMoveInCosts: true,
  area: 1,
  moveInDistance: 2,
  includeCostsCollectChipResidues: true,
  woodDensityCT: 60,
  woodDensitySLT: 58.6235,
  woodDensityLLT: 62.1225,
  residueFractionCT: 0,
  residueFractionSLT: 0.25,
  residueFractionLLT: 0.38,
  hardwoodFractionCT: 0.2,
  hardwoodFractionSLT: 0,
  hardwoodFractionLLT: 0,
  treesPerAcreCT: 20,
  volumeCT: 50,
  treesPerAcreSLT: 50,
  volumeSLT: 70,
  treesPerAcreLLT: 5,
  volumeLLT: 100,
  dieselFuelPrice: 3.61,
  moistureContent: 50,
  isBiomassSalvage: false,
  wageFaller = 35.13, // CA FallBuckWage May 2020
  wageOther = 22.07, // CA AllOthersWage May 2020
  laborBenefits = 35, // Assume a nationwide average of 35% for benefits and other payroll costs
  ppiCurrent = 284.7, // Oct 2021
  residueRecovFracWT = 80, // FRCS default 80%
  residueRecovFracCTL = 50, // FRCS default 50%
}

export default ExampleInput;