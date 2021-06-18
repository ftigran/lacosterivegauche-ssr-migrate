import React, { forwardRef } from "react";
import MaskedInput from "react-text-mask";


export default forwardRef<MaskedInput, any>((params, ref) => {
    const { inputRef, ...props } = params;
    return (
        <MaskedInput
            type="number"
            {...props}
            ref={ref => {
                inputRef(ref ? ref.inputElement : null);
            }}
            // prettier-ignore
            mask={[/[012]/, /\d/, ":", /[012345]/, /\d/]}
            placeholderChar={"_"}
            showMask={false}
        />
    );
})




  

