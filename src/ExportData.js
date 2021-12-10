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
                ['System Type', input.System],
                ['Cut Type', input.PartialCut ? 'Partial Cut' : 'Clear Cut'],
                ['Yard/Skid/Forward Slope Dist (ft)', input.DeliverDist],
                ['Moisture Content', input.MoistureContent],
                ['State', 'California'],
                ['Percent Slope', input.Slope],
                ['Elevation', input.Elevation],
                ['Diesel Fuel Price', input.DieselFuelPrice],
                ['Include Loading cost', input.CalcLoad ? 'Yes' : 'No'],
                ['Include Chipping All Trees', input.ChipAll ? 'Yes' : 'No'],
                ['Include the costs of collecting and chipping residues', input.CalcResidues ? 'Yes' : 'No'],
                ['Include Move-In', input.CalcMoveIn ? 'Yes' : 'No'],
                ['Area Treated (acres)', input.CalcMoveIn ? input.Area : 'NA'],
                ['One Way Move In Distance (miles)', input.CalcMoveIn ?  input.MoveInDist: 'NA'],
                ],
            });

        worksheet.addTable({
            name: 'TreeCharacteristics',
            ref: 'B19', 
            headerRow: true,
            totalsRow: false,
            columns: [{name: 'Inputs'}, {name: 'Trees/acre'}, {name: 'Vol/tree (ft3)'}, {name: 'Green Wood Density (lbs/cf)'}, {name: 'Residue Fraction'}, {name: 'Hardwood Fraction'}],
            rows: [
                ['Chip Trees', input.RemovalsCT, input.TreeVolCT, input.UserSpecWDCT, input.UserSpecRFCT, input.UserSpecHFCT],
                ['Small log trees', input.RemovalsSLT, input.TreeVolSLT, input.UserSpecWDSLT, input.UserSpecRFSLT, input.UserSpecHFSLT],
                ['Large log trees', input.RemovalsLLT, input.TreeVolLLT, input.UserSpecWDLLT, input.UserSpecRFLLT, input.UserSpecHFLLT],
            ],
        });

        worksheet.addTable({
            name: 'Results',
            ref: 'B27',
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
            `Results.xlsx`
        );
    }
    return (
        <>
        <Button variant="contained" onClick = {makeExcel} style={{fontSize: '14px'}}>Download</Button> 
        </>
    );
}

export default ExportData;