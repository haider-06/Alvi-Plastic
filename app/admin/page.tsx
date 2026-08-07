import { redirect } from 'next/navigation';

export default function AdminIndexPage() {
  // Redirect to login; middleware will handle authenticated users later if needed.
  redirect('/admin/login');
}
