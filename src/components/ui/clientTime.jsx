import CreateButton from "../buttons/ceateButton";
import Container from "../necessaries/container";
import { useEffect, useState } from "react";
import ClientTimeInput from "../inputs/clientTimeInput";
import ClientCard from "../cards/ClientCards";

const ClientTime = ({ownTime,setOwnTime,allotTimes,setAllotTimes}) => {

  const [showInput, setShowInput] = useState(false);
  const [dataName, setDataName] = useState("");
  useEffect(() => {
    setAllotTimes([...JSON.parse(localStorage.allotTimes)]);
  }, [showInput]);
  const changeDataName = (e) => {
    setDataName(e.target.value);
  };

  const clickToShowInput = () => {
    setShowInput(true);
  };
  return (
    <div>
      <h1 className="heading">Client time</h1>
      <Container>
        <CreateButton
          bgColor={"#04b482"}
          buttonName={"Create Client Time"}
          onclick={clickToShowInput}
        />

        {showInput && (
          <ClientTimeInput
            name={"Client time"}
            controlSelf={setShowInput}
            canSetZone={true}
            formatName={"Set Time"}
            setItemInto={"allotTimes"}
            dataName={dataName}
            changeDataName={changeDataName}
          />
        )}

        {allotTimes.length > 0 && (
          <ClientCard allotTimes={allotTimes} setAllotTimes={setAllotTimes} ownTime={ownTime}
          setOwnTime={setOwnTime} />
        )}
      </Container>
    </div>
  );
};

export default ClientTime;
