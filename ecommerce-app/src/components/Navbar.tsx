    'use client';
    import { AppBar, Toolbar, Button } from '@mui/material';
    import { useSession, signIn, signOut } from 'next-auth/react';
    import { useRouter } from 'next/navigation';

    export default function Navbar() {
    const { data: session } = useSession();
    const router = useRouter();

    return (
        <AppBar position="static">
        <Toolbar>
            <Button color="inherit" onClick={() => router.push('/')}>
            Home
            </Button>
            <Button color="inherit" onClick={() => router.push('/products')}>
            Products
            </Button>
            {session?.user?.role === 'admin' && (
            <Button color="inherit" onClick={() => router.push('/products/new')}>
                Add Product
            </Button>
            )}
            {session ? (
            <Button color="inherit" onClick={() => signOut()}>
                Logout
            </Button>
            ) : (
            <Button color="inherit" onClick={() => signIn('google')}>
                Login
            </Button>
            )}
        </Toolbar>
        </AppBar>
    );
    }
