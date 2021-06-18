import React, { forwardRef } from "react";
import MaskedInput from "react-text-mask";
import createNumberMask from "./createNumberMask";

export default forwardRef<MaskedInput, any>((params, ref) => {
    const { inputRef, ...props } = params;    return (
        <MaskedInput
            type="number"
            ref={ref => {
                inputRef(ref ? ref.inputElement : null);
            }}
            mask={createNumberMask({
                prefix: "",
                suffix: "",
                integerLimit: 10,
                includeThousandsSeparator: false,
                thousandsSeparatorSymbol: "",
                decimalLimit: 0,
                requireDecimal: false,
                allowLeadingZeroes: true
              })}
            {...props}
        />
    );
})
  

