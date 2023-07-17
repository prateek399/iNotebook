import React, { useContext } from "react";
import NoteContext from "../context/Notes/NoteContext";
const About = () => {
  const a = useContext(NoteContext);
  return <div>This is About {a.name}</div>;
};

export default About;
