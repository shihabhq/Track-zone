import styles from "./Button.module.css";

const CreateButton = ({ buttonName, bgColor, padding, fontSize,onclick }) => {
  return (
    <button onClick={onclick}
      style={{ backgroundColor: bgColor, padding: padding, fontSize: fontSize }}
      className={styles.button}
    >
      {buttonName}
    </button>
  );
};

export default CreateButton;
