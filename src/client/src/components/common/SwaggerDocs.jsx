import React from "react";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import "./swaggerDocs.css";

const SwaggerUIComponent = () => {
  return (
    <div>
      <SwaggerUI url="http://localhost:8080/swagger.json" />
    </div>
  );
};

export default SwaggerUIComponent;
