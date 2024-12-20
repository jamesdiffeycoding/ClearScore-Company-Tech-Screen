import "./IdeaCards.css";
import { useState, useEffect } from "react";
import { DUMMY_DATA, getFormattedDate } from "../Helpers/helpers.js";

export default function IdeaCards() {
  // STATES -----------------------------------------------
  const [ideasArray, setIdeasArray] = useState([]);
  const [indexBeingEdited, setIndexBeingEdited] = useState(null);
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
  //  char limit consts ----------------------------
  const CHAR_LIMITS = {
    TITLE: { MAX: 50, WARNING: 43 },
    DETAILS: { MAX: 1000, WARNING: 950 },
  };
  const CHAR_LIMIT_CLASSES = {
    SURPASSED: "character-limit-surpassed",
    CLOSE: "character-limit-close",
    OK: "character-limit-ok",
  };

  // char limit useEffects -------------------------
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

  // LOCAL STORAGE ----------------------------------------
  useEffect(() => {
    const locallyStoredIdeas = localStorage.getItem("ideasArray");
    if (locallyStoredIdeas) {
      setIdeasArray(JSON.parse(locallyStoredIdeas));
    } else {
      setIdeasArray(DUMMY_DATA);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("ideasArray", JSON.stringify(ideasArray));
  }, [ideasArray]);

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
    setIndexBeingEdited(index);
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

  // Reusable subcomponents for buttons and textareas --------------------------------------------
  const RenderButtons = (index, isEditing) => (
    <section className="cards-btns-container">
      <button
        className={`btn ${
          isEditing
            ? allLengthsValid
              ? "editing-confirmation-btn"
              : ""
            : "editing-btn"
        }`}
        onClick={() =>
          isEditing
            ? updateValuesByIndex(index, {
                title: editedInfo.title,
                details: editedInfo.details,
              })
            : editCard(index)
        }
      >
        {isEditing ? <ConfirmEditIcon /> : <EditIcon />}
      </button>
      <button className="btn deleting-btn" onClick={() => deleteByIndex(index)}>
        <DeleteIcon />
      </button>
    </section>
  );

  const RenderTextAreaAndCharCount = (field, maxLength) => (
    <>
      <textarea
        className={`textarea-${field}`}
        value={editedInfo[field] || storedIdea[field]}
        onChange={(e) => handleChange(e, field)}
      />
      <p className={editedInfoLengthClasses[field]}>
        {editedInfo[field] ? editedInfo[field].length : 0} / {maxLength}
      </p>
    </>
  );

  return (
    <>
      {ideasArray.map((storedIdea, currentCardIndex) => (
        <div className="card" key={storedIdea.id}>
          <section className="card-dates">
            <div>Created: {storedIdea.createdAt}</div>
            <div>Updated: {storedIdea.lastUpdated}</div>
          </section>

          {indexBeingEdited === currentCardIndex ? (
            <>
              {RenderTextAreaAndCharCount("title", CHAR_LIMITS.TITLE.MAX)}
              {RenderTextAreaAndCharCount("details", CHAR_LIMITS.DETAILS.MAX)}
              {RenderButtons(currentCardIndex, true)}
            </>
          ) : (
            <>
              <div className="card-title">{storedIdea.title}</div>
              <div className="card-details">{storedIdea.details}</div>

              {RenderButtons(currentCardIndex, false)}
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
const EditIcon = () => (
  <img src="edit.svg" alt="edit pencil icon" height="10" width="15" />
);

const ConfirmEditIcon = () => (
  <img src="confirm_edit.svg" alt="tick icon" height="10" width="15" />
);

const DeleteIcon = () => (
  <img src="delete.svg" alt="delete trash can icon" height="10" width="15" />
);
