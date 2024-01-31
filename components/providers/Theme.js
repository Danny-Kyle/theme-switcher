"use client"

import { ThemeProvider } from "next-themes"

function Themes({children}){
    return(
        <ThemeProvider enableSystem attribute="class">
            {children}
        </ThemeProvider>
    )
}

export default Themes