    import React from 'react'
    import { Link } from 'react-router-dom'

    function Navbar() {
    return (
        <nav className='navbar'>
        <Link to="/">Danh sách bài viết</Link> | <Link to="/posts/new">Tạo bài viết mới</Link>
        </nav>
    )
    }

    export default Navbar
