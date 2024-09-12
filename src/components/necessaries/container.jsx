const Container = (props) => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection:'column',
        gap:'1rem'
      }}
    >{props.children}</div>
  );
};

export default Container;
