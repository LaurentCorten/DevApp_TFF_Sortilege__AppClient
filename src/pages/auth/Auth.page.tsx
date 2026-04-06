import { Outlet } from "react-router";
import style from "./Auth.module.css";





export default function AuthPage() {


    return (
        <div className={style["auth-container"]}>
            <Outlet />
        </div>
    )
}