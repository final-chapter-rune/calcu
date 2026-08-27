import './CalculatorForm.css'
import { useState, useRef, useEffect } from 'react'

function CalculatorForm({ onCalculate }) {
  const [amount, setAmount] = useState('');
  const [term, setTerm] = useState('');
  const [rate, setRate] = useState('');
  const [type, setType] = useState('');

  // errors 记录"哪个字段出错":true = 显示错误样式
  const [errors, setErrors] = useState({
    amount: false,
    term: false,
    rate: false,
    type: false,
  });

  // 阻止滚轮改变 number 输入框的值
  const formRef = useRef(null);

  useEffect(() => {
    const form = formRef.current;
    const blockWheel = (e) => e.preventDefault();
    form.addEventListener('wheel', blockWheel, { passive: false });
    return () => form.removeEventListener('wheel', blockWheel);
  }, []);

  function handleSubmit(e) {
    e.preventDefault(); // 阻止表单提交的默认行为(刷新页面)
    const newErrors = {
      amount: amount === '',
      term: term === '',
      rate: rate === '',
      type: type === '',
    };
    setErrors(newErrors);

    // 全部通过验证才把数据上缴给 App 计算
    const isValid = !newErrors.amount && !newErrors.term && !newErrors.rate && !newErrors.type;
    if (isValid) {
      onCalculate({ amount, term, rate, type });
    }
  }

  return (
    <section className="form-panel">
      <div className="form-header">
        <h1>Mortgage Calculator</h1>
        <button type="button" className="clear-btn">
          Clear All
        </button>
      </div>

      <form className="calculator-form" ref={formRef} onSubmit={handleSubmit}>

        <div className={`field ${errors.amount ? 'error' : ''}`}>

          <label htmlFor="amount">Mortgage Amount</label>
          <div className="input-wrap">
            <span className="input-affix prefix">£</span>
            <input id="amount" name="amount" type="number" value={amount}
              onChange={(e) => setAmount(e.target.value)} />
          </div>
          <p className="error-message">This field is required</p>

        </div>

        <div className="field-row">

          <div className={`field ${errors.term ? 'error' : ''}`}>
            
            <label htmlFor="term">Mortgage Term</label>
            <div className="input-wrap">
              <input id="term" name="term" type="number" value={term}
                onChange={(e) => setTerm(e.target.value)} />
              <span className="input-affix suffix">years</span>
            </div>
            <p className="error-message">This field is required</p>

          </div>

          <div className={`field ${errors.rate ? 'error' : ''}`}>

            <label htmlFor="rate">Interest Rate</label>
            <div className="input-wrap">
              <input id="rate" name="rate" type="number" value={rate}
                onChange={(e) => setRate(e.target.value)} />
              <span className="input-affix suffix">%</span>
            </div>
            <p className="error-message">This field is required</p>

          </div>

        </div>

        <fieldset className={`field type-field ${errors.type ? 'error' : ''}`}>

          <legend>Mortgage Type</legend>

          <label className="radio-option">
            <input type="radio" name="type" value="repayment"
              onChange={(e) => setType(e.target.value)} />
            Repayment
          </label>

          <label className="radio-option">
            <input type="radio" name="type" value="interest-only"
              onChange={(e) => setType(e.target.value)} />
            Interest Only
          </label>
          <p className="error-message">This field is required</p>
          
        </fieldset>

        <button type="submit" className="calculate-btn">
          <img src="./assets/images/icon-calculator.svg" alt="" />
          Calculate Repayments
        </button>
      </form>
    </section>
  )
}

export default CalculatorForm
