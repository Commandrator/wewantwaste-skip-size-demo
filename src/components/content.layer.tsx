import React, { type JSX } from "react";
import type { ContentLayerProps } from "../interfaces/props.dto";
const ContentLayer: React.FC<ContentLayerProps> = (props): JSX.Element => {
  const { children, title, subTitle } = props;
  return (
    <div className="flex flex-col w-full">
      {title ? <h2 className="text-2xl font-bold text-center mb-4">{title}</h2> : null}
      {subTitle ? <span className="text-[#59584F]/70 dark:text-[#F2F0D0]/70 text-center mb-8">{subTitle} </span> : null}
      <div className="flex flex-col">{children}</div>
    </div>
  );
};
export default ContentLayer;