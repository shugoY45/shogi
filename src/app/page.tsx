import Link from "next/link";

// import { CreatePost } from "~/app/_components/create-post";
import { api } from "~/trpc/server";
// import ShogiBoard from './_components/ShogiBoard';
// import BedReservationButton from './_components/BedReservationButton';
import BedDisplayContainer from './_components/BedDisplayContainer';

const Home = () => {
  return (
    <div>
      {/* <h1>Shogi Board</h1> */}
      {/* <ShogiBoard /> */}
      {/* <BedReservationButton /> */}
      <BedDisplayContainer />
    </div>
  );
};

export default Home;