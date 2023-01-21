import React from 'react';

const When = ({ isTrue, children }) => {
  if (!isTrue) {
    return null;
  }

  return <>{children}</>;
};

export default When;
