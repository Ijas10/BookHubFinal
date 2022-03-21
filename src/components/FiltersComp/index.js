import './index.css'

const FiltersComp = props => {
  const {details, changeFilterValues, isSelected} = props
  const {id, value, label} = details
  const changeFilters = () => {
    changeFilterValues(value, label)
  }
  const classes = isSelected ? 'blue' : 'white'
  return (
    <list className="listOffilters">
      <button
        className={`filtersBtn ${classes}`}
        type="button"
        onClick={changeFilters}
      >
        {label}
      </button>
    </list>
  )
}

export default FiltersComp
