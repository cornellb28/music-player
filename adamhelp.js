const words = ["happy", "hands", "bricks", "apple", "and", "sand", "bright"];

const Typeahead = () => {
  const [text, setText] = React.useState("");

  const wordMatch = words.filter((word) => {
    return word.includes(text);
  });

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const onWordClick = (word) => {
    setText(word);
  };

  return (
    <div>
      <label>Search: </label>
      <input
        type="text"
        value={text}
        placeholder="search"
        onChange={(e) => handleChange(e)}
      />
      <br />
      {wordMatch.map((word) => (
        <p onClick={() => onWordClick(word)}>{word}</p>
      ))}
    </div>
  );
};

ReactDOM.render(<Typeahead />, document.querySelector("#app"));




///////////////////////

async function postNewArtists(artists) {
  artists.forEach(async (record) => {
    try {
      setRecordsData((prevState) => [...prevState, record]);
      const data = qs.stringify(artist);
      console.log(data);
      const config = {
        method: "post",
        url: "http://localhost:3000/multi-upload",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data,
      };
      //await axios.post(`${restUrl}/${record.id}`, record);
    } catch (error) {
      console.log("error thrown inside loadEachRecord", error);
      setRecordsData(originalArtists);
    }
  });
}


///////////////////////////////////////////////////

export const formAxios = axios.create({
  transformRequest: [
    function (data, headers) {
      if (
        headers["Content-Type"] &&
        headers["Content-Type"].startsWith("multipart/form-data")
      ) {
        const form = new FormData();
        for (const key in data) {
          const value = data[key];
          if (Array.isArray(value)) {
            const arrayKey = `${key}[]`;
            value.forEach((v) => {
              form.append(arrayKey, v);
            });
          } else {
            form.append(key, value);
          }
        }
        return form;
      }

      return data;
    },
  ],
});



///////////////////////////////////////////////

let data = [{_id: '1999', name: 'Owlette'}, {_id: '2999', name: 'Gekko'}, {_id: '3999', name: 'CatBoy'}];
const data1 = [{team: 'red', username:'cornellb28'}];

const form = new FormData();
function isObject(obj) {
  return obj === Object(obj);
}
for(const key in data) {
  const object = data[key];
  if(isObject(object)) {
    const arrayKey = `${data[key]._id}`;
    data.forEach(value =>{
      form.append(arrayKey, value);
    })
  }
}
console.log(form)

const usersRed = data1.reduce((acc, e) => {
  if (e.team === 'red') acc.push(e.username)
  return acc
}, [])
console.log(usersRed) // cornellb28
