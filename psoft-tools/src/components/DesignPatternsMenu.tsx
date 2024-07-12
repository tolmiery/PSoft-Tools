import React, { useState } from 'react';
import { MenuContainer, MenuItem, SubMenuContainer, SubMenuItem } from './MenuStyles.ts';

interface MenuItemProps {
    title: string;
    subItems: string[];
}
const MenuItemComponent: React.FC<MenuItemProps> = ({ title, subItems }) => {

    const [isOpen, setIsOpen] = useState(false);

    const handleMenuClick = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div>
            <MenuItem onClick={handleMenuClick}>
                {title}
            </MenuItem>
            {isOpen && (
                <SubMenuContainer>
                    {subItems.map((subItem, index) => (
                        <SubMenuItem key={index}>{subItem}</SubMenuItem>
                    ))}
                </SubMenuContainer>
            )}
        </div>
    );
};


export const Menu: React.FC = () => {
    const menuItems = [
        { title: "What are design patterns?", subItems: [] },
        { title: 'Creational', subItems: ['Submenu 1-1', 'Submenu 1-2'] },
        { title: 'Structural', subItems: ['Submenu 2-1', 'Submenu 2-2'] },
        { title: 'Behavioral', subItems: ['Submenu 3-1', 'Submenu 3-2'] },
    ];

    return (
        <MenuContainer>
            {menuItems.map((item, index) => (
                <MenuItemComponent key={index} title={item.title} subItems={item.subItems} />
            ))}
        </MenuContainer>
    );
};


