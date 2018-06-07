import React from 'react'
import PropTypes from 'prop-types'

import FieldSet from './FieldSet'
import { createFieldSetId } from '../utils/frontend'
import saveDisabled from '../utils/saveDisabled'
import { changeViewShape } from '../PropTypes'
import { hasPermission } from '../Crudl'


const ChangeViewForm = props => (
    <form tabIndex="0" onSubmit={props.handleSubmit(props.onSave)}>
        {props.anyTouched && props.error &&
            <div className="form-error">
                {props.error}
            </div>
        }
        {props.desc.fieldsets.map((fs, i) => (
            <FieldSet
                key={i}
                id={createFieldSetId(props.desc.id, i)}
                desc={fs}
                formName={props.form}
                onAdd={props.onAdd}
                onEdit={props.onEdit}
                />
        ))}
        <div id="viewport-footer">
            <ul role="group" className="buttons">
                {props.onDelete && hasPermission(props.desc.id, 'delete') &&
                    <li><button
                        type="button"
                        className="action-delete"
                        tabIndex="0"
                        aria-label={props.labels.delete}
                        onClick={props.handleSubmit(props.onDelete)}
                        >{props.labels.delete}</button>
                    </li>
                }
                {hasPermission(props.desc.id, 'save') &&
                    <li className="opposite"><button
                        type="button"
                        className="action-save"
                        tabIndex="0"
                        aria-label={props.labels.save}
                        aria-disabled={saveDisabled(props)}
                        disabled={saveDisabled(props)}
                        onClick={props.handleSubmit(props.onSave)}
                        >{props.labels.save}</button>
                    </li>
                }
                {hasPermission(props.desc.id, 'save') &&
                    <li className="opposite"><button
                        type="button"
                        className="action-save secondary"
                        tabIndex="0"
                        aria-label={props.labels.saveAndContinue}
                        aria-disabled={saveDisabled(props)}
                        disabled={saveDisabled(props)}
                        onClick={props.handleSubmit(props.onSaveAndContinue)}
                        >{props.labels.saveAndContinue}</button>
                    </li>
                }
            </ul>
        </div>
    </form>
)

ChangeViewForm.propTypes = {
    desc: changeViewShape.isRequired,
    onDelete: PropTypes.func,
    onSave: PropTypes.func.isRequired,
    onSaveAndContinue: PropTypes.func.isRequired,
    form: PropTypes.string.isRequired,
    anyTouched: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    error: PropTypes.node,
    labels: PropTypes.shape({
        save: PropTypes.string.isRequired,
        saveAndContinue: PropTypes.string.isRequired,
        delete: PropTypes.string.isRequired,
    }).isRequired,
    onAdd: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
}

export default ChangeViewForm
