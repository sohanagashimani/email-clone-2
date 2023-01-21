import React from "react";
import { Spin } from "antd";
// eslint-disable-next-line import/no-extraneous-dependencies
import { LoadingOutlined } from "@ant-design/icons";

const Spinner = ({
  spinning,
  children,
  antIcon,
  size = 40,
  className = "flex items-center justify-center",
  loadingColor,
}) => {
  return (
    <>
      <div className={className}>
        <Spin
          indicator={
            antIcon || (
              <LoadingOutlined
                style={{
                  fontSize: size,
                  marginRight: "0.4em",
                  marginBottom: "0.4em",
                  ...(loadingColor && { color: loadingColor }),
                }}
                spin
              />
            )
          }
          spinning={spinning}
        />
      </div>
      {children}
    </>
  );
};

export default Spinner;
