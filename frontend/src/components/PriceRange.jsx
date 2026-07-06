import './PriceRange.scss'

// controlled-компонент: получает текущие min/max и колбэк для изменения
function PriceRange({ min, max, value, onChange }) {
  const handleMinChange = (e) => {
    // не даём min стать больше текущего max
    const newMin = Math.min(Number(e.target.value), value.max)
    onChange({ ...value, min: newMin })
  }

  const handleMaxChange = (e) => {
    // не даём max стать меньше текущего min
    const newMax = Math.max(Number(e.target.value), value.min)
    onChange({ ...value, max: newMax })
  }

  return (
    <div className="price-range">
      <div className="price-range__labels">
        <span>{value.min.toLocaleString()} $</span>
        <span>{value.max.toLocaleString()} $</span>
      </div>
      <div className="price-range__sliders">
        <input
          type="range"
          min={min}
          max={max}
          value={value.min}
          onChange={handleMinChange}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={value.max}
          onChange={handleMaxChange}
        />
      </div>
    </div>
  )
}

export default PriceRange