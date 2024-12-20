import "./IdeaCards.css";
import { useState, useEffect } from "react";
import { DUMMY_DATA, getFormattedDate } from "../Helpers/helpers.js";

export default function IdeaCards() {
  // STATES -----------------------------------------------
  const [ideasArray, setIdeasArray] = useState(DUMMY_DATA);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [editedInfo, setEditedInfo] = useState({
    title: "",
    details: "",
  });
  const [editedInfoLengthClasses, setEditedInfoLengthClasses] = useState({
    title: "",
    details: "",
  });
  const [allLengthsValid, setAllLengthsValid] = useState(false);

  // CHARACTER LIMITS -------------------------------------
  //  consts ----------------------------
  const CHAR_LIMITS = {
    TITLE: { MAX: 50, WARNING: 40 },
    DETAILS: { MAX: 1000, WARNING: 950 },
  };
  const CHAR_LIMIT_CLASSES = {
    SURPASSED: "character-limit-surpassed",
    CLOSE: "character-limit-close",
    OK: "character-limit-ok",
  };

  // useEffects -------------------------
  // update titleLengthClass
  useEffect(() => {
    if (editedInfo.title.length > CHAR_LIMITS.TITLE.MAX) {
      setEditedInfoLengthClasses((prev) => ({
        ...prev,
        title: CHAR_LIMIT_CLASSES.SURPASSED,
      }));
    } else if (editedInfo.title.length >= CHAR_LIMITS.TITLE.WARNING) {
      setEditedInfoLengthClasses((prev) => ({
        ...prev,
        title: CHAR_LIMIT_CLASSES.CLOSE,
      }));
    } else {
      setEditedInfoLengthClasses((prev) => ({
        ...prev,
        title: CHAR_LIMIT_CLASSES.OK,
      }));
    }
  }, [editedInfo.title]);

  // update detailsLengthClass
  useEffect(() => {
    if (editedInfo.details.length > CHAR_LIMITS.DETAILS.MAX) {
      setEditedInfoLengthClasses((prev) => ({
        ...prev,
        details: CHAR_LIMIT_CLASSES.SURPASSED,
      }));
    } else if (editedInfo.details.length >= CHAR_LIMITS.DETAILS.WARNING) {
      setEditedInfoLengthClasses((prev) => ({
        ...prev,
        details: CHAR_LIMIT_CLASSES.CLOSE,
      }));
    } else {
      setEditedInfoLengthClasses((prev) => ({
        ...prev,
        details: CHAR_LIMIT_CLASSES.OK,
      }));
    }
  }, [editedInfo.details]);

  // update allLengthsValid
  useEffect(() => {
    setAllLengthsValid(
      editedInfoLengthClasses.title !== CHAR_LIMIT_CLASSES.SURPASSED &&
        editedInfoLengthClasses.details !== CHAR_LIMIT_CLASSES.SURPASSED
    );
  }, [editedInfo]);

  // CRUD SUPPORT FUNCTIONS ----------------------------------------
  function handleChange(e, section) {
    let newValue = e.target.value;
    setEditedInfo((prev) => ({ ...prev, [section]: newValue }));
  }

  function createNewIdea() {
    const newIdea = {
      id: ideasArray.length,
      title: "New Idea",
      details: "Details",
      createdAt: getFormattedDate(new Date()),
      lastUpdated: "",
    };
    setIdeasArray([...ideasArray, newIdea]);
    editCard(null);
  }

  function editCard(index) {
    setCurrentIndex(index);
    if (index === null) {
      setEditedInfo({
        title: "",
        details: "",
      });
      return;
    }
    setEditedInfo((prev) => ({
      ...prev,
      title: ideasArray[index].title,
      details: ideasArray[index].details,
    }));
  }

  function updateValuesByIndex(index, newInformation) {
    if (!allLengthsValid) {
      alert("Please make sure your data is within the character limits.");
      return;
    }
    editCard(null);
    // update values in a copy of the array
    const ideasArrayCopy = [...ideasArray];
    ideasArrayCopy[index].title = newInformation.title;
    ideasArrayCopy[index].details = newInformation.details;
    ideasArrayCopy[index].lastUpdated = getFormattedDate(new Date());
    // set the state to the updated array
    setIdeasArray(ideasArrayCopy);
  }

  function deleteByIndex(index) {
    setIdeasArray([
      ...ideasArray.slice(0, index),
      ...ideasArray.slice(index + 1, ideasArray.length),
    ]);
    editCard(null);
  }

  return (
    <>
      {ideasArray.map((storedIdea, index) => (
        <div className="card" key={storedIdea.id}>
          <section className="card-dates">
            <div>Created: {storedIdea.createdAt}</div>
            <div>Updated: {storedIdea.lastUpdated}</div>
          </section>

          {currentIndex === index ? (
            <>
              <textarea
                className="textarea-title"
                value={editedInfo.title || storedIdea.title}
                onChange={(e) => handleChange(e, "title")}
              />
              <p className={editedInfoLengthClasses.title}>
                {editedInfo.title ? editedInfo.title.length : 0} /{" "}
                {CHAR_LIMITS.TITLE.MAX}
              </p>
              <div>
                <textarea
                  className="textarea-details"
                  value={editedInfo.details || storedIdea.details}
                  onChange={(e) => handleChange(e, "details")}
                />
                <p className={editedInfoLengthClasses.details}>
                  {editedInfo.details ? editedInfo.details.length : 0} /{" "}
                  {CHAR_LIMITS.DETAILS.MAX}
                </p>
              </div>

              <section className="cards-btns-container">
                <button
                  className={`btn ${
                    allLengthsValid ? "editing-confirmation-btn" : ""
                  }`}
                  onClick={() =>
                    updateValuesByIndex(index, {
                      title: editedInfo.title,
                      details: editedInfo.details,
                    })
                  }
                >
                  <ConfirmEditIcon />
                </button>
                <button
                  className="btn deleting-btn"
                  onClick={() => deleteByIndex(index)}
                >
                  <DeleteIcon />
                </button>
              </section>
            </>
          ) : (
            <>
              <div className="card-title">{storedIdea.title}</div>
              <div className="card-details">{storedIdea.details}</div>

              <section className="cards-btns-container">
                <button
                  className="btn editing-btn"
                  onClick={() => editCard(index)}
                >
                  <EditIcon />
                </button>
                <button
                  className="btn deleting-btn"
                  onClick={() => deleteByIndex(index)}
                >
                  <DeleteIcon />
                </button>
              </section>
            </>
          )}
        </div>
      ))}

      <div className="create-card-container">
        <div className="create-outline">
          <button className="create-btn" onClick={() => createNewIdea()}>
            +
          </button>
        </div>
      </div>
    </>
  );
}

// ICONS BELOW ---------------------------------------------------
function EditIcon() {
  return <img src="edit.svg" alt="edit pencil icon" height="10" width="15" />;
}

function ConfirmEditIcon() {
  return <img src="confirm_edit.svg" alt="tick icon" height="10" width="15" />;
}
function DeleteIcon() {
  return (
    <img src="delete.svg" alt="delete trash can icon" height="10" width="15" />
  );
}
