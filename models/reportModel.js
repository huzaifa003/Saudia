const mongoose = require('mongoose');

const reportModel = mongoose.Schema({
    serial_no: Number,
    doc_id: String,
    welder_id: String,
    iqama_no: String,
    test_coupon_id: String,
    date_of_inspection: String,
    welding_process: String,
    type_of_welding: String,
    backing: String,
    typeof_weld: String,
    thickness: String,
    product_type: String,
    diameter_of_pipe: String,
    base_metal_p_no: String,
    sfa: String,
    s: String,
    gtaw_paw: String,
    deposit_thickness : String,
    welding_position: String,
    vertical_progression: String,
    ofw: String,
    inert_gas: String,
    transfer_mode: String,
    type_polarity: String,
    voltage: String,
    current: String,
    travel_speed: String,
    interpass_temperature: String,
    pre_heat: String,
    post_weld: String,
    contractor_details: String,
    witness_inspector: String,
    qc_supervisor: String,
    project_details:String,
    welder_name: String
})

const Report = mongoose.model("Report",reportModel);
module.exports = Report;