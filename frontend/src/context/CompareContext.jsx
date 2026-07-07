import { createContext, useState } from 'react'

export const CompareContext = createContext()

const MAX_COMPARE = 3 // сколько мотоциклов можно сравнивать одновременно

export function CompareProvider({ children }) {
  const [compareList, setCompareList] = useState([])

  const isInCompare = (motoId) => {
    return compareList.some(m => m.id === motoId)
  }

  const addToCompare = (moto) => {
    if (isInCompare(moto.id)) return
    if (compareList.length >= MAX_COMPARE) {
      alert(`Можно сравнивать максимум ${MAX_COMPARE} мотоцикла`)
      return
    }
    setCompareList(prev => [...prev, moto])
  }

  const removeFromCompare = (motoId) => {
    setCompareList(prev => prev.filter(m => m.id !== motoId))
  }

  const toggleCompare = (moto) => {
    if (isInCompare(moto.id)) {
      removeFromCompare(moto.id)
    } else {
      addToCompare(moto)
    }
  }

  const clearCompare = () => setCompareList([])

  return (
    <CompareContext.Provider
      value={{ compareList, addToCompare, removeFromCompare, toggleCompare, isInCompare, clearCompare, MAX_COMPARE }}
    >
      {children}
    </CompareContext.Provider>
  )
}