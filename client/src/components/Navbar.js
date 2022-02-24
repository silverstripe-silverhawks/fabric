import React from 'react'
import { DummyData } from './DummyData';
import TopNavFabricator from './TopNavFabricator';
import loggedin from '../icons/logstate.svg'
// import '../bundles/bundle.scss';

const Navbar = () => {

  return (
 <div className='fabricator-sidebar'>
    <nav className="fabricator-nav-menu">
      <div className="fabricator-menu-title">
      <h3>Login to MyNZQA</h3>
      <h5>View site tree</h5>
      </div>
    <ul className='fabricator-nav-menu-items'>

      {/* this will map through the api to get each block. Dummy data for now. */}
      {DummyData.map((item, index) => {
        return (
          <li key={index} className={item.cName}>
              <span>{item.title}</span> 
          </li>
        );
      })}
      <button className= "fabricator-button">Add a block</button>
    </ul>
  </nav>

  </div>
  )
}

export default Navbar