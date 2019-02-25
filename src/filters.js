// Set up filters default object
const filters = {
    searchText:'',
    hideCompleted: false
}

// getFilters
const getFilters = () => filters

// setFilters
const setFilters = (updates) => {
    if(typeof updates.searchText === 'string'){
        filters.searchText = updates.searchText
    }
    if(updates.hideCompleted === true){
        filters.hideCompleted = true
    }
    else if (updates.hideCompleted === false){
        filters.hideCompleted = false
    }

}

export {getFilters, setFilters}