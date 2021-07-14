import { declareAtom, declareAction } from '@reatom/core';
import { useAtom, useAction } from "@reatom/react";
import clsx from 'clsx';

export const VISIBILITY_FILTERS = {
  ALL: "all",
  COMPLETED: "completed",
  INCOMPLETE: "incomplete"
}

const filtersList = Object.keys(VISIBILITY_FILTERS)

const setFilterAction = declareAction('setFilterAction');

export const VisibilityFilteredAtom = declareAtom('visibilityFilteredAtom', 
  VISIBILITY_FILTERS.ALL,
on => on(setFilterAction, (state, filter) => filter));

function VisibilityFilter() {
  const visibilityFilter = useAtom(VisibilityFilteredAtom)
  const handleClick = useAction(payload => setFilterAction(payload))
  return (
    <div className="visibility-filters">
      {filtersList.map(filterKey => {
        const currentFilter = VISIBILITY_FILTERS[filterKey]
        return (
          <span
            key={`visibility-filter-${currentFilter}`}
            className={clsx(
              "filter",
              currentFilter === visibilityFilter && "filter--active"
            )}
            onClick={() => handleClick(currentFilter)}
          >
            {currentFilter}
          </span>
        )
      })}
    </div>
  );
};

export default VisibilityFilter;