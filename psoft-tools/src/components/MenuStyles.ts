import styled from 'styled-components';

export const AppContainer = styled.div`
  display: flex;
  height: 100vh;
`;

export const MenuContainer = styled.div`
  width: 250px;
  background-color: #333;
  color: white;
  padding: 10px;
  box-sizing: border-box;
  height: 100vh; /* Full height */
`;

export const MenuItem = styled.div`
  padding: 10px;
  cursor: pointer;
  text-align: left;
  &:hover {
    background-color: #444;
  }
`;

export const SubMenuContainer = styled.div`
  padding-left: 20px;
`;

export const SubMenuItem = styled.div`
  padding: 5px 10px;
  cursor: pointer;
  &:hover {
    background-color: #555;
  }
`;
