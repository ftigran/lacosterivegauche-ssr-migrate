import React from "react";

export default (value: string | number | undefined) => {
  const v = value?.toString()?.trim() ?? "";

  if (!v.length) return <></>;
  const phone = v.substr(-10).padStart(10,"0");
  const country = v.substr(0, v.length - 10);
  return (
    <>
      +{!country.length ? "7" : country} &nbsp;{phone.substr(0, 3)}&nbsp;
      {phone.substr(3, 3)}&nbsp;{phone.substr(6, 2)}
      &nbsp;{phone.substr(8, 2)}
    </>
  );
};
