import AvatarDropdown from "./UserAvatar";

import "./layout.css";

const Header = () => {
  return (
    <header class="header">
      <h3>Dashboard</h3>

      <AvatarDropdown />
    </header>
  );
};

export default Header;
