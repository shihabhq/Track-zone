import CreateButton from "../buttons/ceateButton";
import Container from "../necessaries/container";

const ClientTime = () => {
  return (
    <div>
      <h1 className="heading">Client time</h1>
      <Container>
        <CreateButton bgColor={"#04b482"} buttonName={"Create Client Time"} />
      </Container>
    </div>
  );
};

export default ClientTime;
