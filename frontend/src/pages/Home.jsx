import MovieCard from "../components/MovieCard"
import { useState, useEffect } from "react"
import { searchMovies } from "../services/api";
import { getPopularMovies } from "../services/api";
import "../css/Home.css"

import Button from '@mui/material/Button';

import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';



function Home() {

  const [searchQuery, setSearchQuery] = useState("");
  const [movies,setMovies] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading ] = useState(true)

  useEffect (() => {
    const loadPopularMovies = async () => {
      try {
        const PopularMovies = await getPopularMovies()   

        setMovies(PopularMovies)
      } catch(err) {
        console.log(err);
        setError("Failed to load movies...")
      }
      finally {
        setLoading(false)
      }
    }

    loadPopularMovies();
  }, [])

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return
    if(loading) return
    
    setLoading(true)
    try {
      const searchResults = await searchMovies(searchQuery)
      setMovies(searchResults)
      setError(null)
    } catch(err) {
      console.log(err);
      setError("Failed to search movies...")
    } finally {
      setLoading(false)
    }

    
  }

  return (
  <div className="home">

    <form onSubmit={handleSearch} className="search-form">
      {/* <input type="text" placeholder="Search for movies..." className="search-input" value={searchQuery} onChange={(e) => {
        setSearchQuery(e.target.value);
      }}/> */}
      <Box
      component="form"
      sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="Outlined" variant="outlined" fullWidth value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
      <Input placeholder="Search for movies..." inputProps={ariaLabel} />
    </Box>

      <Button variant="contained" type="submit">Search</Button>
    </form>
    
    


  {loading ? (<p>Loading...</p>) : error ? (<p>{error}</p>) :
   (
    <div className="movies-grid">
      {movies.map ((movie) => (
          <MovieCard movie={movie} key={movie.id}/> 
      ))}
      
    </div>
  )}
    
  </div>
  )
}

export default Home