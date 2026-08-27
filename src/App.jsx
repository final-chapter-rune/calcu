import { useState } from 'react'
import './App.css'
import CalculatorForm from './CalculatorForm'
import ResultsPanel from './ResultsPanel'

function App() {
  // 计算结果:null = 还没计算(空态),对象 = 有结果(完成态)
  const [result, setResult] = useState(null);

  function handleCalculate(data) {
    const principal = Number(data.amount);        // 本金
    const months = Number(data.term) * 12;        // 总月数
    const monthlyRate = Number(data.rate) / 100 / 12; // 月利率

    let monthly;
    let total;
    if (data.type === 'repayment') {
      // 等额本息:每月还款额固定
      const factor = Math.pow(1 + monthlyRate, months);
      monthly = (principal * monthlyRate * factor) / (factor - 1);
      total = monthly * months;
    } else {
      // 只付利息:每月只还利息,本金到期一次性还
      monthly = principal * monthlyRate;
      total = monthly * months + principal;
    }

    setResult({ monthly, total });
  }

  return (
    <main className="app">
      <div className="calculator-card">
        <CalculatorForm onCalculate={handleCalculate} />
        <ResultsPanel result={result} />
      </div>
    </main>
  )
}

export default App
