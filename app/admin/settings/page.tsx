'use client';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function SettingsPage() {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  async function handlePasswordChange(e: React.FormEvent) {
    e.preventDefault();
    if (newPassword !== confirmPassword) { setMsg('Passwords do not match.'); return; }
    if (newPassword.length < 8) { setMsg('Password must be at least 8 characters.'); return; }
    setSaving(true);
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) setMsg(`Error: ${error.message}`);
    else { setMsg('Password updated successfully!'); setNewPassword(''); setConfirmPassword(''); }
    setSaving(false);
  }

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/admin/login');
  }

  return (
    <div className="p-6 max-w-lg">
      <h1 className="text-2xl font-bold text-[#1a1a1a] mb-6">Settings</h1>

      <div className="bg-white rounded-2xl border border-[#e8e0d5] p-5 shadow-sm mb-5">
        <h2 className="font-bold text-[#1a1a1a] mb-4">Change Password</h2>
        {msg && <div className={`text-sm px-4 py-3 rounded-xl mb-4 ${msg.includes('Error') || msg.includes('not match') ? 'bg-red-50 border border-red-200 text-red-700' : 'bg-green-50 border border-green-200 text-green-700'}`}>{msg}</div>}
        <form onSubmit={handlePasswordChange} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-[#1a1a1a] mb-1">New Password</label>
            <input value={newPassword} onChange={e => setNewPassword(e.target.value)} type="password" placeholder="Min. 8 characters" className="w-full border border-[#e8e0d5] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a84c]" />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#1a1a1a] mb-1">Confirm Password</label>
            <input value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} type="password" placeholder="Repeat password" className="w-full border border-[#e8e0d5] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a84c]" />
          </div>
          <button type="submit" disabled={saving} className="py-3 bg-[#c9a84c] text-white rounded-xl font-bold hover:bg-[#a8892e] transition-colors disabled:opacity-60">
            {saving ? 'Saving…' : 'Update Password'}
          </button>
        </form>
      </div>

      <button onClick={handleSignOut} className="w-full py-3 border-2 border-red-200 text-red-600 rounded-xl font-semibold hover:bg-red-50 transition-colors">
        🚪 Sign Out
      </button>
    </div>
  );
}
