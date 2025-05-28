    'use client';

    import { useSession } from 'next-auth/react';
    import { useRouter } from 'next/navigation';
    import { useQuery } from '@tanstack/react-query';
    import prisma from '@/lib/prisma';
    import { Role } from '@/types/User';
    import TaskItem from '@/components/TaskItem';
    import Link from 'next/link';
    import { Button } from '@/components/ui/button';

    const fetchTasks = async (userId: string, role: Role) => {
    const response = await fetch(`/api/tasks?userId=${userId}&role=${role}`);
    return response.json();
    };

    export default function TasksPage() {
    const { data: session, status } = useSession();
    const router = useRouter();

    if (status === 'loading') return <div>Loading...</div>;
    if (!session) {
        router.push('/');
        return null;
    }

    const { data: tasks, isLoading } = useQuery({
        queryKey: ['tasks', session.user.id, session.user.role],
        queryFn: () => fetchTasks(session.user.id, session.user.role),
    });

    if (isLoading) return <div>Loading tasks...</div>;

    return (
        <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold">Tasks</h1>
        <Link href="/tasks/new">
            <Button>New Task</Button>
        </Link>
        <div className="grid gap-4 mt-4">
            {tasks?.map((task: any) => (
            <TaskItem key={task.id} task={task} />
            ))}
        </div>
        </div>
    );
    }
