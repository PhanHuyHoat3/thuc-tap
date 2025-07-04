    'use client';

    import { signIn } from 'next-auth/react';
    import { useRouter } from 'next/navigation';
    import { useState } from 'react';

    export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await signIn('credentials', {
        redirect: false,
        email,
        password,
        });

        if (res?.error) {
        setError('Invalid credentials');
        } else {
        router.push('/'); // đăng nhập thành công redirect về trang chính
        }
    };

    return (
        <form onSubmit={handleSubmit}>
        <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
        />
        <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
        />
        <button type="submit">Login</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
    );
    }
