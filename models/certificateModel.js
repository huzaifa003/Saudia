const mongoose = require('mongoose');
const certificateModel = mongoose.Schema({
    certificateNo: String,
    iqamaPic: String,
    profilePic: String,
    qrLink: String,
    clientName: String,
    supervisorName: String,
    welderName: String,
    identification_wps: String,
    iqamaNo: String,
    QualifcationStandard: String,

    
    welderId: String,
    baseMetalSpecs: String,
    wtaRef: String,
    jointType: String,
    date_of_test: String,
    weldType: String,

    welderProcessActualVals: String,
    welderProcessRangeQual: String,

    typesOfWeldersActualVals: String,
    typesOfWeldersRangeQual: String,

    brackingActualVals: String,
    brackingRangeQual: String,

    productTypeActualVals: String,
    productTypeRangeQual: String,

    diameterOfPipeActualVals: String,
    diameterOfPipeRangeQual: String,

    baseMetalp_pActualVals: String,
    baseMetalp_pRangeQual: String,

    fillerMetalActualVals: String,
    fillerMetalRangeQual: String,

    fillerMetalFNoActualVals: String,
    fillerMetalFNoRangeQual: String,

    fillerMetalAdditionActualVals: String,
    fillerMetalAdditionRangeQual: String,

    consumableInsertActualVals: String,
    consumableInsertRangeQual: String,

    depositeThicknessActualVals: String,
    depositeThicknessRangeQual: String,

    welderPositionActualVals: String,
    welderPositionRangeQual: String,

    verticalProgressionActualVals: String,
    verticalProgressionRangeQual: String,
    typesOfFuelGasActualVals: String,
    typesOfFuelGasRangeQual: String,

    insertGasBackingActualVals: String,
    insertGasBackingRangeQual: String,

    transferModelActualVals: String,
    transferModelRangeQual: String,

    currentTypePolarityActualVals: String,
    currentTypePolarityRangeQual: String,

    virtualInspectorChecked: Boolean,
    virtualInspectorReportNo: String,
    virtualInspectorResults: String,

    radiographyChecked: Boolean,
    radiographyReportNo: String,
    radiographyResults: String,

    mechTestChecked: Boolean,
    mechTestReportNo: String,
    mechTestResults: String,
})

const Certificate = mongoose.model("Certificate", certificateModel);
module.exports = Certificate