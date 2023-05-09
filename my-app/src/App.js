import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

function App() {
  const [data, setData] = useState([]);
  const [type, setType] = useState("");
  const [input, setInput] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);
  const [file, SetFile] = useState({});

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const handle_button = (val) => {
    axios
      .get(`http://localhost:5000/images/${val}`)
      .then((res) => setData(res.data))
      .catch((er) => console.log(er));
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    let bodyFormData = new FormData();
    bodyFormData.append("url", file);
    console.log(bodyFormData)
    axios.post(`http://localhost:5000/imageUpload?type=${type}`, bodyFormData)
      .then((data) => console.log(data), alert("Added "))
      .catch((err) => console.error(err));
  };

  const handleChange = (e) => {
    SetFile(e.target.files[0]);
  };
  useEffect(() => {
    axios
      .get("http://localhost:5000/images")
      .then((res) => setData(res.data))
      .catch((er) => console.log(er));
  }, []);
  return (
    <div className="App">
      <h1 className="head">Image Search & Upload App</h1>

      <div>
        <input className="input" onChange={(e) => setInput(e.target.value)} />
        <button className="input_button" onClick={() => handle_button(input)}>
          🔍
        </button>
      </div>

      <div className="names">
        <div>
          <buttton
            onClick={() => {
              handle_button("mountain");
            }}
            className="name_button"
          >
            Mountain
          </buttton>
        </div>
        <div>
          <buttton
            onClick={() => {
              handle_button("beach");
            }}
            className="name_button"
          >
            Beaches
          </buttton>
        </div>
        <div>
          <buttton
            onClick={() => {
              handle_button("bird");
            }}
            className="name_button"
          >
            Birds
          </buttton>
        </div>
        <div>
          <buttton
            onClick={() => {
              handle_button("food");
            }}
            className="name_button"
          >
            Food
          </buttton>
        </div>
      </div>

      <div>
        <h1 className="head">Sea Images</h1>
        <div className="container">
          {data.map((el) => (
            <div key={el._id}>
              <img src={el.url} />
            </div>
          ))}
        </div>
      </div>
      <div>
        <buttton className="name_button" onClick={openModal}>
          Upload
        </buttton>
      </div>

      <Modal
        style={customStyles}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
      >
        <h2 className="head">Upload your Image</h2>

        <form>
          <input type="file" onChange={handleChange} />
          <br></br>
          <br></br>
          <select onChange={(e) => setType(e.target.value)}>
            <option>Select type</option>
            <option value="mountain">Mountain</option>
            <option value="beach">Beaches</option>
            <option value="bird">Birds</option>
            <option value="food">Food</option>
          </select>
          <button type="submit" onClick={handlesubmit}>
            Upload
          </button>
        </form>
        <br></br>
        <br></br>
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
}

export default App;
