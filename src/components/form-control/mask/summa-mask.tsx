import React, { useState, forwardRef } from "react";
import MaskedInput from "react-text-mask";
import createNumberMask from "./createNumberMask";

export default forwardRef<MaskedInput, any>((params, ref) => {
    const { inputRef, ...props } = params;
    const mask = (rawValue:string) => {

         let value = rawValue;
         const n = rawValue.indexOf(",");
         if (n > 0) {
             value = rawValue.toString().replace(/,/, ".");
         }
  
        return createNumberMask({
            prefix: "",
            suffix: "",
            integerLimit: 6,
            includeThousandsSeparator: true,
            thousandsSeparatorSymbol: " ",
            decimalLimit: 2,
            allowDecimal: true,
            requireDecimal: true,
            allowLeadingZeroes: true,
            decimalSymbol: "."
        })(value);
    };

    return (
        <MaskedInput
            type="number"
            ref={ref => {
                inputRef(ref ? ref.inputElement : null);
            }}
            mask={rawValue => mask(rawValue)}
            pipe={v => {
                // let b = v.split(/[.,]/);

                // b[1] = b[1] || "00";
                // b[0] = b[0].padStart(1, "0");
                // b[1] = b[1].padStart(2, "0");
                
                // return b.join(".");
return v
            }}
            {...props}
        />
    );
})

