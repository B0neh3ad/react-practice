import styles from '../styles/Header.module.css';

function Header() {
    return (
        <header className={styles.header} data-testid="header">
            <a className={styles.logoWrap} href="https://wafflestudio.com">
                <img className={styles.waffleLogo} src="/favicon.ico" alt="wafflestudio logo" data-testid="waffle-logo" />
                <h1 className={styles.headerTitle} data-testid="header-title">과자 리뷰</h1>
            </a>
        </header>
    )
}

export default Header;
