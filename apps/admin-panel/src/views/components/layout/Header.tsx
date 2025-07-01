import AvatarDropdown from "./UserAvatar";

import "./layout.css";

type HeaderProps = {
  label: string
}

const Header = (props: HeaderProps) => {

  return (
    <header class="header">
      <h4 class="fw-300">{props.label}</h4>

      <AvatarDropdown />
    </header>
  );
};

export default Header;
