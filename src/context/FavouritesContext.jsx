import {
  createContext,
  useReducer,
  useEffect,
  useContext,
} from 'react'

const FavouritesContext = createContext()

function favouritesReducer(state, action) {
  switch (action.type) {
    case 'ADD_FAVOURITE': {
      const exists = state.some(
        (country) => country.cca3 === action.payload.cca3
      )

      if (exists) return state

      return [...state, action.payload]
    }

    case 'REMOVE_FAVOURITE':
      return state.filter(
        (country) => country.cca3 !== action.payload
      )

    default:
      return state
  }
}

export function FavouritesProvider({ children }) {
  const savedFavourites = JSON.parse(
    localStorage.getItem('favourites') || '[]'
  )

  const [favourites, dispatch] = useReducer(
    favouritesReducer,
    savedFavourites
  )

  useEffect(() => {
    localStorage.setItem(
      'favourites',
      JSON.stringify(favourites)
    )
  }, [favourites])

  return (
    <FavouritesContext.Provider
      value={{ favourites, dispatch }}
    >
      {children}
    </FavouritesContext.Provider>
  )
}

export function useFavourites() {
  return useContext(FavouritesContext)
}