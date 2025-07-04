    'use client';

    import { useSession } from 'next-auth/react';
    import { useRouter } from 'next/navigation';
    import { useEffect } from 'react';

    export default function AdminOnlyPage() {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === 'loading') return;
        if (!session || session.user?.role !== 'admin') {
        router.push('/'); // chuyển về trang chính hoặc trang 403
        }
    }, [session, status, router]);

    if (status === 'loading' || !session) return <div>Loading...</div>;

    return <div>{/* Nội dung trang admin */}</div>;
    }
