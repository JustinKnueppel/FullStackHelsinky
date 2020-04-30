import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ text, handleClick }) => (
  <button onClick={handleClick}>{text}</button>
)

const GiveFeedback = ({buttons}) => (
  <>
    <h1>Give feedback</h1>
    {buttons.map((button, i) => (
      <Button key={i} text={button.text} handleClick={button.handleClick} />
    ))}
  </>
)

const Statistic = ({text, stat}) => (
  <tr>
    <td>{text}</td>
    <td>{stat}</td>
  </tr>
)

const Statistics = ({stats}) => {
  if (stats.length === 0) {
    return (
      <>
        <h1>Statistics</h1>
        <p>No feeback given</p>
      </>
    )
  }
  return (
    <>
      <h1>Statistics</h1>
      <table>
        <tbody>
          {stats.map((stat, i) => (
            <Statistic key={i} text={stat.text} stat={stat.stat} />
          ))}
        </tbody>
      </table>
    </>
  )
}
const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodHandler = () => setGood(good + 1);
  const neutralHandler = () => setNeutral(neutral + 1);
  const badHandler = () => setBad(bad + 1);

  const feedbackButtons = [
    {text: "good", handleClick: goodHandler},
    {text: "neutral", handleClick: neutralHandler},
    {text: "bad", handleClick: badHandler}
  ]

  const total = good + neutral + bad;

  let stats = [];
  if (total > 0) {
    const average = total > 0 ? (good - bad)/total : 0;
    const positive = total > 0 ? good/total : 0;
  
    stats = [
      {text: "good", stat: good},
      {text: "neutral", stat: neutral},
      {text: "bad", stat: bad},
      {text: "average", stat: average},
      {text: "positive", stat: positive}
    ]
  }


  return (
    <div>
      <GiveFeedback buttons={feedbackButtons} />
      <Statistics stats={stats} />
    </div>
  )
  

}

ReactDOM.render(<App />, 
  document.getElementById('root')
)