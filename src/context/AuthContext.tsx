import * as React from "react";

interface AuthContextData {
  user?: any;

  // onShowResChatbot: (value: any) => void;
}

export const AuthContext = React.createContext<AuthContextData>({
  user: null,

  // onShowResChatbot: () => {},
});
