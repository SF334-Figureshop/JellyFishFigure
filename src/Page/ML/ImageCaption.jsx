import { useState } from "react";
import axios from "axios";

export default function TagGenerator() {
  const [text, setText] = useState("");
  const [tag, setTag] = useState([]);
  const [numtag, setNumtag] = useState(2);
  const data = `text=${encodeURIComponent(text)}&numtag=${numtag}`; //copy chat for real how can i know that i should use encodeURIcomponent

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const responce = await axios.post(
        "https://api.aiforthai.in.th/tagsuggestion",
        data,
        {
          headers: {
            Apikey: "AHlbGBc7xK6eM9zNIyzH1UsMZlbl27fU",
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      setTag(responce.data.tags);
      console.log(responce.data.tags);
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={(e) => setText(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
      <div>
        {tag.map((tags, index) => (
          <div key={index}>{tags.tag}</div>
        ))}
      </div>
    </div>
  );
}
