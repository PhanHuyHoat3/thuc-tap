    // src/components/Navbar.jsx
    import { Link } from 'react-router-dom';
    import styles from '../styles/Navbar.module.css';

    function Navbar() {
    return (
        <nav className={styles.navbar}>
        <Link to="/" className={styles.logo}>Book Manager</Link>
        <Link to="/books/new" className={styles.link}>Thêm Sách Mới</Link>
        </nav>
    );
    }

    export default Navbar;