const DashboardCard = ({ icon: Icon, value, label, trend }) => (
    <div className="bg-gray-800 p-4 rounded-sm border border-gray-700">
      <div className="flex items-center">
        <Icon className="text-gray-400 text-xl mr-4" />
        <div>
          <div className="text-2xl font-bold">{value}</div>
          <div className="text-gray-400 text-sm">{label}</div>
        </div>
      </div>
      <div
        className={`${
          trend > 0 ? "text-green-400" : "text-red-400"
        } text-sm mt-2 flex items-center gap-1`}
      >
        {trend > 0 ? "▲" : "▼"} {Math.abs(trend)}%
      </div>
    </div>
  );
  
  export default DashboardCard;
  