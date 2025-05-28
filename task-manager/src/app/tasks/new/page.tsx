    import { getServerSession } from 'next-auth/next';
    import { authOptions } from '@/lib/auth';
    import { redirect } from 'next/navigation';
    import TaskForm from '@/components/TaskForm';

    export default async function NewTask() {
    const session = await getServerSession(authOptions);
    if (!session) redirect('/');

    return (
        <div>
        <h1 className="text-2xl font-bold">Create New Task</h1>
        <TaskForm userId={session.user.id} />
        </div>
    );
    }
