import CreateButton from "./buttons/ceateButton";

const CardContainer = ({ bgColor, buttonName }) => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CreateButton bgColor={bgColor} buttonName={buttonName} />
      <div></div>
    </div>
  );
};

export default CardContainer;
