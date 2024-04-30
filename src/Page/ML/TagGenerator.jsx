import { useState } from "react";
import axios from "axios";
import { Button, Container, FormControl, InputLabel, ListItem, TextField, Typography } from "@material-ui/core";

export default function TagGenerator(props) {
  const [text, setText] = useState(props.des);
  const [tag, setTag] = useState([]);
  const [numtag, setNumtag] = useState(2);
  const data = `text=${encodeURIComponent(text)}&numtag=${numtag}`; //copy chat for real how can i know that i should use encodeURIcomponent
 console.log("des su" ,tag)
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
    <div style={{display:"flex"}}>
      <Container maxWidth="xl" >
        <Typography variant="h2" gutterBottom>Tag Generator</Typography>
        <form onSubmit={handleSubmit}>
          <FormControl fullWidth>
            <TextField
              required
              variant="outlined"
              multiline
              minRows={20}
              id="Figure Description"
              label="Figure Description"
              value={text}
              onChange={(e) => setText(e.target.value)}
              inputProps={{ maxLength: 5000 }}
            />
            <TextField variant="outlined" type="number" id="numtag" value={numtag} onChange={(e)=> setNumtag(e.target.value)} inputProps={{ min: 1, max: 10 }}/>
            <Button color="primary" variant="contained" onClick={handleSubmit}>
              Generate Tag
            </Button>
          </FormControl>
        </form>
      </Container>
      <div>
      <Container>
  {
    <div  style={{marginTop: "100%"}}>
     {tag.map((obj, index) => `${obj.tag}${index === tag.length - 1 ? "" : ","}`).join("")}
  </div>}
</Container>
      </div>
    </div>
    
  );
}
