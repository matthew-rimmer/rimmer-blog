import React, { CSSProperties } from "react";
import { animated, useSpring } from "@react-spring/web";
import { Spin } from "antd";

interface slideInLoadingProps {
  loaded: boolean;
  children: any;
  style?: CSSProperties;
}

export const SlideInLoading = (props: slideInLoadingProps) => {
  const loadedProps = useSpring({
    opacity: props.loaded ? 1 : 0,
    transform: props.loaded
      ? "translate3d(0px,0,0)"
      : "translate3d( 500px,0,0)",
  });
  return (
    <>
      {" "}
      {props.loaded ? (
        <animated.div style={{ ...props.style, ...loadedProps }}>
          {props.children}
        </animated.div>
      ) : (
        <Spin />
      )}
    </>
  );
};
