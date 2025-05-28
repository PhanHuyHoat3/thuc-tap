    import { getServerSession } from 'next-auth/next';
    import { authOptions } from '@/lib/auth';
    import prisma from '@/lib/prisma';
    import { Role } from '@/types/User';
    import { notFound, redirect } from 'next/navigation';
    import { Button } from '@/components/ui/button';
    import Link from 'next/link';

    export default async function TaskDetail({
    params,
    }: {
    params: { id: string };
    }) {
    const session = await getServerSession(authOptions);
    if (!session) redirect('/');

    const task = await prisma.task.findUnique({ where: { id: params.id } });
    if (!task) notFound();
    if (session.user.role !== Role.ADMIN && task.userId !== session.user.id) {
        redirect('/tasks');
    }

    return (
        <div className="space-y-4">
        <h1 className="text-2xl font-bold">{task.title}</h1>
        <p>{task.description || 'No description'}</p>
        <p>Status: {task.completed ? 'Completed' : 'Pending'}</p>
        <Link href={`/tasks/${task.id}/edit`}>
            <Button>Edit</Button>
        </Link>
        </div>
    );
    }
