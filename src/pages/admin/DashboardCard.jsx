const DashboardCard = ({ title, value, icon: Icon, color = "bg-gray-200" }) => (
  <div className={`p-4 rounded-xl shadow flex items-center gap-4 ${color}`}>
    <Icon className="w-10 h-10 text-gray-700" />
    <div>
      <div className="text-sm text-gray-600">{title}</div>
      <div className="text-xl font-bold text-gray-800">{value}</div>
    </div>
  </div>
);

export default DashboardCard;
