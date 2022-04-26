const ExampleInput = {
  system: "Ground-Based Mech WT",
  isPartialCut: false,
  deliverToLandingDistance: 553.91,
  slope: 12.42,
  elevation: 1586.29,
  includeLoadingCosts: true,
  includeMoveInCosts: false,
  area: 32.025456,
  moveInDistance: 0,
  includeCostsCollectChipResidues: true,
  woodDensityCT: 81.09,
  woodDensitySLT: 67.17,
  woodDensityLLT: 57.64,
  residueFractionCT: 0.27,
  residueFractionSLT: 0.30,
  residueFractionLLT: 0.26,
  hardwoodFractionCT: 0.2,
  hardwoodFractionSLT: 0,
  hardwoodFractionLLT: 0,
  treesPerAcreCT: 77.41,
  volumeCT: 2.06,
  treesPerAcreSLT: 19.70,
  volumeSLT: 23.60,
  treesPerAcreLLT: 2.70,
  volumeLLT: 137.70,
  dieselFuelPrice: 2.24,
  moistureContent: 50,
  isBiomassSalvage: false,
  wageFaller: 35.13, // CA FallBuckWage May 2020
  wageOther: 22.07, // CA AllOthersWage May 2020
  laborBenefits: 35, // Assume a nationwide average of 35% for benefits and other payroll costs
  ppiCurrent: 284.7, // Oct 2021
  residueRecovFracWT: 80, // FRCS default 80%
  residueRecovFracCTL: 50, // FRCS default 50%
};

export default ExampleInput;
