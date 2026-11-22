import Container from "../../container";
import Logo from "./logo";
import HeaderMenu from "./headerMenu";
import SearchBar from "./searchBar";
import LanguageSwitcher from "./languageSwitcher";
import HeaderIcons from "./headerIcons";
import MobileMenu from "./mobileMenu/page";
import SignIn from "./auth/SignIn";

const Header = async () => {
  return (
    <header className="bg-white py-4 border-b border-gray-200">
      <Container className="flex items-center justify-between gap-3">
        <MobileMenu />
        <Logo />
        <HeaderMenu />

        <div className="flex items-center gap-2">
          <SearchBar />
          <LanguageSwitcher />
          <HeaderIcons />
          <SignIn />
        </div>
      </Container>
    </header>
  );
};

export default Header;
