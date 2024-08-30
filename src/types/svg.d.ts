declare module "*.svg" {
    import React from "react";

    interface SVGProps extends React.SVGProps<SVGSVGElement> {}

    const component: React.FC<SVGProps>;
    export default component;
}
