import PropTypes from "prop-types";

export function kladr_arr(kladr) {
    const { name = "", subject, subject_region } = kladr || {};
    const { name: subjectName = "" } = subject || {};
    const { name: subjectRegionName = "" } = subject_region | {};
    const arr = [];
    if (subjectRegionName && subjectRegionName.length > 0) {
        arr.push(subjectRegionName);
    }
    if (subjectName && subjectName.length > 0) {
        arr.push(subjectName);
    }
    if (name && name.length > 0) {
        arr.push(name);
    }
    return arr;
}

export function kladr_string(obj = {}) {
    const arr = kladr_arr(obj);

    return arr.join(", ");
}
