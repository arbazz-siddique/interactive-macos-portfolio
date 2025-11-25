import React from 'react'
import dayjs from 'dayjs'
import {navIcons, navLinks} from "#constants";


const Navbar = () => {
    return( <nav>
        <div>
            <img src="/images/logo.svg" alt="logo" />
            <p className="font-bold">Arbazz Portfolio</p>
            <ul>
                {navLinks.map(({name, id})=>(
                    <li key={id}>
                        <p>{name}</p>
                    </li>
                ))}
            </ul>
        </div>
            <div>
                <ul>
                    {navIcons.map(({id,img})=>(
                        <li key={id}>
                            <img className="icon-hover" src={img} alt={`icon -${id}`} />
                        </li>
                    ))}
                </ul>
                <time>{dayjs().format('ddd MMM D h:mm A')}</time>
            </div>
    </nav>
    )
}
export default Navbar
