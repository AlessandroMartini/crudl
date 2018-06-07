import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { listViewFieldShape, sortingShape } from '../PropTypes'

const toggle = sorted => (sorted === 'ascending' ? 'descending' : 'ascending')

const isSorted = (name, sorting) => (sorting.map(item => item.name).indexOf(name) >= 0)

const getSortDirection = (name, sorting) => {
    if (isSorted(name, sorting)) {
        return sorting[sorting.map(item => item.name).indexOf(name)].sorted
    }
    return 'none'
}

const getSortPriority = (name, sorting) => {
    if (isSorted(name, sorting)) {
        return 1 + sorting.map(item => item.name).indexOf(name)
    }
    return undefined
}

const ListViewHeader = ({ sorting, onSortingChange, fields, selectEnabled, allSelected, onSelectAllChange }) => (
    <tr>
        {selectEnabled &&
            <th>
                <div>
                    <input type="checkbox" checked={allSelected} onClick={onSelectAllChange} />
                </div>
            </th>
        }
        {fields.map((f, index) => {
            if (f.sortable || isSorted(f.name, sorting)) {
                const cellClass = classNames(f.render, {
                    sortable: f.sortable,
                    text: !f.render,
                })
                const sortDirection = getSortDirection(f.name, sorting)
                return (
                    <th
                        onClick={() => f.sortable && onSortingChange({
                            name: f.name,
                            sortKey: f.sortKey,
                            sorted: toggle(sortDirection),
                        })}
                        key={index}
                        data-column-sort={index}
                        className={cellClass}
                        aria-sort={sortDirection}
                        >
                        <div>
                            {f.label}
                            <ul role="group" className="sort-options">
                                {f.sortable &&
                                    <li
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onSortingChange({
                                                name: f.name,
                                                sortKey: f.sortKey,
                                                sorted: 'none',
                                            })
                                        }}
                                        className="sort-remove"
                                        data-column-remove={index}
                                        >&nbsp;</li>
                                }
                                <li className="sort-priority">{getSortPriority(f.name, sorting)}</li>
                                <li className="sort-icon" />
                            </ul>
                        </div>
                    </th>
                )
            }
            const cellClass = classNames(f.render)
            return (
                <th key={index} data-column={index} className={cellClass}>
                    <div>{f.label}</div>
                </th>
            )
        })}
    </tr>
)

ListViewHeader.propTypes = {
    fields: PropTypes.arrayOf(listViewFieldShape).isRequired,
    sorting: sortingShape,
    selectEnabled: PropTypes.bool.isRequired,
    onSortingChange: PropTypes.func.isRequired,
    onSelectAllChange: PropTypes.func.isRequired,
    allSelected: PropTypes.bool.isRequired,
}

export default ListViewHeader
