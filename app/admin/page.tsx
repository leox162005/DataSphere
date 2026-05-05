export default function AdminDashboard() {
  return (
    <div className="container mx-auto p-8">
      <div className="glass p-8 rounded-xl bg-slate-800/50 border border-slate-700">
        <h1 className="text-4xl font-bold text-primary-400 mb-4">Admin Dashboard</h1>
        <p className="text-slate-300 mb-8 text-lg">Use this admin area to manage users, assign roles, and oversee community content.</p>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="glass p-6 rounded-xl bg-slate-800/30 border border-slate-600 hover:border-primary-500 transition-colors">
            <div className="text-3xl mb-4">📊</div>
            <h2 className="text-xl font-semibold text-primary-300 mb-2">Database Management</h2>
            <p className="text-slate-400">Add or edit entries, approve submissions, and manage related titles.</p>
          </div>
          <div className="glass p-6 rounded-xl bg-slate-800/30 border border-slate-600 hover:border-primary-500 transition-colors">
            <div className="text-3xl mb-4">👥</div>
            <h2 className="text-xl font-semibold text-primary-300 mb-2">User Management</h2>
            <p className="text-slate-400">Manage user accounts, assign roles, and handle permissions.</p>
          </div>
          <div className="glass p-6 rounded-xl bg-slate-800/30 border border-slate-600 hover:border-primary-500 transition-colors">
            <div className="text-3xl mb-4">🛡️</div>
            <h2 className="text-xl font-semibold text-primary-300 mb-2">Community Moderation</h2>
            <p className="text-slate-400">Review reports, moderate comments, and assign community roles.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
