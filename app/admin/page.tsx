export default function AdminDashboard() {
  return (
    <div className="container mx-auto p-8">
      <div className="glass p-6 rounded-xl">
        <h1 className="text-3xl font-bold text-primary-300 mb-4">Admin Dashboard</h1>
        <p className="text-primary-200 mb-4">Use this admin area to manage users, assign roles, and oversee community content.</p>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="glass p-4 rounded-lg">
            <h2 className="text-xl font-semibold text-primary-300">Database Management</h2>
            <p className="text-primary-200">Add or edit entries, approve submissions, and manage related titles.</p>
          </div>
          <div className="glass p-4 rounded-lg">
            <h2 className="text-xl font-semibold text-primary-300">Community Moderation</h2>
            <p className="text-primary-200">Review reports, moderate comments, and assign community roles.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
