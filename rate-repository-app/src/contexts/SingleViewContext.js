import { createContext, useContext, useState } from "react";

const SingleViewContext = createContext();

export const SingleViewContextProvider = (props) => {
  const [singleView, setSingleView] = useState(false);
  return (
    <SingleViewContext.Provider value={[singleView, setSingleView]}>
      {props.children}
    </SingleViewContext.Provider>
  );
};

export const useSingleView = () => {
  return useContext(SingleViewContext);
};

export default SingleViewContextProvider;
