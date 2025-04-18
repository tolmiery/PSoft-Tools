import { Link } from "react-router-dom";
import "./MenuStyles.css"

export default function DesignPatternsMenu() {
    const isActive = (path: string) => location.pathname === path ? "active" : "";
    return (
        <div className="menuContainer">
            <div className="menuItem">
                <Link to="/DesignPatterns/WhatPatterns" className={`link ${isActive("/DesignPatterns/WhatPatterns")}`}>
                    What are design patterns?
                </Link>
            </div>
            <div className="menuItem">
                <Link to="/DesignPatterns/CreationalPatterns" className={`link ${isActive("/DesignPatterns/CreationalPatterns")}`}>
                    Creational design patterns
                </Link>
            </div>
            <div className="menuItem">
                <Link to="/DesignPatterns/BehavioralPatterns" className={`link ${isActive("/DesignPatterns/BehavioralPatterns")}`}>
                    Behavioral design patterns
                </Link>
            </div>
            <div className="menuItem">
                <Link to="/DesignPatterns/StructuralPatterns" className={`link ${isActive("/DesignPatterns/StructuralPatterns")}`}>
                    Structural design patterns
                </Link>
            </div>
        </div>
    );
}