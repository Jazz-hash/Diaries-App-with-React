import React, { FC, useState } from "react";
import http from "../../services/api";
import { updateDiary } from "./diariesSlice";
import {
  setCanEdit,
  setActiveDiaryId,
  setCurrentlyEditing,
} from "../entry/editorSlice";
import { showAlert } from "../../util";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../store";

interface Props {
  diary: Diary;
}

const buttonStyle: React.CSSProperties = {
  fontSize: "0.7em",
  margin: "0 0.5em",
  color:"black"
};

const DiaryTile: FC<Props> = (props) => {
  const [diary, setDiary] = useState(props.diary);
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useAppDispatch();
  const totalEntries = props.diary?.entryIds?.length;

  const saveChanges = () => {
    http
      .put<Diary, Diary>(`/diaries/${diary.id}`, diary)
      .then((diary) => {
        if (diary) {
          dispatch(updateDiary(diary));
          showAlert("Saved!", "success");
        }
      })
      .finally(() => {
        setIsEditing(false);
      });
  };

  return (
    <div className="diary-tile">
      <h2
        className="title"
        title="Click to edit"
        onClick={() => setIsEditing(true)}
        style={{
          cursor: "pointer",
        }}
      >
        {isEditing ? (
          <input
            value={diary.title}
            onChange={(e) => {
              setDiary({
                ...diary,
                title: e.target.value,
              });
            }}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                saveChanges();
              }
            }}
          />
        ) : (
          <span>{diary.title}</span>
        )}
      </h2>
      <p className="subtitle">{totalEntries ?? "0"} saved entries</p>
      <div style={{ display: "flex", marginTop:"4px" }}>
        <button
          style={buttonStyle}
          className="button"
          onClick={() => {
            dispatch(setCanEdit(true));
            dispatch(setActiveDiaryId(diary.id as string));
            dispatch(setCurrentlyEditing(null));
          }}
        
        >
          <a style={{textDecoration:"none", color:"white"}} href="#editor">Add New Entry</a>
        </button>
        <Link to={`diary/${diary.id}`} style={{ width: "100%" }}>
          <button className="secondary"  style={buttonStyle}>
            View all →
          </button>
        </Link>
      </div>
    </div>
  );
};

export default DiaryTile;
