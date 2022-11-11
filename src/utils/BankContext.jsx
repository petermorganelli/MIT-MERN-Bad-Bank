import { createContext, useContext, useState, useEffect, React } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

const BankContext = createContext();

export const useBankContext = () => useContext(BankContext);

export const BankProvider = ({ children }) => {

    const [loading, setLoading] = useState(true);
    const [authUser, setAuthUser] = useState("");
    const [bankUser, setBankUser] = useState({});
  
    //set authUser from firebase

    onAuthStateChanged(auth, (user) => {
        setAuthUser(user?.email);
        setLoading(false);
      });
    
    // fetch user data from mongoDb
    
    useEffect(() => {
      if(authUser){
            
            fetch(`/account/findOne/${authUser}`)
              .then((response) => response.json())
              .then((data) => {
              // console.log(data);
              setBankUser(data);
              });
            }
        }, [authUser, loading]);
    
    
    return (
    <BankContext.Provider
      value={{
        authUser,
        bankUser,
        loading, 
        setLoading
       }}
    >
      {children}
    </BankContext.Provider>
  );
}
