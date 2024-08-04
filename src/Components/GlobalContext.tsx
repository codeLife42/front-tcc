import { createContext, useState } from "react";

const defaultContextValue = {
  userType: "user.banco",
  setUserType: () => {},
};

// Cria o contexto
const GlobalContext = createContext(defaultContextValue);

// Cria um provedor para o contexto
export const GlobalProvider = ({ children }: any) => {
  const [userType, setUserType] = useState("user.banco");

  return (
    <GlobalContext.Provider value={{ userType, setUserType } as any}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
