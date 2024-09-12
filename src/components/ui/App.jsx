import "../../styles/style.css";
import CreateButton from "../buttons/ceateButton";
import CardContainer from "../Cardcontainer";
import MyTimeInput from "../inputs/myTimeInput";
import ClientTime from "./clientTime";
import Mytime from "./mytime";

function App() {
  return (
    <>
      <h1 className="heading">Track Zone</h1>
      <Mytime />
      <ClientTime />
      {/* <h1 className="heading">Track Zone</h1>
      <CardContainer bgColor={'#13315c'} buttonName={'Create Time'} />
      <hr />
      <CardContainer bgColor={'#81b29a'} buttonName={'Create Client Time'} /> */}
    </>
  );
}

export default App;
