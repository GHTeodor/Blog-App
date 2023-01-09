import Logo from '../images/logo.png';

export function Footer() {
    return (
        <footer>
            <img src={Logo} alt="Logo" />

            <span>
                Made with ❤️ and
                <b>React</b>
            </span>
        </footer>
    );
}
