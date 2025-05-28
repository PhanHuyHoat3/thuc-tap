    import { getServerSession } from 'next-auth/next';
    import { authOptions } from '@/lib/auth';
    import prisma from '@/lib/prisma';
    import { Role } from '@/types/User';
    import { notFound, redirect } from 'next/navigation';
    import TaskForm from '@/components/TaskForm';

    export default async function EditTask({ params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions);
    if (!session) redirect('/');

    const task = await prisma.task.findUnique({ where: { id: params.id } });
    if (!task) notFound();
    if (session.user.role !== Role.ADMIN && task.userId !== session.user.id) {
        redirect('/tasks');
    }

    return (
        <div>
        <h1 className="text-2xl font-bold">Edit Task</h1>
        <TaskForm task={task} userId={session.user.id} />
        </div>
    );
    }
