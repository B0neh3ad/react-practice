import { NavLink } from 'react-router-dom';
import styles from '../styles/Header.module.css';

function Header() {
    function getNavLinkClassName({ isActive }: { isActive: boolean }) {
        return isActive ? `${styles.navLink} ${styles.active}` : styles.navLink;
    }

    return (
        <header data-testid="header" className={styles.header}>
            <a className={styles.logoWrap} href="https://wafflestudio.com">
                <img data-testid="waffle-logo" className={styles.waffleLogo} src="/favicon.ico" alt="wafflestudio logo" />
                <h1 data-testid="header-title" className={styles.headerTitle}>과자 리뷰</h1>
            </a>
            <nav className={styles.nav}>
                <NavLink data-testid="review" to="/" className={getNavLinkClassName}>리뷰</NavLink>
                <NavLink data-testid="snack" to="/snacks" className={getNavLinkClassName}>과자</NavLink>
            </nav>
        </header>
    )
}

export default Header;
