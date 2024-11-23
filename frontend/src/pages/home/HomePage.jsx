import Navbar from "../../components/common/Navbar";
import Tasks from "../../components/common/Tasks";

const HomePage = () => {
  const authUser = true;
  return (
    <div className="container mx-auto p-4">
      <Navbar />
      {authUser && <Tasks />}
    </div>
  );
};

export default HomePage;
