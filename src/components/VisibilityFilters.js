import { declareAtom, declareAction } from '@reatom/core';
import { useAtom, useAction } from "@reatom/react";
import clsx from 'clsx';
import { Radio } from 'antd';

export const VISIBILITY_FILTERS = {
  ALL: "all",
  COMPLETED: "completed",
  INCOMPLETE: "incomplete"
}

const filters = Object.values(VISIBILITY_FILTERS).map(value => ({ label: value, value }));

const setFilterAction = declareAction('setFilterAction');

export const VisibilityFilteredAtom = declareAtom('visibilityFilteredAtom', 
  VISIBILITY_FILTERS.ALL,
on => on(setFilterAction, (state, filter) => filter));

function VisibilityFilter() {
  const visibilityFilter = useAtom(VisibilityFilteredAtom)
  const handleClick = useAction(({ target: { value }}) => setFilterAction(value));
  return (
    <Radio.Group
      options={filters}
      onChange={handleClick}
      value={visibilityFilter}
      optionType="button"
    />
  );
};

export default VisibilityFilter;