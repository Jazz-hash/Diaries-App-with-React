import React, { FC, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/rootReducer";
import http from "../../services/api";
import { setEntries } from "../entry/entriesSlice";
import { setCurrentlyEditing, setCanEdit } from "../entry/editorSlice";
import dayjs from "dayjs";
import { useAppDispatch } from "../../store";

const DiaryEntriesList: FC = () => {
  const { entries } = useSelector((state: RootState) => state);
  const dispatch = useAppDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (id != null) {
      http
        .get<null, { entries: Entry[] }>(`/diaries/entries/${id}`)
        .then(({ entries: _entries }) => {
          if (_entries) {
            const sortByLastUpdated = _entries.sort((a, b) => {
              return dayjs(b.updatedAt).unix() - dayjs(a.updatedAt).unix();
            });
            dispatch(setEntries(sortByLastUpdated));
          }
        });
    }
  }, [id, dispatch]);

  return (
    <div className="entries">
      <header>
        <Link to="/">
          <button type="submit" className="button">
            ← Go Back
            </button>
        </Link>
      </header>
      <ul>
        
        {entries.length ? entries.map((entry) => (
          <li
            key={entry.id}
            onClick={() => {
              dispatch(setCurrentlyEditing(entry));
              dispatch(setCanEdit(true));
            }}
          >
            <a href="#editor" style={{    color: "black"}}>{entry.title}</a>
          </li>
        )): <p style={{textAlign:"center"}}>No entries found !</p>}
      </ul>
    </div>
  );
};

export default DiaryEntriesList;
