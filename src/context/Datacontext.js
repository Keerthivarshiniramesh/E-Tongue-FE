import { createContext, useEffect, useState } from "react";
import { THINGSPEAK_URL } from "../utils/ThinkSpeak";


export const DContext = createContext()

const DataContext = ({ children }) => {

    const BeURL = process.env.REACT_APP_BeURL
    const [isAuth, setIsAuth] = useState(null)
    const [currentUser, setCurrentUser] = useState(null)



    useEffect(() => {
        fetch(`${BeURL}/checkauth`, {
            credentials: "include"
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setIsAuth(true)
                    setCurrentUser(data.user)
                }
                else {
                    setIsAuth(false)
                    setCurrentUser({})
                }
            })
            .catch(err => {
                setIsAuth(null)
                setCurrentUser(null)
                console.log("Erron in fetching User:", err)
                alert("Trouble in connecting to the Server, please try again later.")
            })
    }, [])


    const handleLogout = () => {
        fetch(`${BeURL}/logout`, {
            credentials: "include"
        })
            .then(res => res.json())
            .then(data => {
                alert(data.message)
                if (data.success) {
                    setIsAuth(false)
                    setCurrentUser({})
                }
            })
            .catch(err => {
                console.log("Erron in Logout:", err)
                alert("Trouble in connecting to the Server, please try again later.")
            })
    }


   

    const controls = {
        show: true,
        download: true,
        selection: false,
        zoom: false,
        zoomin: true,
        zoomout: true,
        pan: true,
        reset: true,
        zoomEnabled: true,
        autoSelected: 'zoom'
    };

    const data = { isAuth, currentUser, setIsAuth, setCurrentUser, BeURL, handleLogout, controls }

    return (
        <DContext.Provider value={data}>
            {children}
        </DContext.Provider>
    )
}

export default DataContext