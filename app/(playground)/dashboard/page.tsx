export default function DashboardHomePage() {
    return (
      <div className="p-6">
        {/* Welcome Section */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Welcome to the Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Here you can manage your account, view analytics, and access other features.
          </p>
        </div>
  
        {/* Example Widgets */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Widget 1 */}
          <div className="p-4 bg-white shadow rounded-lg">
            <h2 className="text-lg font-semibold text-gray-800">Analytics</h2>
            <p className="text-gray-600 mt-2">View your recent activity and performance metrics.</p>
          </div>
  
          {/* Widget 2 */}
          <div className="p-4 bg-white shadow rounded-lg">
            <h2 className="text-lg font-semibold text-gray-800">Tasks</h2>
            <p className="text-gray-600 mt-2">Keep track of your tasks and to-do items.</p>
          </div>
  
          {/* Widget 3 */}
          <div className="p-4 bg-white shadow rounded-lg">
            <h2 className="text-lg font-semibold text-gray-800">Settings</h2>
            <p className="text-gray-600 mt-2">Update your profile and account preferences.</p>
          </div>
        </div>
      </div>
    );
  }