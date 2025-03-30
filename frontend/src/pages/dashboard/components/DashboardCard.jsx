const DashboardCard = ({ title, amount, className }) => (
  <div className="bg-white p-6 shadow-[0_0px_5px_rgba(0,0,0,0.1)] rounded-xl hover:scale-103 transition duration-300">
    <h4 className="text-2xl font-bold tracking-tighter mb-3">{title}</h4>
    <p className={`text-4xl font-bold -tracking-widest ${className}`}>
      {amount.toLocaleString("es-ES", {
        minimumFractionDigits: 2,
      })}
      €
    </p>
  </div>
);

export default DashboardCard;
