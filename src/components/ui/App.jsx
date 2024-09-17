import "../../styles/style.css";
import { useState } from "react";
import ClientTime from "./clientTime";
import Mytime from "./mytime";

function App() {
  if (!localStorage.allotTimes) {
    localStorage.setItem("allotTimes", JSON.stringify([]));
  }
  if (!localStorage.ownTime) {
    localStorage.setItem("ownTime", JSON.stringify({}));
  }
  const [allotTimes, setAllotTimes] = useState([
    ...JSON.parse(localStorage.allotTimes),
  ]);

  const [ownTime, setOwnTime] = useState({
    ...JSON.parse(localStorage.ownTime),
  });

  return (
    <>
      <h1 className="heading">Track Zone</h1>
      <Mytime ownTime={ownTime} setOwnTime={setOwnTime} />
      <ClientTime
        allotTimes={allotTimes}
        setAllotTimes={setAllotTimes}
        ownTime={ownTime}
        setOwnTime={setOwnTime}
      />
    </>
  );
}

export default App;
