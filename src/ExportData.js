import React from "react";
import ExcelJS from 'exceljs';
import Button from '@mui/material/Button';
import { saveAs } from 'file-saver';

function ExportData({input , state}){

    const makeExcel = async () =>  {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('ExcelJS sheet');
        // This part increases the width of a chosen column
        const nameColB = worksheet.getColumn('B');
        nameColB.width = 45;
        const nameColC = worksheet.getColumn('C');
        nameColC.width = 15;
        const nameColD = worksheet.getColumn('D');
        nameColD.width = 15;
        const nameColE = worksheet.getColumn('E');
        nameColE.width = 25;
        const nameColF = worksheet.getColumn('F');
        nameColF.width = 15;
        const nameColG = worksheet.getColumn('G');
        nameColG.width = 20;
        const nameColH = worksheet.getColumn('H');
        nameColH.width = 20;
        const nameColI = worksheet.getColumn('I');
        nameColI.width = 20;

        worksheet.addTable({
            name: 'UserSpecify',
            ref:'B2',
            headerRow: true,
            totalsRow: false,
            columns: [
                {name: 'Inputs'}, 
                {name: ' '},
            ],
            rows: [
                ['System Type', input.system],
                ['Cut Type', input.isPartialCut ? 'Partial Cut' : 'Clear Cut'],
                ['Yard/Skid/Forward Slope Dist (ft)', input.deliverToLandingDistance],
                ['Moisture Content (%)', input.moistureContent],
                ['Region', 'West'],
                ['Percent Slope (%)', input.slope],
                ['Elevation (ft)', input.elevation],
                ['Diesel Fuel Price ($/gal)', input.dieselFuelPrice],
                ['Include Loading cost?', input.includeLoadingCosts ? 'Yes' : 'No'],
                ['Is biomass salvage?', input.isBiomassSalvage ? 'Yes' : 'No'],
                ['Include the costs of collecting and chipping residues?', input.includeCostsCollectChipResidues ? 'Yes' : 'No'],
                ['Include move-in costs?', input.includeMoveInCosts ? 'Yes' : 'No'],
                ['Area Treated (acres)', input.includeMoveInCosts ? input.area : 'NA'],
                ['One Way Move In Distance (miles)', input.includeMoveInCosts ?  input.moveInDistance: 'NA'],
                ['Hourly Wage for Fallers ($/hr)', input.wageFaller],
                ['Hourly Wage for Other Workers ($/hr)', input.wageOther],
                ['Benefits and Overhead for Workers (%)', input.laborBenefits],
                ['Current Producer Price Index', input.ppiCurrent],
                ['Residue Recovery Fraction for WT systems (%)', input.residueRecovFracWT],
                ['Residue Recovery Fraction for CTL systems (%)', input.residueRecovFracCTL],
                ],
            });

        worksheet.addTable({
            name: 'TreeCharacteristics',
            ref: 'B25', 
            headerRow: true,
            totalsRow: false,
            columns: [{name: 'Inputs'}, {name: 'Trees/acre'}, {name: 'Vol/tree (ft3)'}, {name: 'Green Wood Density (lbs/cf)'}, {name: 'Residue Fraction'}, {name: 'Hardwood Fraction'}],
            rows: [
                ['Chip Trees', input.treesPerAcreCT, input.volumeCT, input.woodDensityCT, input.residueFractionCT, input.hardwoodFractionCT],
                ['Small log trees', input.treesPerAcreSLT, input.volumeSLT, input.woodDensitySLT, input.residueFractionSLT, input.hardwoodFractionSLT],
                ['Large log trees', input.treesPerAcreLLT, input.volumeLLT, input.woodDensityLLT, input.residueFractionLLT, input.hardwoodFractionLLT],
            ],
        });

        worksheet.addTable({
            name: 'Results',
            ref: 'B31',
            headerRow: true,
            totalsRow: false,
            columns: [{name: 'Outputs'}, {name: 'Yield (GT/ac)'}, {name: 'Cost ($/ac)'}, {name: 'Cost ($/BoleCCF)'}, {name: 'Cost ($/GT)'}, {name: 'Diesel (gal/ac)'}, {name: 'Gasoline (gal/ac)'}, {name: 'Jet Fuel (gal/ac)'}],
            rows: [
                ['Total', state.WeightPerAcreTotal, state.CostPerAcreTotal, state.CostPerBoleCCFTotal, state.CostPerGTTotal, state.DieselPerAcreTotal, state.GasolinePerAcreTotal, state.JetFuelPerAcreTotal],
                ['Residual Woody Biomass', state.WeightPerAcreResidue, state.CostPerAcreResidue, state.CostPerBoleCCFResidue, state.CostPerGTResidue, state.DieselPerAcreResidue, state.GasolinePerAcreResidue, state.JetFuelPerAcreResidue],
            ],
        });

        const workbookBuffer = await workbook.xlsx.writeBuffer();
        // send file to client
        saveAs(
            new Blob([workbookBuffer], { type: 'application/octet-stream' }),
            `FRCS_Results.xlsx`
        );
    }
    return (
        <>
        <Button variant="contained" onClick = {makeExcel} style={{fontSize: '14px'}}>Download</Button> 
        </>
    );
}

export default ExportData;