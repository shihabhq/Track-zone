import CreateButton from "../buttons/ceateButton";
import styles from "./input.module.css";
import useInput from "../../hooks/inputHook";
// import createMyObject from "../../helpers/createObject";

const InputComponent = ({
  controlSelf,
  name,
  syncTime,
  canSetZone,
  syncCurrentTime,
  formatName,
  createMyObject,
  setItemInto,
  children,
  dataName,
}) => {
  const now = new Date();
  const {
    utcOffsetTime,
    hours,
    minutes,
    operation,
    handleUtcOffsetChange,
    handleHoursChange,
    handleMinutesChange,
    handleOperationChange,
    currentFormat,
    handleFormatChange,
  } = useInput({ now });

  const handleSubmit = (e) => {
    e.preventDefault();
    const timeObj = createMyObject(
      hours,
      minutes,
      operation,
      utcOffsetTime,
      currentFormat
    );
    if (setItemInto === "ownTime") {
      localStorage.setItem("ownTime", JSON.stringify(timeObj));
      controlSelf(false);

      alert("my Time added successfully");
    } else if (setItemInto === "allotTime" && dataName) {
      const existingData = JSON.parse(localStorage.getItem("allotTime")) || [];
      timeObj.dataName = dataName;
      timeObj.events = {};

      // Push new data (inputData object) into the array
      const updatedData = [timeObj, ...existingData];

      // Save the updated array back to localStorage
      console.log(timeObj);
      localStorage.setItem("allotTime", JSON.stringify(updatedData));
      alert("updated array successful");
      controlSelf(false);
    } else {
      alert("Please Give enough information");
    }
  };

  return (
    <div className={styles["input-container"]}>
      <div
        onClick={() => controlSelf(false)}
        className={styles["form-container"]}
      ></div>
      <form className={styles["form-style"]}>
        <div style={{ position: "absolute", top: "10px", right: "10px" }}>
          <CreateButton
            padding={".75rem 1rem"}
            bgColor={"#ff2211"}
            buttonName={"X"}
            onclick={(e) => (e.preventDefault(), controlSelf(false))}
          />
        </div>
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h3>{name}</h3>
          {syncTime && (
            <CreateButton
              buttonName={"sync Current time"}
              padding={"1rem 1rem"}
              fontSize={"18px"}
              bgColor={"#222"}
              onclick={syncCurrentTime}
            />
          )}
        </div>
        <hr style={{ margin: "1rem 0" }} />
        <div style={{ display: "flex" }}>
          <div>
            <h3
              style={{
                fontSize: "22px",
                margin: "1rem 0",
              }}
            >
              Set time
            </h3>
            {children}
            <div style={{ display: "flex" }}>
              <div>
                <h3>Hours</h3>
                <select
                  value={hours}
                  onChange={handleHoursChange}
                  style={{ padding: "5px", marginRight: "10px" }}
                >
                  <option value="" disabled>
                    Select Hour
                  </option>
                  {[...Array(24)].map((_, i) => (
                    <option key={i} value={i}>
                      {i.toString().padStart(2, "0")}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <h3>Minutes</h3>
                <select
                  value={minutes}
                  onChange={handleMinutesChange}
                  style={{ padding: "5px", marginRight: "10px" }}
                >
                  <option value="" disabled>
                    Select Hour
                  </option>
                  {[...Array(60)].map((_, i) => (
                    <option key={i} value={i}>
                      {i.toString().padStart(2, "0")}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <h3>{formatName}</h3>
          <div style={{ display: "flex" }}>
            {canSetZone && (
              <select
                value={currentFormat}
                onChange={handleFormatChange}
                style={{ padding: "5px", marginRight: "10px" }}
              >
                <option value="UTC">UTC</option>
                <option value="GMT">GMT</option>
                <option value="PST">PST</option>
                <option value="EST">EST</option>
              </select>
            )}
            <select
              value={operation}
              onChange={handleOperationChange}
              style={{ padding: "5px", marginRight: "10px" }}
            >
              <option value="+">+</option>
              <option value="-">-</option>
            </select>
            <select
              value={utcOffsetTime}
              onChange={handleUtcOffsetChange}
              style={{ padding: "5px", marginRight: "10px" }}
            >
              <option value="" disabled>
                Select time
              </option>
              {[...Array(12)].map((_, i) => (
                <option key={i} value={Number(i)}>
                  {i.toString().padStart(2, "0")}
                </option>
              ))}
            </select>
          </div>
        </div>
        <CreateButton
          onclick={handleSubmit}
          bgColor={"#445"}
          buttonName={"create"}
          padding={"1rem 1.2rem"}
        />
      </form>
    </div>
  );
};

export default InputComponent;
