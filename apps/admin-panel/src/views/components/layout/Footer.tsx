import "./layout.css";

const Footer = () => {
  return (
    <footer class="footer">
      &copy; {new Date().getFullYear()} My Website. All rights reserved.
    </footer>
  );
};

export default Footer;
