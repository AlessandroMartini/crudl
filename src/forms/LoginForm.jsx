import React from 'react'
import PropTypes from 'prop-types'
import { loginShape } from '../PropTypes'

import FieldSet from './FieldSet'
import { createFieldSetId } from '../utils/frontend'

const LoginForm = ({ desc, form, handleSubmit, error, anyTouched, submitting, loginButtonLabel }) => (
    <form onSubmit={handleSubmit}>
        {anyTouched && error &&
            <div className="form-error">
                {error}
            </div>
        }
        <div className="wrapper">
            {desc.fieldsets.map((fs, i) => (
                <FieldSet
                    key={i}
                    id={createFieldSetId(desc.id, i)}
                    desc={fs}
                    formName={form}
                    />
            ))}
            <div className="footer">
                <ul role="group" className="buttons">
                    <li>
                        <button
                            className="block"
                            aria-disabled={submitting}
                            disabled={submitting}
                            onClick={handleSubmit}
                            >
                            {loginButtonLabel}
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    </form>
)

LoginForm.propTypes = {
    desc: loginShape.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    anyTouched: PropTypes.bool,
    error: PropTypes.node,
    submitting: PropTypes.bool,
    loginButtonLabel: PropTypes.string.isRequired,
    form: PropTypes.string.isRequired,
}

export default LoginForm
