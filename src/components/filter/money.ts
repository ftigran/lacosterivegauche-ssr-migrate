 export default ( value = "", decimal = "." ) => {
    let money = value.split(/[,.]/);
    if (money[1]) {
        if (money[1].length == 1) {
            money[1] = (parseInt(money[1]) * 10).toString();
        }
    } else {
        money[1] = "00";
    }
    return money.join(decimal);
};



