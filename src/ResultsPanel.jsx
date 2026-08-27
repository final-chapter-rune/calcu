import './ResultsPanel.css'

function ResultsPanel({ result }) {
  return (
    <section className="results-panel">

      { result ? (
        /* ===== 完成态:有计算结果 ===== */
        <div className="results-complete">
          <h2>Your results</h2>
          <p className="results-summary">
            Your results are shown below based on the information you provided.
            To adjust the results, edit the form and click “calculate
            repayments” again.
          </p>

          <div className="result-divider" />

          <p className="result-label">Your monthly repayments</p>
          <p className="result-monthly">
            £{result.monthly.toLocaleString('en-GB', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>

          <div className="result-divider light" />

          <p className="result-label">Total you'll repay over the term</p>
          <p className="result-total">
            £{result.total.toLocaleString('en-GB', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        </div>
      ) : (
        /* ===== 空态:还没计算 ===== */
        <div className="results-empty">
          <img
            src="./assets/images/illustration-empty.svg"
            alt=""
            className="empty-illustration"
          />
          <h2>Results shown here</h2>
          <p>
            Complete the form and click “calculate repayments” to see what
            your monthly repayments would be.
          </p>
        </div>
      )}
    </section>
  )
}

export default ResultsPanel
