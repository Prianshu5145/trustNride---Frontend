import React from "react";
import { Navigate } from "react-router-dom";

/**
 * Higher-order component to restrict access based on user roles.
 * @param {React.ComponentType} Component - The component to render.
 * @param {Array<string>} allowedRoles - The roles allowed to access the component.
 * @returns {React.ComponentType} - A wrapped component that checks roles.
 */
const withAuthorization = (Component, allowedRoles) => {
  return (props) => {
    console.log("withAuthorization: Component received:", Component);
    console.log("withAuthorization: Allowed roles received:", allowedRoles);

    if (!allowedRoles || !Array.isArray(allowedRoles)) {
      console.error("withAuthorization: allowedRoles must be an array.");
      return <Navigate to="/unauthorized" replace />;
    }

    const savedRoles = localStorage.getItem("role");
    console.log("withAuthorization: Retrieved saved roles from localStorage:", savedRoles);

    let userRoles;
    try {
      userRoles = JSON.parse(savedRoles); // Attempt to parse if stored as JSON
      console.log("withAuthorization: Parsed userRoles as JSON:", userRoles);
    } catch (error) {
      console.warn(
        "withAuthorization: Failed to parse savedRoles as JSON, treating as a single string role."
      );
      userRoles = savedRoles ? [savedRoles] : [];
    }

    if (!userRoles || !Array.isArray(userRoles)) {
      console.error("withAuthorization: userRoles is not a valid array:", userRoles);
      return <Navigate to="/unauthorized" replace />;
    }

    console.log("withAuthorization: Final userRoles for comparison:", userRoles);

    // Check if any of the user's roles match the allowed roles
    const isAuthorized = allowedRoles.some((role) => userRoles.includes(role));
    console.log("withAuthorization: Authorization check result:", isAuthorized);

    if (!isAuthorized) {
      console.warn("withAuthorization: User is not authorized.");
      return <Navigate to="/unauthorized" replace />;
    }

    console.log("withAuthorization: User is authorized. Rendering component.");
    return <Component {...props} />;
  };
};

export default withAuthorization;
