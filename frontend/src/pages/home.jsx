import Navbar from "../components/Navbar";

function Home() {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-950 text-white">
        <h1 className="text-6xl font-bold pt-32 text-center">
          NeighborGrid
        </h1>

        <p className="text-center mt-6 text-gray-400 text-xl">
          Hyperlocal AI platform connecting neighbors during communication blackouts.
        </p>
      </div>
    </>
  );
}

export default Home;