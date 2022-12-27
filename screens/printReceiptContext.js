import { createContext } from "react";
import * as Print from "expo-print";
export const PrintReceiptContext = createContext();

export const PrintReceiptContextProvider = ({ children }) => {
  const print = async (htmll) => {
    const html = await htmll;
    await Print.printAsync({
      html: html,
      width: 303,
    });
  };

  return (
    <PrintReceiptContext.Provider value={{ print }}>
      {children}
    </PrintReceiptContext.Provider>
  );
};
