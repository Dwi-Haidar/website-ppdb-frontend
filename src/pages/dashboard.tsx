const Dashboard: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-screen bg-gray-100">
      <div className="text-center p-8 bg-white shadow-lg rounded-lg max-w-4xl w-full">
        <h1 className="text-4xl font-extrabold text-green-600 mb-4">
          Welcome to Dashboard
        </h1>
        <p className="text-lg font-semibold text-gray-700">
          SMP ISLAM KARYA MUKTI
        </p>
        <p className="mt-4 text-gray-600">
          Here you can manage all the activities, monitor progress, and get insights into various aspects of the institution.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
