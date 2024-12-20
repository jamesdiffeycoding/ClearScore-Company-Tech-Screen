import { useState } from "react";
import getFormattedDate from "../Helpers/getFormattedDate.js";
import dummyData from "../Helpers/dummyData.js";
export default function IdeaCards() {
  // STATES -----------------------------------------------
  const [ideas, setIdeas] = useState(dummyData);
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);

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
    } else {
      setTitle(ideas[index].title);
      setDetails(ideas[index].details);
    }
  }

  function deleteByIndex(index) {
    setIdeas([
      ...ideas.slice(0, index),
      ...ideas.slice(index + 1, ideas.length),
    ]);
    startEditingByIndex(null);
  }

  function updateValuesByIndex(index, newInformation) {
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
        <div className="app-card" key={idea.id}>
          {editingIndex === index ? (
            <>
              <section className="app-card-date">
                <div> Created: {idea.createdAt}</div>
                <div> Updated: {idea.lastUpdated}</div>
              </section>
              <textarea
                className="app-textarea-title"
                value={title || idea.title}
                onChange={handleTitleChange}
              />
              <textarea
                className="app-textarea-details"
                value={details || idea.details}
                onChange={handleDetailsChange}
              />

              <div className="app-cards-btns-container">
                <button
                  className="app-btn app-editing-confirmation-btn"
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
                  className="app-btn app-deleting-btn"
                  onClick={() => deleteByIndex(index)}
                >
                  <DeleteIcon />
                </button>
              </div>
            </>
          ) : (
            <>
              <section className="app-card-date">
                <div> Created: {idea.createdAt}</div>
                <div> Updated: {idea.lastUpdated}</div>
              </section>
              <div className="app-card-title">{idea.title}</div>
              <div className="app-card-details">{idea.details}</div>
              <div className="app-cards-btns-container">
                <button
                  className="app-btn app-editing-btn"
                  onClick={() => startEditingByIndex(index)}
                >
                  <EditIcon />
                </button>
                <button
                  className="app-btn app-deleting-btn"
                  onClick={() => deleteByIndex(index)}
                >
                  <DeleteIcon />
                </button>
              </div>
            </>
          )}
        </div>
      ))}
      <div className="app-create-card-container">
        <div className="app-create-outline">
          <button className="app-create-btn" onClick={() => createNewIdea()}>
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
