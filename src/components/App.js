import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Container,
  InputGroup,
  FormControl,
  Button,
  Row,
  Card,
} from "react-bootstrap";

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
console.log("THIS IS THE ID", CLIENT_ID)
const CLIENT_SECRET = process.env.REACT_APP_OTHER_VALUE

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [accessToken, setAccessToken] = useState("")
  const [albums, setAlbums] = useState([])

  useEffect(() => {
    //API Access Token - gets a token from the spotify API for a certain client ot use

    let authParameters = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body:
        "grant_type=client_credentials&client_id=" +
        CLIENT_ID +
        "&client_secret=" +
        CLIENT_SECRET,
    };
    async function getData() {
      const response = await fetch(
        "https://accounts.spotify.com/api/token",
        authParameters
      );
      const data = await response.json();
      setAccessToken(data.access_token)
      console.log(data.access_token);
    }

    getData();
  }, []);

  //Search
  async function search() {
    console.log(searchInput)

    // GET request using search to get the Artist ID
    let searchParameters = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + accessToken
      }
    }
  
    async function getArtistId() {
      const response = await fetch('https://api.spotify.com/v1/search?q=' + searchInput + '&type=artist', searchParameters)
        const data = await response.json()
        console.log(data)
        const artistsId = data.artists.items[0].id
        return artistsId
      }
      const artistId = await getArtistId()
      console.log("this is the return of the function getArtistId:", artistId)
      
      // GET request with artist ID to grab all the albums from that artist
      async function getAlbum() {
        const response = await fetch('https://api.spotify.com/v1/artists/' + artistId + '/albums?include_groups=album&market=US&limit=50', searchParameters)
        const data = await response.json()
        console.log(data)
        setAlbums(data.items)
      }
      getAlbum()
    // Display those albums to the user

    console.log("these are the userInput albums", albums)
  }

  return (
    <div className="App">
      <Container>
        <InputGroup className="mb-3" size="lg">
          <FormControl
            placeholder="Search for Artist"
            type="input"
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                search();
              }
            }}
            onChange={(event) => setSearchInput(event.target.value)}
          />
          <Button onClick={search}>Search</Button>
        </InputGroup>
      </Container>
      <Container>
        <Row className="mx-2 row row-cols-4">
        {albums.map((album, index) => {
          return<Card>
            <Card.Img src={album.images[0].url} />
            <Card.Body>
              <Card.Title>{album.name}</Card.Title>
            </Card.Body>
          </Card>
        })}
          
        </Row>
      </Container>
    </div>
  );
}

export default App;
