import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (session) redirect('/tasks');

  return (
    <div className="text-center mt-20">
      <h1 className="text-4xl font-bold mb-4">Welcome to Task Manager</h1>
      <p className="mb-4">Time: 10:35 PM +07, May 26, 2025</p>
      <Link href="/api/auth/signin">
        <Button size="lg">Sign In</Button>
      </Link>
    </div>
  );
}
