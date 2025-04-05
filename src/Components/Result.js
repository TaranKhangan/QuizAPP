import React from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import '../App.css';

const Result = ({ score, total }) => {
  const downloadResult = () => {
    const resultDiv = document.getElementById('result');
    html2canvas(resultDiv).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 190;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
      pdf.save('quiz-result.pdf');
    });
  };

  return (
    <div id="result" className="result-container">
      <h2>Your Score: {score} / {total}</h2>
      <p>{((score / total) * 100).toFixed(1)}% Correct</p>
      <button onClick={downloadResult}>Download Result</button>
    </div>
  );
};
export default Result