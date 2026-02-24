import React, { useState } from 'react';

const AcuityTest: React.FC = () => {
    const [level, setLevel] = useState(0);
    const [score, setScore] = useState(0);
    const [isFinished, setIsFinished] = useState(false);

    const levels = [
        { size: '8rem', letters: ['E'] },
        { size: '5rem', letters: ['F', 'P'] },
        { size: '3.5rem', letters: ['T', 'O', 'Z'] },
        { size: '2.5rem', letters: ['L', 'P', 'E', 'D'] },
        { size: '1.8rem', letters: ['P', 'E', 'C', 'F', 'D'] },
        { size: '1.2rem', letters: ['E', 'D', 'F', 'C', 'Z', 'P'] },
        { size: '0.8rem', letters: ['F', 'E', 'L', 'O', 'P', 'Z', 'D'] },
    ];

    const currentLevel = levels[level];

    const handleNext = () => {
        if (level < levels.length - 1) {
            setLevel(level + 1);
            setScore(score + 10);
        } else {
            setIsFinished(true);
        }
    };

    return (
        <div className="module-acuity">
            <div className="module-header">
                <h3>Keskinlik Laboratuvarı</h3>
                <p>Mesafe ve netlik analizini modern Snellen testi ile gerçekleştirin.</p>
            </div>

            <div className="acuity-display glass">
                {!isFinished ? (
                    <div className="test-vessel">
                        <div className="letter-area" style={{ fontSize: currentLevel.size }}>
                            {currentLevel.letters.join(' ')}
                        </div>
                        <div className="interaction-zone">
                            <p>Harfleri net görebiliyor musunuz?</p>
                            <div className="test-actions">
                                <button onClick={handleNext} className="btn-primary">Net Görüyorum</button>
                                <button onClick={() => setIsFinished(true)} className="btn-outline">Bulanıklaşıyor</button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="result-vessel">
                        <div className="score-circle">
                            <span className="number">%{Math.round((score / 70) * 100)}</span>
                            <span className="label">Netlik Puanı</span>
                        </div>
                        <h4>Analiz Tamamlandı</h4>
                        <p>Simüle edilen görüş netliğiniz bu ekrandaki performansa dayalıdır.</p>
                        <button onClick={() => { setLevel(0); setScore(0); setIsFinished(false); }} className="btn-primary">Tekrar Test Et</button>
                    </div>
                )}
            </div>

            <style>{`
                .module-acuity {
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                    height: 100%;
                }

                .module-header h3 {
                    font-size: 1.8rem;
                    margin: 0;
                    color: #60a5fa;
                }

                .acuity-display {
                    flex: 1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: #000;
                    border-radius: 24px;
                }

                .test-vessel {
                    text-align: center;
                    display: flex;
                    flex-direction: column;
                    gap: 3rem;
                }

                .letter-area {
                    font-family: 'Inter', sans-serif;
                    font-weight: 800;
                    letter-spacing: 0.5rem;
                    color: white;
                    text-shadow: 0 0 20px rgba(96, 165, 250, 0.3);
                }

                .btn-primary {
                    background: #60a5fa;
                    color: white;
                    border: none;
                    padding: 1rem 2rem;
                    border-radius: 12px;
                    font-weight: 700;
                    cursor: pointer;
                    transition: transform 0.2s;
                }

                .btn-outline {
                    background: transparent;
                    color: #60a5fa;
                    border: 2px solid #60a5fa;
                    padding: 1rem 2rem;
                    border-radius: 12px;
                    font-weight: 700;
                    cursor: pointer;
                }

                .test-actions {
                    display: flex;
                    gap: 1rem;
                    justify-content: center;
                    margin-top: 1rem;
                }

                .score-circle {
                    width: 180px;
                    height: 180px;
                    border: 4px solid #60a5fa;
                    border-radius: 50%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 2rem;
                }

                .score-circle .number {
                    font-size: 2.5rem;
                    font-weight: 800;
                    color: #60a5fa;
                }

                .score-circle .label {
                    font-size: 0.8rem;
                    text-transform: uppercase;
                    letter-spacing: 0.1rem;
                }
            `}</style>
        </div>
    );
};

export default AcuityTest;
