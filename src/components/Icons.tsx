import React, { ReactNode } from "react";
import SvgIcon from "@material-ui/core/SvgIcon";

export function createSvgIcon(path: ReactNode, displayName: string) {
  const Component = React.memo(
    React.forwardRef((props, ref) => (
      <SvgIcon {...props} ref={ref}>
        {path}
      </SvgIcon>
    ))
  );

  if (process.env.NODE_ENV !== "production") {
    Component.displayName = `${displayName}Icon`;
  }

  return Component;
}

export const ExpandMoreIcon = createSvgIcon(
  <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />,
  "ExpandMore"
);

export const ThemeDarkIcon = createSvgIcon(
  <path d="M20 8.69V4h-4.69L12 .69 8.69 4H4v4.69L.69 12 4 15.31V20h4.69L12 23.31 15.31 20H20v-4.69L23.31 12 20 8.69zM12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zm0-10c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z" />,
  "BrightnessHigh"
);

export const ThemeLightIcon = createSvgIcon(
  <path d="M20 8.69V4h-4.69L12 .69 8.69 4H4v4.69L.69 12 4 15.31V20h4.69L12 23.31 15.31 20H20v-4.69L23.31 12 20 8.69zM12 18c-.89 0-1.74-.2-2.5-.55C11.56 16.5 13 14.42 13 12s-1.44-4.5-3.5-5.45C10.26 6.2 11.11 6 12 6c3.31 0 6 2.69 6 6s-2.69 6-6 6z" />,
  "Brightness4"
);
