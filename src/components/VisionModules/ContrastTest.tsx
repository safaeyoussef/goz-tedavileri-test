import React, { useState, useEffect } from 'react';

const ContrastTest: React.FC = () => {
    const [level, setLevel] = useState(1);
    const [isFinished, setIsFinished] = useState(false);
    const [score, setScore] = useState(0);
    const [targetLetter, setTargetLetter] = useState('');
    const [userInput, setUserInput] = useState('');
    const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);

    const letters = 'ABCDEFGHJKLMNOPRSTUVYZ';

    // Contrast decreases as level increases
    // Level 1: 100% contrast (Black on White/Gray)
    // Level 10: ~5% contrast (Very faint)
    const getContrastLevel = (currentLevel: number) => {
        return Math.max(100 - (currentLevel - 1) * 10, 5);
    };

    const generateRound = () => {
        const randomLetter = letters[Math.floor(Math.random() * letters.length)];
        setTargetLetter(randomLetter);
        setUserInput('');
        setFeedback(null);
    };

    useEffect(() => {
        if (!isFinished) generateRound();
    }, [level, isFinished]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (userInput.toUpperCase() === targetLetter) {
            setFeedback('correct');
            setTimeout(() => {
                if (level < 10) {
                    setLevel(level + 1);
                    setScore(score + 10);
                } else {
                    setIsFinished(true);
                }
            }, 500);
        } else {
            setFeedback('incorrect');
            setTimeout(() => {
                setIsFinished(true);
            }, 500);
        }
    };

    return (
        <div className="module-contrast">
            <div className="module-header">
                <h3>Kontrast Duyarlılığı Testi</h3>
                <p>Arka plan ile nesneler arasındaki farkı ne kadar iyi ayırt edebildiğinizi ölçün.</p>
            </div>

            <div className="contrast-display glass">
                {!isFinished ? (
                    <div className="test-vessel">
                        <div
                            className="target-letter-box"
                            style={{
                                opacity: getContrastLevel(level) / 100,
                                background: 'white'
                            }}
                        >
                            <span className="target-char">{targetLetter}</span>
                        </div>

                        <form onSubmit={handleSubmit} className="input-group">
                            <input
                                type="text"
                                value={userInput}
                                onChange={(e) => setUserInput(e.target.value.toUpperCase())}
                                placeholder="Gördüğünüz harf?"
                                maxLength={1}
                                autoFocus
                                className={`letter-input ${feedback}`}
                            />
                            <button type="submit" className="btn-primary">Onayla</button>
                        </form>

                        <div className="stats">
                            <span>Seviye: {level}/10</span>
                            <span>Mevcut Kontrast: %{getContrastLevel(level)}</span>
                        </div>
                    </div>
                ) : (
                    <div className="result-vessel">
                        <div className="score-badge">Puan: {score}</div>
                        <h4>Test Tamamlandı</h4>
                        <p>Kontrast duyarlılığınız %{getContrastLevel(level)} seviyesine kadar başarıyla ölçüldü.</p>
                        <button onClick={() => { setLevel(1); setScore(0); setIsFinished(false); }} className="btn-primary">Yeniden Dene</button>
                    </div>
                )}
            </div>

            <style>{`
                .module-contrast {
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                    height: 100%;
                }

                .module-header h3 {
                    font-size: 1.8rem;
                    margin: 0;
                    color: #fbbf24;
                }

                .contrast-display {
                    flex: 1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: #f1f5f9; /* Light gray background for contrast testing */
                    border-radius: 24px;
                    color: #0f172a;
                }

                .test-vessel {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 2rem;
                    width: 100%;
                    max-width: 400px;
                }

                .target-letter-box {
                    width: 200px;
                    height: 200px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 16px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
                }

                .target-char {
                    font-size: 8rem;
                    font-weight: 800;
                    color: black;
                }

                .input-group {
                    display: flex;
                    gap: 1rem;
                    width: 100%;
                }

                .letter-input {
                    flex: 1;
                    padding: 1rem;
                    border-radius: 12px;
                    border: 2px solid #e2e8f0;
                    font-size: 1.2rem;
                    text-align: center;
                    text-transform: uppercase;
                    outline: none;
                    transition: all 0.2s;
                }

                .letter-input:focus {
                    border-color: #3b82f6;
                }

                .letter-input.correct {
                    border-color: #10b981;
                    background: #ecfdf5;
                }

                .letter-input.incorrect {
                    border-color: #ef4444;
                    background: #fef2f2;
                }

                .stats {
                    display: flex;
                    justify-content: space-between;
                    width: 100%;
                    font-weight: 700;
                    color: #64748b;
                }

                .score-badge {
                    font-size: 3rem;
                    font-weight: 800;
                    color: #fbbf24;
                    margin-bottom: 2rem;
                }

                .result-vessel {
                    text-align: center;
                    padding: 2rem;
                }
            `}</style>
        </div>
    );
};

export default ContrastTest;
