import { createContext, useState } from "react";

const ActiveAnchorContext = createContext({
  activeAnchor: "#home",
  setActiveAnchor: () => {},

  isClicked: false,
  setActiveAnchorImportant: () => {},

  whitePaperActiveAnchor: "#bullion",
  setWhitePaperActiveAnchor: () => {},
});

let currentDelay;

export const ActiveAnchorContextProvider = ({ children, ...props }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [activeAnchor, setActiveAnchor] = useState("#home");
  const [whitePaperActiveAnchor, setWhitePaperActiveAnchor] =
    useState("#bullion");

  const setActiveAnchorImportant = (hash) => {
    if (isClicked) clearTimeout(currentDelay);

    setIsClicked(true);
    setActiveAnchor(hash);

    const delay = setTimeout(() => {
      setIsClicked(false);
    }, 1000);

    currentDelay = delay;
  };

  const context = {
    activeAnchor: activeAnchor,
    setActiveAnchor: setActiveAnchor,
    isClicked: isClicked,
    setActiveAnchorImportant: setActiveAnchorImportant,
    whitePaperActiveAnchor: whitePaperActiveAnchor,
    setWhitePaperActiveAnchor: setWhitePaperActiveAnchor,
  };

  return (
    <ActiveAnchorContext.Provider value={context}>
      {children}
    </ActiveAnchorContext.Provider>
  );
};

export default ActiveAnchorContext;
