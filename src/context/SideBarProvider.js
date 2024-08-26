
import React, { useState ,createContext} from 'react'




export const SidebarContext = createContext()



export default function SideBarProvider({children}) {
    const [sidebarstatus,setSidebarstatus]=useState(false);
  return (
    <SidebarContext.Provider value={{sidebarstatus,setSidebarstatus}}>
        {children}
    </SidebarContext.Provider>
  )
}
