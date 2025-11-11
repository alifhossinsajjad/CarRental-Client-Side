

import Carosul from "./Carosul";
import LatestCars from "./LatestCars";

import TopratedCar from "./TopratedCar";

const Home = () => {
  

  return (
    <div>
      {/* carosul section */}
      <section>
        <div>
          <Carosul />
        </div>
      </section>

      {/* latest car section */}
      <section className="my-20">
        <LatestCars/>
      </section>

      {/* top rated cars */}
      <section>
        <div>
          <TopratedCar />
        </div>
      </section>
    </div>
  );
};

export default Home;
