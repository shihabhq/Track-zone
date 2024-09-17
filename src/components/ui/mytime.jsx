import CreateButton from "../buttons/ceateButton";
import Container from "../necessaries/container";
import MyTimeInput from "../inputs/myTimeInput";
import { useEffect, useState } from "react";
import MyCard from "../cards/myTimeCard";

const Mytime = ({ownTime,setOwnTime}) => {

  const [showInput, setShowInput] = useState(false);

  useEffect(() => {
    setOwnTime({ ...JSON.parse(localStorage.ownTime) });
  }, [showInput]);
  const clickToShowInput = () => {
    setShowInput(true);
  };
  return (
    <div>
      <h1 className="heading">My time</h1>
      <Container>
        <CreateButton
          bgColor={"#1cc447"}
          buttonName={
            Object.keys(ownTime).length > 0 ? "Update My Time" : "Set My Time"
          }
          onclick={clickToShowInput}
        />

        {showInput && (
          <MyTimeInput
            controlSelf={setShowInput}
            name={"My time"}
            syncTime={true}
            formatName={"Set UTC format"}
            canSetZone={false}
            setItemInto={"ownTime"}
            createName={
              Object.keys(ownTime).length > 0 ? "Update Time" : "Set Time"
            }
          />
        )}
        {ownTime?.id && <MyCard storedTime={ownTime} />}
      </Container>
    </div>
  );
};

export default Mytime;
