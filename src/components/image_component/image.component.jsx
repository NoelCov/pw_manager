import React from "react";

import "./image.styles.scss";

const ImageComponent = ({ src, alt }) => <img className="img" alt={alt} src={src} />;

export default ImageComponent;
