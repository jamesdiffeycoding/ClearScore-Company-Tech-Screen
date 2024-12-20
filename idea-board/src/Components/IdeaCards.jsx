import "./IdeaCards.css";
import { useState, useEffect } from "react";
import { dummyData, getFormattedDate } from "../Helpers/helpers.js";

export default function IdeaCards() {
  // STATES -----------------------------------------------
  const [ideas, setIdeas] = useState(dummyData);
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [titleLengthValidity, setTitleLengthValidity] = useState("");
  const [detailsLengthValidity, setDetailsLengthValidity] = useState("");
  const [dataAppropriateLength, setDataAppropriateLength] = useState(false);

  // USE EFFECTS FOR CHARACTER LIMITS -----------------------
  useEffect(() => {
    if (title.length > 50) {
      setTitleLengthValidity("character-limit-surpassed");
    } else if (title.length >= 40) {
      setTitleLengthValidity("character-limit-close");
    } else {
      setTitleLengthValidity("character-limit-ok");
    }
  }, [title]);

  useEffect(() => {
    if (details.length > 1000) {
      setDetailsLengthValidity("character-limit-surpassed");
    } else if (details.length >= 900) {
      setDetailsLengthValidity("character-limit-close");
    } else {
      setDetailsLengthValidity("character-limit-ok");
    }
  }, [details]);

  useEffect(() => {
    if (
      titleLengthValidity !== "character-limit-surpassed" &&
      detailsLengthValidity !== "character-limit-surpassed"
    ) {
      setDataAppropriateLength(true);
    } else {
      setDataAppropriateLength(false);
    }
  }, [titleLengthValidity, detailsLengthValidity]);

  // CRUD SUPPORT FUNCTIONS ----------------------------------------
  function handleTitleChange(e) {
    setTitle(e.target.value);
  }
  function handleDetailsChange(e) {
    setDetails(e.target.value);
  }
  function startEditingByIndex(index) {
    setEditingIndex(index);
    if (index === null) {
      setTitle("");
      setDetails("");
      return;
    }
    setTitle(ideas[index].title);
    setDetails(ideas[index].details);
  }

  function deleteByIndex(index) {
    setIdeas([
      ...ideas.slice(0, index),
      ...ideas.slice(index + 1, ideas.length),
    ]);
    startEditingByIndex(null);
  }

  function updateValuesByIndex(index, newInformation) {
    if (!dataAppropriateLength) {
      alert("Please make sure your data is within the character limits.");
      return;
    }
    startEditingByIndex(null);
    const ideasCopy = [...ideas];
    ideasCopy[index].title = newInformation.title || ideasCopy[index].title;
    ideasCopy[index].details =
      newInformation.details || ideasCopy[index].details;
    ideasCopy[index].lastUpdated = getFormattedDate(new Date());
    setIdeas(ideasCopy);
  }

  function createNewIdea() {
    const newIdea = {
      id: ideas.length,
      title: "New Idea",
      details: "Details",
      createdAt: getFormattedDate(new Date()),
      lastUpdated: "",
    };
    setIdeas([...ideas, newIdea]);
    startEditingByIndex(null);
  }

  return (
    <>
      {ideas.map((idea, index) => (
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
                <p className={titleLengthValidity}>{title.length} / 50</p>
              </div>
              <div>
                <textarea
                  className="textarea-details"
                  value={details || idea.details}
                  onChange={handleDetailsChange}
                />
                <p className={detailsLengthValidity}>{details.length} / 1000</p>
              </div>
              <div className="cards-btns-container">
                <button
                  className={`btn ${
                    dataAppropriateLength ? "editing-confirmation-btn" : ""
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
                  onClick={() => startEditingByIndex(index)}
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
