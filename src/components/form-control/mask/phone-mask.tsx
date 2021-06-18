import React, { forwardRef} from "react";
import MaskedInput from "react-text-mask";

export default forwardRef<MaskedInput, any>((params, ref) => {
  const { inputRef, ...props } = params;

  return (
    <MaskedInput
      {...props}
      type="tel"
      //ref={ref}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null);
    }}
      // prettier-ignore
      mask={["+", "7", "(",/\d/, /\d/, /\d/, ")", " ", /\d/,  /\d/, /\d/, " ", /\d/, /\d/, " ",/\d/, /\d/]}
    />
  );
});
