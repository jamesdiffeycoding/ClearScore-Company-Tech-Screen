import "./IdeaCards.css";
import { useState, useEffect } from "react";
import { DUMMY_DATA, getFormattedDate } from "../Helpers/helpers.js";

export default function IdeaCards() {
  // STATES -----------------------------------------------
  const [ideasArray, setIdeasArray] = useState(DUMMY_DATA);
  const [editingIndex, setEditingIndex] = useState(null);
  // editing the title field
  const [title, setTitle] = useState("");
  const [titleLengthClass, setTitleLengthClass] = useState("");
  // editing the details field
  const [details, setDetails] = useState("");
  const [detailsLengthClass, setDetailsLengthClass] = useState("");
  // ensure all lengths are within limits
  const [allLengthsValid, setAllLengthsValid] = useState(false);

  //  CONSTS FOR CHAR LIMITS --------------------------------
  const CHAR_LIMIT_VALUES = {
    TITLE: { MAX: 50, WARNING: 40 },
    DETAILS: { MAX: 1000, WARNING: 950 },
  };
  const CHAR_LIMIT_CLASSES = {
    SURPASSED: "character-limit-surpassed",
    CLOSE: "character-limit-close",
    OK: "character-limit-ok",
  };

  // USE EFFECTS FOR CHARACTER LIMITS -----------------------
  // update titleLengthClass
  useEffect(() => {
    if (title.length > CHAR_LIMIT_VALUES.TITLE.MAX) {
      setTitleLengthClass(CHAR_LIMIT_CLASSES.SURPASSED);
    } else if (title.length >= CHAR_LIMIT_VALUES.TITLE.WARNING) {
      setTitleLengthClass(CHAR_LIMIT_CLASSES.CLOSE);
    } else {
      setTitleLengthClass(CHAR_LIMIT_CLASSES.OK);
    }
  }, [title]);

  // update detailsLengthClass
  useEffect(() => {
    if (details.length > CHAR_LIMIT_VALUES.DETAILS.MAX) {
      setDetailsLengthClass(CHAR_LIMIT_CLASSES.SURPASSED);
    } else if (details.length >= CHAR_LIMIT_VALUES.DETAILS.WARNING) {
      setDetailsLengthClass(CHAR_LIMIT_CLASSES.CLOSE);
    } else {
      setDetailsLengthClass(CHAR_LIMIT_CLASSES.OK);
    }
  }, [details]);

  // update allLengthsValid
  useEffect(() => {
    if (
      titleLengthClass !== CHAR_LIMIT_CLASSES.SURPASSED &&
      detailsLengthClass !== CHAR_LIMIT_CLASSES.SURPASSED
    ) {
      setAllLengthsValid(true);
    } else {
      setAllLengthsValid(false);
    }
  }, [titleLengthClass, detailsLengthClass]);

  // CRUD SUPPORT FUNCTIONS ----------------------------------------
  function handleTitleChange(e) {
    setTitle(e.target.value);
  }
  function handleDetailsChange(e) {
    setDetails(e.target.value);
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
    toggleIdeaEditing(null);
  }

  function toggleIdeaEditing(index) {
    setEditingIndex(index);
    if (index === null) {
      setTitle("");
      setDetails("");
      return;
    }
    setTitle(ideasArray[index].title);
    setDetails(ideasArray[index].details);
  }

  function updateValuesByIndex(index, newInformation) {
    if (!allLengthsValid) {
      alert("Please make sure your data is within the character limits.");
      return;
    }
    toggleIdeaEditing(null);
    const ideasArrayCopy = [...ideasArray];
    ideasArrayCopy[index].title =
      newInformation.title || ideasArrayCopy[index].title;
    ideasArrayCopy[index].details =
      newInformation.details || ideasArrayCopy[index].details;
    ideasArrayCopy[index].lastUpdated = getFormattedDate(new Date());
    setIdeasArray(ideasArrayCopy);
  }

  function deleteByIndex(index) {
    setIdeasArray([
      ...ideasArray.slice(0, index),
      ...ideasArray.slice(index + 1, ideasArray.length),
    ]);
    toggleIdeaEditing(null);
  }

  return (
    <>
      {ideasArray.map((idea, index) => (
        <div className="card" key={idea.id}>
          {editingIndex === index ? (
            <>
              <section className="card-date">
                <div> Created: {idea.createdAt}</div>
                <div> Updated: {idea.lastUpdated}</div>
              </section>
              <div>
                <textarea
                  className="textarea-title"
                  value={title || idea.title}
                  onChange={handleTitleChange}
                />
                <p className={titleLengthClass}>
                  {title.length} / {CHAR_LIMIT_VALUES.TITLE.MAX}
                </p>
              </div>
              <div>
                <textarea
                  className="textarea-details"
                  value={details || idea.details}
                  onChange={handleDetailsChange}
                />
                <p className={detailsLengthClass}>
                  {details.length} / {CHAR_LIMIT_VALUES.DETAILS.MAX}
                </p>
              </div>
              <div className="cards-btns-container">
                <button
                  className={`btn ${
                    allLengthsValid ? "editing-confirmation-btn" : ""
                  }`}
                  onClick={() =>
                    updateValuesByIndex(index, {
                      title: title,
                      details: details,
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
              </div>
            </>
          ) : (
            <>
              <section className="card-date">
                <div> Created: {idea.createdAt}</div>
                <div> Updated: {idea.lastUpdated}</div>
              </section>
              <div className="card-title">{idea.title}</div>
              <div className="card-details">{idea.details}</div>
              <div className="cards-btns-container">
                <button
                  className="btn editing-btn"
                  onClick={() => toggleIdeaEditing(index)}
                >
                  <EditIcon />
                </button>
                <button
                  className="btn deleting-btn"
                  onClick={() => deleteByIndex(index)}
                >
                  <DeleteIcon />
                </button>
              </div>
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
