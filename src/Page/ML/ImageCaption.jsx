import React, { useState } from 'react';
import axios from 'axios';

const ImageCaption = () => {
    const [text, setText] = useState('');
    const [numTag, setNumTag] = useState(5);
    const [suggestedTags, setSuggestedTags] = useState([]);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const response = await axios.post(
          'https://api.aiforthai.in.th/tagsuggestion',
          {
            text: text,
            numtag: numTag,
          },
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Apikey': 'AHlbGBc7xK6eM9zNIyzH1UsMZlbl27fU',
            },
          }
        );
  
        setSuggestedTags(response.data.tags);
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    return (
      <div>
        <h2>Tag Suggestion</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="text">Text:</label>
            <textarea
              id="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={4}
              cols={50}
              maxLength={5000}
              required
            />
          </div>
          <div>
            <label htmlFor="numTag">Number of Tags:</label>
            <input
              type="number"
              id="numTag"
              value={numTag}
              onChange={(e) => setNumTag(e.target.value)}
              min={1}
              max={10}
              required
            />
          </div>
          <button type="submit">Suggest Tags</button>
        </form>
        {suggestedTags.length > 0 && (
          <div>
            <h3>Suggested Tags:</h3>
            <ul>
              {suggestedTags.map((tag, index) => (
                <li key={index}>
                  {tag.tag} (Score: {tag.score})
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };

export default ImageCaption;