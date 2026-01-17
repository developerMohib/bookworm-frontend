import { redirect } from 'next/navigation';

export default function Home() {
  // Example user (replace with real auth logic)
  const user = null; 
  // const user = { role: 'admin' };

  // Not logged in → redirect to login
  if (!user) {
    redirect('/login');
  }

  // Redirect based on role
  // if (user.role === 'admin') {
  //   redirect('/dashboard');
  // }

  redirect('/my-library');
}
