import React from 'react'
import './ErrorPage.css'
class ErrorPage extends React.Component {
    render() {
        return (
            <div className="containerBody">
                <div className="status-error body-wrapper">
                    <h1>Internal Server Error</h1>

                    <p className="error-message">
                        We apologize but our servers could not complete your request.
                        Sometimes, these issues are temporary and are resolved if you
                        refresh the page. If the problem persists, please log a ticket to
                        our support team so we can assist you.
          </p>
                </div>
            </div>
        )
    }
}
export default ErrorPage
