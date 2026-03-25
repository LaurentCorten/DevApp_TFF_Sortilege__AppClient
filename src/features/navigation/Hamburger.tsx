import Hamburger from 'hamburger-react';
import { useState } from 'react';
import NavBar from './NavBar';
import style from "./Navigation.module.css";


export default function BurgerMenu() {

    const [isOpen, setOpen] = useState<boolean>(false);


    return (
        <>
            <Hamburger size={32} toggled={isOpen} toggle={setOpen} direction='right' easing="ease-in" rounded label='Menu' />
            {isOpen && <div className={style['burger-content']}><NavBar /></div>}
        </>
    );

}