import React from 'react';
import {DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown} from "reactstrap";


const UserMenu = ({user, logout}) => (
    <UncontrolledDropdown nav inNavbar>
        <DropdownToggle nav caret>
                <img src={user.avatar} alt="icon" style={{width: "60px", marginRight: 10,  marginLeft: 20}}/>
            Hello, {user.displayName}
        </DropdownToggle>
        <DropdownMenu right>
            <DropdownItem divider/>
            <DropdownItem className="ml-2" onClick={logout}>
                Log out
            </DropdownItem>
        </DropdownMenu>
    </UncontrolledDropdown>
);

export default UserMenu;