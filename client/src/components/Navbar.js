import React, {useState} from 'react'
import { DummyData } from './DummyData';
// import '../bundles/bundle.scss';

const Navbar = () => {
    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => {
      setSidebar(!sidebar);
    }
  return (
 <div>
    <div className="navbar">
        <div className= "menu-bars">
        <button onClick={showSidebar}/>
        </div>
    </div>
    <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
    <ul className='nav-menu-items' onClick={showSidebar}>
      <li className='navbar-toggle'>
          <p>x</p>
      </li>
      {/* this will map through the api to get each block. Dummy data for now. */}
      {DummyData.map((item, index) => {
        return (
          <li key={index} className={item.cName}>
              <span>{item.title}</span> 
          </li>
        );
      })}
      <button className= "">Add a block</button>
    </ul>
  </nav>

  </div>
  )
}

export default Navbar