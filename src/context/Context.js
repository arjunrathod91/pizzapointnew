import { createContext, useState } from "react";

export const Context = createContext();

export const MyContextProvider = ({ children }) => {
    const [sidebarOpen,setSidebarOpen] = useState(false);
    const [category,setCategory] = useState('');
    const [cart,setCart] = useState([]);
    const [total,setTotal] = useState(0);
    const [loggedIn,setLoggedIn] = useState(false);
    const [allorders,setAllOrders] = useState([]);
    const [userDetails,setUserDetails] = useState({});
    const [rightSec,setRIghtSec] = useState(false);
    const [newOrder,setNewOrder] = useState({});
    const [adminOrders,setAdminOrders] = useState([]);
    

  return (
    <Context.Provider
      value={{sidebarOpen,setSidebarOpen,cart,setCart,total,setTotal,loggedIn,setLoggedIn,allorders,setAllOrders,userDetails,setUserDetails,rightSec,setRIghtSec,newOrder,setNewOrder,adminOrders,setAdminOrders,category,setCategory}}
    >
      {children}
    </Context.Provider>
  );
};