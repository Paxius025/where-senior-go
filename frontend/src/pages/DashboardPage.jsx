import Navbar from "../components/Navbar";
export default function DashboardPage() {
    
 return (
        <div>
            <Navbar />
            <div className="p-4">
                <h2 className="text-2xl font-bold">Dashboard</h2>
        <p className="mt-2 text-gray-700">Welcome to your dashboard.</p>
      </div>
    </div>
  );
}
