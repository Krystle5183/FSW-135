import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../context/UserProvider'

const Navbar = () => {
    const { logout, token, user: {username} } = useContext(UserContext)

    return(
        <div className='navbar'>
            {token && <Link to="/profile" className='profile-link'>Profile</Link>}
            <Link to="/public" className='public-link'>Public</Link>
            <h1 className='profile-nav'>{username}</h1>
            {token ? <button onClick={logout} className="logout">Logout</button> : <Link to ="/">Auth</Link>}
        </div>
    )
}

export default Navbar;